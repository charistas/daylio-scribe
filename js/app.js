/**
 * Daylio Scribe - A human-friendly editor for Daylio backup notes
 */

// Highest Daylio backup version tested with this app
const SUPPORTED_VERSION = 19;

class DaylioScribe {
    constructor() {
        this.data = null;
        this.entries = [];
        this.filteredEntries = [];
        this.currentEntryIndex = null;
        this.moods = {};  // Map of mood ID -> { label, groupId }
        this.quill = null;  // Quill editor instance
        this.isUpdating = false;  // Prevent recursive updates
        this.hasUnsavedChanges = false;  // Track if entries have been modified

        // Calendar state
        this.calendarDate = new Date();  // Currently displayed month
        this.selectedCalendarDate = null;  // Selected day (for filtering)

        // Photo gallery state
        this.currentEntryPhotos = [];  // Photo URLs for current entry
        this.currentPhotoIndex = 0;  // Currently viewed photo in lightbox

        // Default mood labels (fallback when custom_name is empty)
        this.defaultMoodLabels = {
            1: 'great',
            2: 'good',
            3: 'meh',
            4: 'bad',
            5: 'awful'
        };

        // Store the original ZIP contents for repackaging
        this.originalZip = null;
        this.assets = {};  // Store asset files from the ZIP

        this.initElements();
        this.initQuill();
        this.bindEvents();
    }

    initElements() {
        // Dropzone
        this.dropzone = document.getElementById('dropzone');
        this.fileInput = document.getElementById('fileInput');

        // App
        this.app = document.getElementById('app');
        this.entryCount = document.getElementById('entryCount');
        this.notesCount = document.getElementById('notesCount');
        this.backupVersion = document.getElementById('backupVersion');
        this.filterNotes = document.getElementById('filterNotes');
        this.searchInput = document.getElementById('searchInput');
        this.dateRangeSelect = document.getElementById('dateRangeSelect');
        this.customDateRange = document.getElementById('customDateRange');
        this.dateFrom = document.getElementById('dateFrom');
        this.dateTo = document.getElementById('dateTo');
        this.entriesList = document.getElementById('entriesList');

        // Mini calendar
        this.miniCalendar = document.getElementById('miniCalendar');
        this.calendarTitle = document.getElementById('calendarTitle');
        this.calendarGrid = document.getElementById('calendarGrid');
        this.prevMonthBtn = document.getElementById('prevMonth');
        this.nextMonthBtn = document.getElementById('nextMonth');
        this.saveBtn = document.getElementById('saveBtn');
        this.exportCsvBtn = document.getElementById('exportCsvBtn');

        // Editor
        this.editorPlaceholder = document.getElementById('editorPlaceholder');
        this.editor = document.getElementById('editor');
        this.editorDate = document.getElementById('editorDate');
        this.editorMood = document.getElementById('editorMood');
        this.noteTitleInput = document.getElementById('noteTitleInput');

        // Photo gallery
        this.photoSection = document.getElementById('photoSection');
        this.photoCount = document.getElementById('photoCount');
        this.photoThumbnails = document.getElementById('photoThumbnails');
        this.photoLightbox = document.getElementById('photoLightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.lightboxCounter = document.getElementById('lightboxCounter');
        this.lightboxClose = document.getElementById('lightboxClose');
        this.lightboxPrev = document.getElementById('lightboxPrev');
        this.lightboxNext = document.getElementById('lightboxNext');
    }

    initQuill() {
        // Initialize Quill with formatting toolbar
        this.quill = new Quill('#noteEditor', {
            theme: 'snow',
            placeholder: 'Write your note here...',
            modules: {
                toolbar: {
                    container: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['emoji']
                    ],
                    handlers: {
                        'emoji': () => this.toggleEmojiPicker()
                    }
                },
                keyboard: {
                    bindings: {
                        // Ensure standard shortcuts work
                        bold: {
                            key: 'B',
                            shortKey: true,
                            handler: function(range, context) {
                                this.quill.format('bold', !context.format.bold);
                            }
                        },
                        italic: {
                            key: 'I',
                            shortKey: true,
                            handler: function(range, context) {
                                this.quill.format('italic', !context.format.italic);
                            }
                        },
                        underline: {
                            key: 'U',
                            shortKey: true,
                            handler: function(range, context) {
                                this.quill.format('underline', !context.format.underline);
                            }
                        }
                    }
                }
            }
        });

        // Listen for text changes - only save on USER edits, not API/normalization changes
        this.quill.on('text-change', (delta, oldDelta, source) => {
            if (!this.isUpdating && source === 'user') {
                this.updateCurrentEntry();
            }
        });

        // Initialize emoji picker
        this.initEmojiPicker();
    }

    initEmojiPicker() {
        this.emojiPickerPopup = document.getElementById('emojiPickerPopup');
        this.emojiPicker = document.querySelector('emoji-picker');

        // Handle emoji selection
        this.emojiPicker.addEventListener('emoji-click', (event) => {
            const emoji = event.detail.unicode;
            this.insertEmoji(emoji);
            this.hideEmojiPicker();
        });

        // Close picker when clicking outside
        document.addEventListener('click', (event) => {
            if (!this.emojiPickerPopup.classList.contains('hidden')) {
                const isClickInside = this.emojiPickerPopup.contains(event.target) ||
                                     event.target.closest('.ql-emoji');
                if (!isClickInside) {
                    this.hideEmojiPicker();
                }
            }
        });
    }

    toggleEmojiPicker() {
        if (this.emojiPickerPopup.classList.contains('hidden')) {
            this.showEmojiPicker();
        } else {
            this.hideEmojiPicker();
        }
    }

    showEmojiPicker() {
        // Position the picker near the emoji button
        const emojiButton = document.querySelector('.ql-emoji');
        const rect = emojiButton.getBoundingClientRect();

        this.emojiPickerPopup.style.top = (rect.bottom + 5) + 'px';
        this.emojiPickerPopup.style.left = rect.left + 'px';

        // Make sure it doesn't go off screen
        const pickerWidth = 350;
        if (rect.left + pickerWidth > window.innerWidth) {
            this.emojiPickerPopup.style.left = (window.innerWidth - pickerWidth - 10) + 'px';
        }

        this.emojiPickerPopup.classList.remove('hidden');

        // Store current selection for later insertion
        this.savedSelection = this.quill.getSelection();
    }

    hideEmojiPicker() {
        this.emojiPickerPopup.classList.add('hidden');
    }

    insertEmoji(emoji) {
        // Restore selection or insert at end
        const range = this.savedSelection || { index: this.quill.getLength() - 1 };
        this.quill.insertText(range.index, emoji, 'user');
        this.quill.setSelection(range.index + emoji.length);
    }

    bindEvents() {
        // File drop/select
        this.dropzone.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFile(e.target.files[0]));

        this.dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropzone.classList.add('dragover');
        });

        this.dropzone.addEventListener('dragleave', () => {
            this.dropzone.classList.remove('dragover');
        });

        this.dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropzone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) this.handleFile(file);
        });

        // Toolbar
        this.filterNotes.addEventListener('change', () => {
            this.renderCalendar();  // Update calendar to reflect filter
            this.applyFilters();
        });
        this.searchInput.addEventListener('input', () => this.applyFilters());
        this.saveBtn.addEventListener('click', () => this.saveBackup());
        this.exportCsvBtn.addEventListener('click', () => this.exportCsv());

        // Date range filter
        this.dateRangeSelect.addEventListener('change', () => {
            if (this.dateRangeSelect.value === 'custom') {
                this.customDateRange.classList.remove('hidden');
            } else {
                this.customDateRange.classList.add('hidden');
                this.applyFilters();
            }
        });
        this.dateFrom.addEventListener('change', () => this.applyFilters());
        this.dateTo.addEventListener('change', () => this.applyFilters());

        // Mini calendar navigation
        this.prevMonthBtn.addEventListener('click', () => {
            this.calendarDate.setMonth(this.calendarDate.getMonth() - 1);
            this.renderCalendar();
        });
        this.nextMonthBtn.addEventListener('click', () => {
            this.calendarDate.setMonth(this.calendarDate.getMonth() + 1);
            this.renderCalendar();
        });

        // Photo lightbox
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.showPrevPhoto());
        this.lightboxNext.addEventListener('click', () => this.showNextPhoto());
        this.photoLightbox.querySelector('.lightbox-overlay').addEventListener('click', () => this.closeLightbox());

        // Keyboard navigation for lightbox
        document.addEventListener('keydown', (e) => {
            if (!this.photoLightbox.classList.contains('hidden')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.showPrevPhoto();
                if (e.key === 'ArrowRight') this.showNextPhoto();
            }
        });

        // Editor - auto-save on title change
        this.noteTitleInput.addEventListener('input', () => this.updateCurrentEntry());

        // Warn before leaving with unsaved changes
        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';  // Required for Chrome
                return '';
            }
        });
    }

    async handleFile(file) {
        if (!file || !file.name.endsWith('.daylio')) {
            alert('Please select a valid .daylio backup file');
            return;
        }

        try {
            // Show loading state
            this.dropzone.querySelector('p').textContent = 'Loading...';

            // Load the ZIP file
            this.originalZip = await JSZip.loadAsync(file);

            // Extract and store assets
            this.assets = {};
            const assetFiles = Object.keys(this.originalZip.files).filter(
                name => name.startsWith('assets/') && !this.originalZip.files[name].dir
            );

            for (const assetPath of assetFiles) {
                this.assets[assetPath] = await this.originalZip.files[assetPath].async('uint8array');
            }

            // Extract and decode the backup.daylio file (base64 encoded JSON)
            const backupFile = this.originalZip.file('backup.daylio');
            if (!backupFile) {
                throw new Error('backup.daylio not found in the archive');
            }

            const base64Content = await backupFile.async('string');
            const jsonString = this.base64DecodeUtf8(base64Content.trim());
            this.data = JSON.parse(jsonString);

            // Check backup version compatibility
            if (!this.checkVersion()) {
                this.dropzone.querySelector('p').textContent = 'Drop your .daylio backup file here';
                return;
            }

            this.entries = this.data.dayEntries || [];

            // Build mood labels from customMoods
            this.buildMoodLabels();

            this.showApp();
        } catch (err) {
            alert('Error loading backup: ' + err.message);
            this.dropzone.querySelector('p').textContent = 'Drop your .daylio backup file here';
        }
    }

    /**
     * Check if the backup version is compatible with this app
     * Returns true if safe to proceed, false if user cancelled
     */
    checkVersion() {
        const backupVersion = this.data.version;

        if (backupVersion === undefined) {
            // Very old backup without version field - proceed with caution
            console.warn('Backup has no version field - proceeding anyway');
            return true;
        }

        if (backupVersion > SUPPORTED_VERSION) {
            const proceed = confirm(
                `Warning: This backup is from a newer Daylio version (v${backupVersion}).\n\n` +
                `This app was tested with version ${SUPPORTED_VERSION}.\n\n` +
                `The backup structure may have changed. Editing could cause data loss or corruption.\n\n` +
                `Do you want to continue anyway?`
            );
            if (!proceed) {
                return false;
            }
            console.warn(`Proceeding with unsupported backup version ${backupVersion} (supported: ${SUPPORTED_VERSION})`);
        }

        return true;
    }

    /**
     * Build mood labels from customMoods in the backup
     */
    buildMoodLabels() {
        this.moods = {};
        const customMoods = this.data.customMoods || [];

        for (const mood of customMoods) {
            // Use custom_name if set, otherwise fall back to predefined name
            let label = mood.custom_name && mood.custom_name.trim();
            if (!label) {
                label = this.defaultMoodLabels[mood.predefined_name_id] || `mood ${mood.id}`;
            }

            this.moods[mood.id] = {
                label: label,
                groupId: mood.mood_group_id
            };
        }
    }

    /**
     * Get mood label by ID
     */
    getMoodLabel(moodId) {
        return this.moods[moodId]?.label || `mood ${moodId}`;
    }

    /**
     * Get mood group ID (for color coding)
     */
    getMoodGroupId(moodId) {
        return this.moods[moodId]?.groupId || moodId;
    }

    showApp() {
        this.dropzone.classList.add('hidden');
        this.app.classList.remove('hidden');

        // Update stats
        const withNotes = this.entries.filter(e => e.note && e.note.length > 0).length;
        this.entryCount.textContent = `${this.entries.length} entries`;
        this.notesCount.textContent = `${withNotes} with notes`;

        // Display backup version with warning indicator if unsupported
        const version = this.data.version;
        if (version !== undefined) {
            this.backupVersion.textContent = `v${version}`;
            if (version > SUPPORTED_VERSION) {
                this.backupVersion.classList.add('version-warning');
                this.backupVersion.dataset.tooltip = `Unsupported version (tested up to v${SUPPORTED_VERSION})`;
            } else {
                this.backupVersion.classList.remove('version-warning');
                this.backupVersion.dataset.tooltip = 'Backup format version';
            }
        } else {
            this.backupVersion.textContent = 'v?';
            this.backupVersion.dataset.tooltip = 'Unknown version';
        }

        // Show and render mini calendar
        this.miniCalendar.classList.add('visible');
        this.renderCalendar();

        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.entries];

        // Filter by notes
        if (this.filterNotes.checked) {
            filtered = filtered.filter(e => e.note && e.note.length > 0);
        }

        // Filter by date range
        const dateRange = this.getDateRange();
        if (dateRange) {
            filtered = filtered.filter(e => {
                const entryDate = e.datetime;
                return entryDate >= dateRange.from && entryDate <= dateRange.to;
            });
        }

        // Search
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            filtered = filtered.filter(e => {
                const noteText = this.htmlToPlainText(e.note || '').toLowerCase();
                const titleText = (e.note_title || '').toLowerCase();
                return noteText.includes(searchTerm) || titleText.includes(searchTerm);
            });
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => b.datetime - a.datetime);

        this.filteredEntries = filtered;
        this.renderEntries();
    }

    /**
     * Get the date range based on the selected filter
     * Returns { from, to } timestamps or null for "all time"
     */
    getDateRange() {
        const selection = this.dateRangeSelect.value;
        const now = new Date();
        let from, to;

        switch (selection) {
            case 'all':
                return null;

            case 'thisMonth':
                from = new Date(now.getFullYear(), now.getMonth(), 1);
                to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
                break;

            case 'last30':
                from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                to = now;
                break;

            case 'last3Months':
                from = new Date(now.getFullYear(), now.getMonth() - 2, 1);
                to = now;
                break;

            case 'thisYear':
                from = new Date(now.getFullYear(), 0, 1);
                to = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
                break;

            case 'lastYear':
                from = new Date(now.getFullYear() - 1, 0, 1);
                to = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
                break;

            case 'custom':
                const fromVal = this.dateFrom.value;
                const toVal = this.dateTo.value;
                if (!fromVal && !toVal) return null;
                // Parse as local time, not UTC
                from = fromVal ? new Date(fromVal + 'T00:00:00') : new Date(0);
                to = toVal ? new Date(toVal + 'T23:59:59.999') : now;
                break;

            default:
                return null;
        }

        return { from: from.getTime(), to: to.getTime() };
    }

    /**
     * Render the mini calendar for the current month
     */
    renderCalendar() {
        const year = this.calendarDate.getFullYear();
        const month = this.calendarDate.getMonth();

        // Update title
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        this.calendarTitle.textContent = `${monthNames[month]} ${year}`;

        // Build entries map for quick lookup
        const entriesMap = this.buildEntriesMap();

        // Get first day of month and total days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();

        // Get starting day (0 = Monday in our grid)
        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6;  // Sunday becomes 6

        // Get today for highlighting
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

        // Build calendar grid
        this.calendarGrid.innerHTML = '';

        // Add empty cells for days before month starts
        for (let i = 0; i < startDay; i++) {
            const prevMonthDay = new Date(year, month, -startDay + i + 1);
            this.calendarGrid.appendChild(this.createDayCell(prevMonthDay, entriesMap, true));
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(year, month, day);
            const isToday = isCurrentMonth && day === today.getDate();
            this.calendarGrid.appendChild(this.createDayCell(date, entriesMap, false, isToday));
        }

        // Add empty cells for days after month ends (fill to 6 rows)
        const cellsUsed = startDay + totalDays;
        const cellsNeeded = Math.ceil(cellsUsed / 7) * 7;
        for (let i = 0; i < cellsNeeded - cellsUsed; i++) {
            const nextMonthDay = new Date(year, month + 1, i + 1);
            this.calendarGrid.appendChild(this.createDayCell(nextMonthDay, entriesMap, true));
        }
    }

    /**
     * Create a calendar day cell element
     */
    createDayCell(date, entriesMap, isOtherMonth, isToday = false) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.textContent = date.getDate();

        if (isOtherMonth) {
            cell.classList.add('other-month');
        }

        if (isToday) {
            cell.classList.add('today');
        }

        // Check if this date is selected
        if (this.selectedCalendarDate) {
            const selDate = this.selectedCalendarDate;
            if (date.getFullYear() === selDate.getFullYear() &&
                date.getMonth() === selDate.getMonth() &&
                date.getDate() === selDate.getDate()) {
                cell.classList.add('selected');
            }
        }

        // Check if date is in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const cellDate = new Date(date);
        cellDate.setHours(0, 0, 0, 0);
        const isFuture = cellDate > today;

        if (isFuture) {
            cell.classList.add('future');
            return cell;
        }

        // Check for entries on this day
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const dayEntries = entriesMap[dateKey];
        if (dayEntries && dayEntries.length > 0) {
            cell.classList.add('has-entry');
            // Use the mood color of the first entry
            const moodGroupId = this.getMoodGroupId(dayEntries[0].mood);
            const moodColors = {
                1: '#4ecca3',  // great
                2: '#7ed957',  // good
                3: '#ffd93d',  // meh
                4: '#ff8c42',  // bad
                5: '#e94560'   // awful
            };
            cell.style.setProperty('--mood-color', moodColors[moodGroupId] || '#a0a0a0');
        }

        // Click handler
        cell.addEventListener('click', () => this.handleCalendarDayClick(date));

        return cell;
    }

    /**
     * Build a map of date -> entries for quick lookup
     * Respects the "notes only" filter
     */
    buildEntriesMap() {
        const map = {};
        const notesOnly = this.filterNotes.checked;

        for (const entry of this.entries) {
            // Skip entries without notes if filter is enabled
            if (notesOnly && (!entry.note || entry.note.length === 0)) {
                continue;
            }

            const date = new Date(entry.datetime);
            const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            if (!map[key]) map[key] = [];
            map[key].push(entry);
        }
        return map;
    }

    /**
     * Handle click on a calendar day
     */
    handleCalendarDayClick(date) {
        // Toggle selection
        if (this.selectedCalendarDate &&
            date.getFullYear() === this.selectedCalendarDate.getFullYear() &&
            date.getMonth() === this.selectedCalendarDate.getMonth() &&
            date.getDate() === this.selectedCalendarDate.getDate()) {
            // Clicking same day - deselect
            this.selectedCalendarDate = null;
            this.dateRangeSelect.value = 'all';
            this.customDateRange.classList.add('hidden');
        } else {
            // Select this day
            this.selectedCalendarDate = date;
            this.dateRangeSelect.value = 'custom';
            this.customDateRange.classList.remove('hidden');

            // Set the date inputs (format locally, not UTC)
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            this.dateFrom.value = dateStr;
            this.dateTo.value = dateStr;
        }

        this.renderCalendar();
        this.applyFilters();
    }

    renderEntries() {
        this.entriesList.innerHTML = '';

        // Get current search term for highlighting
        const searchTerm = this.searchInput.value.trim();

        this.filteredEntries.forEach((entry, index) => {
            const originalIndex = this.entries.indexOf(entry);
            const div = document.createElement('div');
            div.className = 'entry-item';
            div.dataset.index = originalIndex;

            if (originalIndex === this.currentEntryIndex) {
                div.classList.add('active');
            }

            const date = this.formatDate(entry);
            const preview = this.getPreview(entry, searchTerm);
            const moodGroupId = this.getMoodGroupId(entry.mood);
            const moodClass = `mood-${moodGroupId}`;
            const moodLabel = this.getMoodLabel(entry.mood);

            const hasContent = entry.note_title?.trim() || entry.note;
            const hasPhotos = entry.assets && entry.assets.length > 0;
            const photoIcon = hasPhotos ? '<span class="photo-icon" title="Has photos">📷</span>' : '';

            div.innerHTML = `
                <div class="entry-header">
                    <span class="entry-date">${date}</span>
                    ${photoIcon}
                    <span class="mood-badge ${moodClass}">${moodLabel}</span>
                </div>
                <div class="${hasContent ? 'entry-preview' : 'entry-no-note'}">${preview}</div>
            `;

            div.addEventListener('click', () => this.selectEntry(originalIndex));
            this.entriesList.appendChild(div);
        });
    }

    formatDate(entry) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // Daylio uses 0-indexed months (0 = January)
        return `${months[entry.month]} ${entry.day}, ${entry.year}`;
    }

    getPreview(entry, searchTerm = '') {
        const hasNote = entry.note && entry.note.length > 0;
        const hasTitle = entry.note_title && entry.note_title.trim();

        // No content at all
        if (!hasTitle && !hasNote) {
            return this.escapeHtml('No note');
        }

        // If searching, try to show matching snippet from note content
        if (searchTerm && hasNote) {
            const plain = this.htmlToPlainText(entry.note);
            const lowerPlain = plain.toLowerCase();
            const lowerTerm = searchTerm.toLowerCase();
            const matchIndex = lowerPlain.indexOf(lowerTerm);

            if (matchIndex !== -1) {
                // Extract snippet around the match
                const snippetLength = 60;
                const termLength = searchTerm.length;

                // Center the match in the snippet
                let start = Math.max(0, matchIndex - Math.floor((snippetLength - termLength) / 2));
                let end = Math.min(plain.length, start + snippetLength);

                // Adjust start if we hit the end
                if (end === plain.length) {
                    start = Math.max(0, end - snippetLength);
                }

                let snippet = plain.substring(start, end);

                // Add ellipsis if truncated
                if (start > 0) snippet = '...' + snippet;
                if (end < plain.length) snippet = snippet + '...';

                return this.highlightText(snippet, searchTerm);
            }
        }

        // Default behavior: show title if exists, otherwise note preview
        let text;
        if (hasTitle) {
            text = entry.note_title.trim();
        } else {
            const plain = this.htmlToPlainText(entry.note);
            text = plain.length > 60 ? plain.substring(0, 60) + '...' : plain;
        }

        return this.highlightText(text, searchTerm);
    }

    selectEntry(index) {
        this.currentEntryIndex = index;
        const entry = this.entries[index];

        // Update editor
        this.editorPlaceholder.classList.add('hidden');
        this.editor.classList.remove('hidden');

        this.editorDate.textContent = this.formatDate(entry);
        this.editorMood.textContent = this.getMoodLabel(entry.mood);
        this.editorMood.className = `mood-badge mood-${this.getMoodGroupId(entry.mood)}`;

        this.noteTitleInput.value = entry.note_title || '';

        // Load HTML content into Quill using 'silent' to prevent triggering change events
        const cleanHtml = this.daylioToQuillHtml(entry.note || '');
        const delta = this.quill.clipboard.convert({ html: cleanHtml });
        this.quill.setContents(delta, 'silent');

        // Update active state in list
        document.querySelectorAll('.entry-item').forEach(el => {
            el.classList.toggle('active', parseInt(el.dataset.index) === index);
        });

        // Load photos
        this.renderPhotos(entry);
    }

    /**
     * Render photo thumbnails for an entry
     */
    renderPhotos(entry) {
        // Clear previous photos and revoke old URLs
        this.currentEntryPhotos.forEach(url => URL.revokeObjectURL(url));
        this.photoThumbnails.innerHTML = '';
        this.currentEntryPhotos = [];

        // Get entry asset IDs
        const entryAssetIds = entry.assets || [];
        if (entryAssetIds.length === 0) {
            this.photoSection.classList.add('hidden');
            return;
        }

        // Build asset lookup map if not already built
        if (!this.assetMap) {
            this.assetMap = {};
            (this.data.assets || []).forEach(asset => {
                this.assetMap[asset.id] = asset;
            });
        }

        // Create thumbnails
        entryAssetIds.forEach((assetId, index) => {
            const asset = this.assetMap[assetId];
            if (!asset) return;

            // Construct path: assets/photos/YEAR/MONTH/CHECKSUM
            const createdAt = new Date(asset.createdAt);
            const year = createdAt.getFullYear();
            const month = createdAt.getMonth() + 1;
            const assetPath = `assets/photos/${year}/${month}/${asset.checksum}`;
            const assetData = this.assets[assetPath];

            if (assetData) {
                const url = this.createImageUrl(assetData);
                this.currentEntryPhotos.push(url);

                const thumb = document.createElement('div');
                thumb.className = 'photo-thumbnail';
                thumb.innerHTML = `<img src="${url}" alt="Photo ${index + 1}">`;
                thumb.addEventListener('click', () => this.openLightbox(this.currentEntryPhotos.length - 1));
                this.photoThumbnails.appendChild(thumb);
            }
        });

        // Show/hide section based on whether we found any photos
        if (this.currentEntryPhotos.length > 0) {
            this.photoSection.classList.remove('hidden');
            this.photoCount.textContent = this.currentEntryPhotos.length;
        } else {
            this.photoSection.classList.add('hidden');
        }
    }

    /**
     * Create a data URL from asset binary data
     */
    createImageUrl(data) {
        // Detect image type from magic bytes
        let mimeType = 'image/jpeg';
        if (data[0] === 0x89 && data[1] === 0x50) {
            mimeType = 'image/png';
        } else if (data[0] === 0x47 && data[1] === 0x49) {
            mimeType = 'image/gif';
        }

        const blob = new Blob([data], { type: mimeType });
        return URL.createObjectURL(blob);
    }

    /**
     * Open the photo lightbox at a specific index
     */
    openLightbox(index) {
        if (this.currentEntryPhotos.length === 0) return;

        this.currentPhotoIndex = index;
        this.updateLightboxImage();
        this.photoLightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';  // Prevent scrolling
    }

    /**
     * Close the photo lightbox
     */
    closeLightbox() {
        this.photoLightbox.classList.add('hidden');
        document.body.style.overflow = '';
    }

    /**
     * Show the previous photo in the lightbox
     */
    showPrevPhoto() {
        if (this.currentEntryPhotos.length === 0) return;
        this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.currentEntryPhotos.length) % this.currentEntryPhotos.length;
        this.updateLightboxImage();
    }

    /**
     * Show the next photo in the lightbox
     */
    showNextPhoto() {
        if (this.currentEntryPhotos.length === 0) return;
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.currentEntryPhotos.length;
        this.updateLightboxImage();
    }

    /**
     * Update the lightbox image and counter
     */
    updateLightboxImage() {
        this.lightboxImage.src = this.currentEntryPhotos[this.currentPhotoIndex];
        this.lightboxCounter.textContent = `${this.currentPhotoIndex + 1} / ${this.currentEntryPhotos.length}`;

        // Show/hide nav buttons for single photo
        const hasMultiple = this.currentEntryPhotos.length > 1;
        this.lightboxPrev.style.display = hasMultiple ? '' : 'none';
        this.lightboxNext.style.display = hasMultiple ? '' : 'none';
    }

    updateCurrentEntry() {
        if (this.currentEntryIndex === null) return;

        const entry = this.entries[this.currentEntryIndex];
        entry.note_title = this.noteTitleInput.value;

        // Get HTML from Quill and convert to Daylio format
        const quillHtml = this.quill.root.innerHTML;
        entry.note = this.quillToDaylioHtml(quillHtml);

        // Mark as having unsaved changes
        this.markUnsavedChanges();

        // Update preview in list
        this.renderEntries();
    }

    /**
     * Mark that there are unsaved changes and update UI
     */
    markUnsavedChanges() {
        if (!this.hasUnsavedChanges) {
            this.hasUnsavedChanges = true;
            this.saveBtn.classList.add('has-changes');
            this.saveBtn.textContent = 'Download Backup *';
        }
    }

    /**
     * Clear unsaved changes flag and update UI
     */
    clearUnsavedChanges() {
        this.hasUnsavedChanges = false;
        this.saveBtn.classList.remove('has-changes');
        this.saveBtn.textContent = 'Download Backup';
    }

    /**
     * Convert Daylio HTML to Quill-compatible HTML
     */
    daylioToQuillHtml(html) {
        if (!html) return '';

        let result = html;

        // Remove inline styles from spans (keep the tag structure)
        result = result.replace(/<span[^>]*>/gi, '');
        result = result.replace(/<\/span>/gi, '');

        // Remove inline styles from p tags but keep the tag
        result = result.replace(/<p[^>]*>/gi, '<p>');

        // Remove inline styles from li tags but preserve data-list attribute for Quill
        result = result.replace(/<li([^>]*)>/gi, (match, attrs) => {
            const dataListMatch = attrs.match(/data-list="([^"]*)"/);
            if (dataListMatch) {
                return `<li data-list="${dataListMatch[1]}">`;
            }
            return '<li>';
        });

        // Convert <div><br></div> patterns to <p><br></p> for Quill
        result = result.replace(/<div><br\s*\/?><\/div>/gi, '<p><br></p>');

        // Convert remaining divs to paragraphs
        result = result.replace(/<div>/gi, '<p>');
        result = result.replace(/<\/div>/gi, '</p>');

        // Handle \n in the content
        result = result.replace(/\\n/g, '<br>');

        // Convert <b> to <strong> (Quill uses strong)
        result = result.replace(/<b>/gi, '<strong>');
        result = result.replace(/<\/b>/gi, '</strong>');

        // Convert <i> to <em> (Quill uses em)
        result = result.replace(/<i>/gi, '<em>');
        result = result.replace(/<\/i>/gi, '</em>');

        // Convert <s> or <strike> to <s> (Quill uses s for strikethrough)
        result = result.replace(/<strike>/gi, '<s>');
        result = result.replace(/<\/strike>/gi, '</s>');

        // Remove <font> tags
        result = result.replace(/<font[^>]*>/gi, '');
        result = result.replace(/<\/font>/gi, '');

        // Convert <br> tags to paragraph structure for Quill
        // Quill drops <br> inside paragraphs, so we must convert them to separate <p> blocks
        result = this.convertBrToQuillParagraphs(result);

        // Clean up empty paragraphs at the start
        result = result.replace(/^(<p><br><\/p>)+/, '');

        // Add data-list attributes for Quill list recognition
        result = this.addQuillListAttributes(result);

        return result;
    }

    /**
     * Convert <br> tags to paragraph structure that Quill understands.
     * Quill's block model doesn't support <br> inside paragraphs - it silently drops them.
     * We convert <br> to paragraph breaks so line breaks are preserved.
     */
    convertBrToQuillParagraphs(html) {
        if (!html) return html;

        let result = html;

        // Step 1: Protect existing <p><br></p> patterns (they're already correct blank lines)
        const BLANK_LINE_PLACEHOLDER = '___BLANK_LINE_PLACEHOLDER___';
        result = result.replace(/<p><br\s*\/?><\/p>/gi, BLANK_LINE_PLACEHOLDER);

        // Step 2: Convert <br><br> (blank line) to empty paragraph
        const BR_PLACEHOLDER = '___BR_PLACEHOLDER___';
        result = result.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, `</p><p>${BR_PLACEHOLDER}</p><p>`);

        // Step 3: Convert remaining single <br> to paragraph break
        result = result.replace(/<br\s*\/?>/gi, '</p><p>');

        // Step 4: Restore placeholders
        result = result.replace(new RegExp(BR_PLACEHOLDER, 'g'), '<br>');
        result = result.replace(new RegExp(BLANK_LINE_PLACEHOLDER, 'g'), '<p><br></p>');

        // Step 5: Wrap leading text in <p> if it doesn't start with a tag
        if (result && !result.startsWith('<')) {
            const firstTagMatch = result.match(/<[^>]+>/);
            if (firstTagMatch) {
                const firstTagIndex = result.indexOf(firstTagMatch[0]);
                const leadingText = result.substring(0, firstTagIndex);
                const rest = result.substring(firstTagIndex);
                if (leadingText.trim()) {
                    result = `<p>${leadingText}</p>${rest}`;
                }
            } else {
                // No tags at all - wrap everything
                result = `<p>${result}</p>`;
            }
        }

        // Step 6: Fix malformed closing/opening tag sequences
        result = result.replace(/<\/p>\s*<\/p>/gi, '</p>');
        result = result.replace(/<p>\s*<p>/gi, '<p>');

        // Step 7: Remove empty paragraphs (but keep <p><br></p> for blank lines)
        result = result.replace(/<p><\/p>/g, '');

        return result;
    }

    /**
     * Add data-list attributes to list items for Quill compatibility
     * Quill requires data-list="ordered" or data-list="bullet" on <li> elements
     */
    addQuillListAttributes(html) {
        if (!html) return html;

        const parser = new DOMParser();
        const doc = parser.parseFromString('<div>' + html + '</div>', 'text/html');
        const container = doc.body.firstChild;

        // Add data-list="ordered" to li elements inside ol tags
        container.querySelectorAll('ol > li').forEach(li => {
            if (!li.getAttribute('data-list')) {
                li.setAttribute('data-list', 'ordered');
            }
        });

        // Add data-list="bullet" to li elements inside ul tags
        container.querySelectorAll('ul > li').forEach(li => {
            if (!li.getAttribute('data-list')) {
                li.setAttribute('data-list', 'bullet');
            }
        });

        return container.innerHTML;
    }

    /**
     * Convert Quill HTML back to Daylio-compatible HTML
     */
    quillToDaylioHtml(html) {
        if (!html || html === '<p><br></p>') return '';

        let result = html;

        // Remove Quill UI artifacts
        result = result.replace(/<span class="ql-ui"[^>]*>.*?<\/span>/gi, '');

        // Convert Quill's list format to standard HTML
        // Quill uses <ol> for both bullet and numbered lists with data-list attribute
        // Convert bullet lists: <li data-list="bullet"> within <ol> to <ul><li>
        result = result.replace(/<ol>(\s*<li data-list="bullet">)/gi, '<ul><li>');
        result = result.replace(/<li data-list="bullet">/gi, '<li>');
        // Fix closing tags for bullet lists that were converted
        result = result.replace(/<\/li>(\s*)<\/ol>/gi, (match, space, offset) => {
            // Check if this was a bullet list by looking back
            const before = result.substring(0, offset);
            if (before.lastIndexOf('<ul>') > before.lastIndexOf('<ol>')) {
                return '</li>' + space + '</ul>';
            }
            return match;
        });

        // Handle bullet lists properly with a more robust approach
        result = this.convertQuillLists(result);

        // Convert <strong> to <b>
        result = result.replace(/<strong>/gi, '<b>');
        result = result.replace(/<\/strong>/gi, '</b>');

        // Convert <em> to <i>
        result = result.replace(/<em>/gi, '<i>');
        result = result.replace(/<\/em>/gi, '</i>');

        // Convert paragraphs to divs (Daylio uses divs)
        result = result.replace(/<p>/gi, '<div>');
        result = result.replace(/<\/p>/gi, '</div>');

        // Clean up: Handle empty divs
        result = result.replace(/<div><\/div>/gi, '<div><br></div>');

        // Remove trailing <div><br></div>
        result = result.replace(/(<div><br><\/div>)+$/, '');

        // Remove leading/trailing whitespace
        result = result.trim();

        return result;
    }

    /**
     * Convert Quill's list format to standard HTML lists
     */
    convertQuillLists(html) {
        // Parse and rebuild lists properly
        const parser = new DOMParser();
        const doc = parser.parseFromString('<div>' + html + '</div>', 'text/html');
        const container = doc.body.firstChild;

        // Find all ol elements and convert based on their li children
        const ols = container.querySelectorAll('ol');
        ols.forEach(ol => {
            const items = ol.querySelectorAll('li');
            if (items.length > 0) {
                const firstItem = items[0];
                const listType = firstItem.getAttribute('data-list');

                if (listType === 'bullet') {
                    // Convert to ul
                    const ul = doc.createElement('ul');
                    items.forEach(li => {
                        li.removeAttribute('data-list');
                        ul.appendChild(li.cloneNode(true));
                    });
                    ol.parentNode.replaceChild(ul, ol);
                } else {
                    // Keep as ol with data-list="ordered" for Quill compatibility
                    items.forEach(li => {
                        li.setAttribute('data-list', 'ordered');
                    });
                }
            }
        });

        return container.innerHTML;
    }

    /**
     * Convert HTML note to plain text for preview/search
     */
    htmlToPlainText(html) {
        if (!html) return '';

        let text = html;

        // Replace <br> and <br/> with newlines
        text = text.replace(/<br\s*\/?>/gi, '\n');

        // Replace </div><div> patterns with newlines (paragraph breaks)
        text = text.replace(/<\/div>\s*<div>/gi, '\n');

        // Replace closing block tags with newlines
        text = text.replace(/<\/(div|p|li)>/gi, '\n');

        // Replace <li> with bullet point
        text = text.replace(/<li[^>]*>/gi, '• ');

        // Remove all remaining HTML tags
        text = text.replace(/<[^>]+>/g, '');

        // Decode HTML entities
        text = text.replace(/&nbsp;/g, ' ');
        text = text.replace(/&amp;/g, '&');
        text = text.replace(/&lt;/g, '<');
        text = text.replace(/&gt;/g, '>');
        text = text.replace(/&quot;/g, '"');
        text = text.replace(/&#39;/g, "'");

        // Handle escaped newlines from JSON
        text = text.replace(/\\n/g, '\n');

        // Clean up multiple consecutive newlines (max 2)
        text = text.replace(/\n{3,}/g, '\n\n');

        // Trim whitespace
        text = text.trim();

        return text;
    }

    /**
     * Escape HTML special characters to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Highlight search term in text (case-insensitive)
     * Returns HTML with <mark> tags around matches
     */
    highlightText(text, searchTerm) {
        if (!searchTerm || !text) return this.escapeHtml(text);

        const escaped = this.escapeHtml(text);
        const escapedTerm = this.escapeHtml(searchTerm);

        // Create case-insensitive regex, escaping regex special chars
        const regexSafe = escapedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${regexSafe})`, 'gi');

        return escaped.replace(regex, '<mark>$1</mark>');
    }

    /**
     * Decode base64 to UTF-8 string
     */
    base64DecodeUtf8(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder('utf-8').decode(bytes);
    }

    /**
     * Encode UTF-8 string to base64
     */
    base64EncodeUtf8(str) {
        const bytes = new TextEncoder().encode(str);
        let binaryString = '';
        for (let i = 0; i < bytes.length; i++) {
            binaryString += String.fromCharCode(bytes[i]);
        }
        return btoa(binaryString);
    }

    /**
     * Save the modified backup as a .daylio file
     */
    async saveBackup() {
        if (!this.data) return;

        try {
            // Update the entries in data
            this.data.dayEntries = this.entries;

            // Convert JSON to string (compact, no pretty printing)
            const jsonString = JSON.stringify(this.data);

            // Encode to base64 (with proper UTF-8 handling)
            const base64Content = this.base64EncodeUtf8(jsonString);

            // Create new ZIP
            const zip = new JSZip();

            // Add the encoded backup.daylio
            zip.file('backup.daylio', base64Content);

            // Add all assets
            for (const [path, content] of Object.entries(this.assets)) {
                zip.file(path, content);
            }

            // Generate the ZIP file with no compression (store only, like original)
            const blob = await zip.generateAsync({
                type: 'blob',
                compression: 'STORE'
            });

            // Download the file
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            // Generate filename with current date
            const now = new Date();
            const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;
            a.download = `backup_${dateStr}.daylio`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Clear unsaved changes flag
            this.clearUnsavedChanges();
        } catch (err) {
            alert('Error saving backup: ' + err.message);
        }
    }

    /**
     * Export entries as CSV file
     */
    exportCsv() {
        try {
            if (!this.entries || this.entries.length === 0) {
                alert('No entries to export');
                return;
            }

        // CSV header
        const headers = ['Date', 'Weekday', 'Time', 'Mood', 'Title', 'Note'];
        const rows = [headers];

        // Weekday names
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Sort entries by date (oldest first for CSV)
        const sortedEntries = [...this.entries].sort((a, b) => {
            const dateA = new Date(a.year, a.month, a.day, a.hour, a.minute);
            const dateB = new Date(b.year, b.month, b.day, b.hour, b.minute);
            return dateA - dateB;
        });

        for (const entry of sortedEntries) {
            // Format date as YYYY-MM-DD
            const date = `${entry.year}-${String(entry.month + 1).padStart(2, '0')}-${String(entry.day).padStart(2, '0')}`;

            // Get weekday
            const weekday = weekdays[new Date(entry.year, entry.month, entry.day).getDay()];

            // Format time
            const time = `${String(entry.hour).padStart(2, '0')}:${String(entry.minute).padStart(2, '0')}`;

            // Get mood label
            const mood = this.getMoodLabel(entry.mood);

            // Get title (or empty)
            const title = entry.note_title || '';

            // Get note as plain text
            const note = this.htmlToPlainText(entry.note || '');

            rows.push([date, weekday, time, mood, title, note]);
        }

        // Convert to CSV string
        const csv = rows.map(row =>
            row.map(cell => this.escapeCsvField(cell)).join(',')
        ).join('\n');

        // Add BOM for Excel UTF-8 compatibility
        const bom = '\uFEFF';
        const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8' });

        // Download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const now = new Date();
        const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;
        a.download = `daylio_export_${dateStr}.csv`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        } catch (err) {
            alert('Error exporting CSV: ' + err.message);
            console.error('CSV export error:', err);
        }
    }

    /**
     * Escape a field for CSV (handle quotes, commas, newlines)
     */
    escapeCsvField(field) {
        if (field === null || field === undefined) return '';

        const str = String(field);

        // If contains comma, quote, or newline, wrap in quotes and escape quotes
        if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
            return '"' + str.replace(/"/g, '""') + '"';
        }

        return str;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new DaylioScribe();
});
