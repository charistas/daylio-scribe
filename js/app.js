/**
 * Daylio Scribe - A human-friendly editor for Daylio backup notes
 */

class DaylioScribe {
    constructor() {
        this.data = null;
        this.entries = [];
        this.filteredEntries = [];
        this.currentEntryIndex = null;
        this.moods = {};  // Map of mood ID -> { label, groupId }
        this.quill = null;  // Quill editor instance
        this.isUpdating = false;  // Prevent recursive updates

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
        this.filterNotes = document.getElementById('filterNotes');
        this.searchInput = document.getElementById('searchInput');
        this.entriesList = document.getElementById('entriesList');
        this.saveBtn = document.getElementById('saveBtn');

        // Editor
        this.editorPlaceholder = document.getElementById('editorPlaceholder');
        this.editor = document.getElementById('editor');
        this.editorDate = document.getElementById('editorDate');
        this.editorMood = document.getElementById('editorMood');
        this.noteTitleInput = document.getElementById('noteTitleInput');
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

        // Listen for text changes
        this.quill.on('text-change', () => {
            if (!this.isUpdating) {
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
        this.filterNotes.addEventListener('change', () => this.applyFilters());
        this.searchInput.addEventListener('input', () => this.applyFilters());
        this.saveBtn.addEventListener('click', () => this.saveBackup());

        // Editor - auto-save on title change
        this.noteTitleInput.addEventListener('input', () => this.updateCurrentEntry());
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

        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.entries];

        // Filter by notes
        if (this.filterNotes.checked) {
            filtered = filtered.filter(e => e.note && e.note.length > 0);
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

    renderEntries() {
        this.entriesList.innerHTML = '';

        this.filteredEntries.forEach((entry, index) => {
            const originalIndex = this.entries.indexOf(entry);
            const div = document.createElement('div');
            div.className = 'entry-item';
            div.dataset.index = originalIndex;

            if (originalIndex === this.currentEntryIndex) {
                div.classList.add('active');
            }

            const date = this.formatDate(entry);
            const preview = this.getPreview(entry);
            const moodGroupId = this.getMoodGroupId(entry.mood);
            const moodClass = `mood-${moodGroupId}`;
            const moodLabel = this.getMoodLabel(entry.mood);

            const hasContent = entry.note_title?.trim() || entry.note;
            div.innerHTML = `
                <div class="entry-header">
                    <span class="entry-date">${date}</span>
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

    getPreview(entry) {
        // Show title if it exists
        if (entry.note_title && entry.note_title.trim()) {
            return entry.note_title.trim();
        }
        // Fall back to note preview
        if (!entry.note || entry.note.length === 0) {
            return 'No note';
        }
        const plain = this.htmlToPlainText(entry.note);
        return plain.length > 60 ? plain.substring(0, 60) + '...' : plain;
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

        // Load HTML content into Quill
        this.isUpdating = true;
        const cleanHtml = this.daylioToQuillHtml(entry.note || '');
        this.quill.root.innerHTML = cleanHtml;
        this.isUpdating = false;

        // Update active state in list
        document.querySelectorAll('.entry-item').forEach(el => {
            el.classList.toggle('active', parseInt(el.dataset.index) === index);
        });
    }

    updateCurrentEntry() {
        if (this.currentEntryIndex === null) return;

        const entry = this.entries[this.currentEntryIndex];
        entry.note_title = this.noteTitleInput.value;

        // Get HTML from Quill and convert to Daylio format
        const quillHtml = this.quill.root.innerHTML;
        entry.note = this.quillToDaylioHtml(quillHtml);

        // Update preview in list
        this.renderEntries();
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

        // Convert <br> to Quill line breaks within paragraphs
        // Quill handles <br> within <p> tags

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

        // Clean up empty paragraphs at the start
        result = result.replace(/^(<p><br><\/p>)+/, '');

        return result;
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
        } catch (err) {
            alert('Error saving backup: ' + err.message);
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new DaylioScribe();
});
