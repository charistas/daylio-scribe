/**
 * Daylio Scribe - A human-friendly editor for Daylio backup notes
 */

import type { DaylioBackup, DayEntry, Asset, MoodInfo, DateRange, VisibleRange, ToastType } from './types.js';
import {
    daylioToQuillHtml as convertDaylioToQuillHtml,
    quillToDaylioHtml as convertQuillToDaylioHtml,
    htmlToPlainText as convertHtmlToPlainText,
    escapeHtml as escapeHtmlText,
    highlightText as highlightPlainText
} from './conversions.js';
import {
    createDaylioArchive,
    readDaylioArchive
} from './daylioArchive.js';
import {
    SUPPORTED_VERSION,
    buildMoodLabels as createMoodLabels,
    buildTagLabels as createTagLabels,
    entryHasNote,
    filterEntries,
    getDateRange as resolveDateRange,
    getEntryTags as resolveEntryTags,
    getMoodGroupId as resolveMoodGroupId,
    getMoodLabel as resolveMoodLabel
} from './daylioData.js';
import {
    buildCsvExport,
    buildJsonExport,
    buildMarkdownExport,
    buildPdfDocDefinition
} from './exporters.js';

// Declare external globals (loaded via script tags)
declare const Quill: any;
declare const JSZip: any;
declare const html2canvas: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;
declare const pdfMake: any;

class DaylioScribe {
    // Data
    private data: DaylioBackup | null = null;
    private entries: DayEntry[] = [];
    private filteredEntries: DayEntry[] = [];
    private currentEntryIndex: number | null = null;
    private moods: Record<number, MoodInfo> = {};
    private tags: Record<number, string> = {};
    private assetMap: Record<number, Asset> | null = null;

    // Quill editor
    private quill: any = null;
    private isUpdating = false;
    private hasUnsavedChanges = false;
    private savedSelection: any = null;

    // Original entry states for revert (keyed by entry index)
    private originalEntryStates: Map<number, { note: string; note_title: string }> = new Map();

    // Calendar state
    private calendarDate = new Date();
    private selectedCalendarDate: Date | null = null;

    // Photo gallery state
    private currentEntryPhotos: string[] = [];
    private currentPhotoIndex = 0;
    private lightboxTrigger: HTMLElement | null = null;

    // Virtual scrolling state
    private itemHeight = 73;
    private bufferSize = 5;
    private lastVisibleStart = -1;
    private lastVisibleEnd = -1;
    private scrollRAF: number | null = null;

    // ZIP storage
    private archiveFiles: Record<string, Uint8Array> = {};
    private assets: Record<string, Uint8Array> = {};

    // DOM Elements
    private toastContainer!: HTMLElement;
    private dropzone!: HTMLElement;
    private fileInput!: HTMLInputElement;
    private app!: HTMLElement;
    private entryCount!: HTMLElement;
    private notesCount!: HTMLElement;
    private backupVersion!: HTMLElement;
    private filterNotes!: HTMLInputElement;
    private searchInput!: HTMLInputElement;
    private dateRangeSelect!: HTMLSelectElement;
    private customDateRange!: HTMLElement;
    private dateFrom!: HTMLInputElement;
    private dateTo!: HTMLInputElement;
    private entriesList!: HTMLElement;
    private entriesPanel!: HTMLElement;
    private miniCalendar!: HTMLElement;
    private calendarTitle!: HTMLElement;
    private calendarGrid!: HTMLElement;
    private prevMonthBtn!: HTMLElement;
    private nextMonthBtn!: HTMLElement;
    private saveBtn!: HTMLElement;
    private exportBtn!: HTMLElement;
    private exportMenu!: HTMLElement;
    private exportDropdown!: HTMLElement;
    private exportCsvBtn!: HTMLElement;
    private exportJsonBtn!: HTMLElement;
    private exportMarkdownBtn!: HTMLElement;
    private exportPdfBtn!: HTMLElement;
    private editorPlaceholder!: HTMLElement;
    private editor!: HTMLElement;
    private editorDate!: HTMLElement;
    private editorMood!: HTMLElement;
    private activitiesSection!: HTMLElement;
    private activitiesContainer!: HTMLElement;
    private noteTitleInput!: HTMLInputElement;
    private revertBtn!: HTMLButtonElement;
    private photoSection!: HTMLElement;
    private photoCount!: HTMLElement;
    private photoThumbnails!: HTMLElement;
    private photoLightbox!: HTMLElement;
    private lightboxImage!: HTMLImageElement;
    private lightboxCounter!: HTMLElement;
    private lightboxClose!: HTMLElement;
    private lightboxPrev!: HTMLElement;
    private lightboxNext!: HTMLElement;
    private emojiPickerPopup!: HTMLElement;
    private emojiPicker!: HTMLElement;
    private themeToggle!: HTMLButtonElement;

    // Insights modal elements
    private insightsBtn!: HTMLButtonElement;
    private insightsModal!: HTMLElement;
    private insightsClose!: HTMLButtonElement;
    private insightsOverlay!: HTMLElement;
    private statTotalEntries!: HTMLElement;
    private statCurrentStreak!: HTMLElement;
    private statLongestStreak!: HTMLElement;
    private statAvgMood!: HTMLElement;
    private yearLabel!: HTMLElement;
    private prevYearBtn!: HTMLButtonElement;
    private nextYearBtn!: HTMLButtonElement;
    private yearPixelsGrid!: HTMLElement;
    private monthLabels!: HTMLElement;
    private moodBreakdown!: HTMLElement;
    private insightsYear: number = new Date().getFullYear();
    // New insights elements
    private insightsDateRange!: HTMLSelectElement;
    private insightsActivity!: HTMLSelectElement;
    private filterSummary!: HTMLElement;
    private moodTrendsChart!: SVGElement;
    private topActivities!: HTMLElement;
    private entriesPerMonth!: HTMLElement;
    private exportInsightsBtn!: HTMLButtonElement;
    private insightsFilteredEntries: DayEntry[] = [];

    constructor() {
        this.initTheme();
        this.initElements();
        this.initQuill();
        this.bindEvents();
        this.initVirtualScroll();
    }

    private initTheme(): void {
        // Check for saved preference, otherwise use system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
        // If no saved theme, the CSS handles system preference via @media query
    }

    private toggleTheme(): void {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let newTheme: string;
        if (currentTheme === 'light') {
            newTheme = 'dark';
        } else if (currentTheme === 'dark') {
            newTheme = 'light';
        } else {
            // No explicit theme set, toggle from system preference
            newTheme = systemPrefersDark ? 'light' : 'dark';
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    private initElements(): void {
        this.toastContainer = document.getElementById('toastContainer')!;
        this.dropzone = document.getElementById('dropzone')!;
        this.fileInput = document.getElementById('fileInput') as HTMLInputElement;
        this.app = document.getElementById('app')!;
        this.entryCount = document.getElementById('entryCount')!;
        this.notesCount = document.getElementById('notesCount')!;
        this.backupVersion = document.getElementById('backupVersion')!;
        this.filterNotes = document.getElementById('filterNotes') as HTMLInputElement;
        this.searchInput = document.getElementById('searchInput') as HTMLInputElement;
        this.dateRangeSelect = document.getElementById('dateRangeSelect') as HTMLSelectElement;
        this.customDateRange = document.getElementById('customDateRange')!;
        this.dateFrom = document.getElementById('dateFrom') as HTMLInputElement;
        this.dateTo = document.getElementById('dateTo') as HTMLInputElement;
        this.entriesList = document.getElementById('entriesList')!;
        this.entriesPanel = this.entriesList.parentElement!;
        this.miniCalendar = document.getElementById('miniCalendar')!;
        this.calendarTitle = document.getElementById('calendarTitle')!;
        this.calendarGrid = document.getElementById('calendarGrid')!;
        this.prevMonthBtn = document.getElementById('prevMonth')!;
        this.nextMonthBtn = document.getElementById('nextMonth')!;
        this.saveBtn = document.getElementById('saveBtn')!;
        this.exportBtn = document.getElementById('exportBtn')!;
        this.exportMenu = document.getElementById('exportMenu')!;
        this.exportDropdown = this.exportBtn.parentElement!;
        this.exportCsvBtn = document.getElementById('exportCsvBtn')!;
        this.exportJsonBtn = document.getElementById('exportJsonBtn')!;
        this.exportMarkdownBtn = document.getElementById('exportMarkdownBtn')!;
        this.exportPdfBtn = document.getElementById('exportPdfBtn')!;
        this.editorPlaceholder = document.getElementById('editorPlaceholder')!;
        this.editor = document.getElementById('editor')!;
        this.editorDate = document.getElementById('editorDate')!;
        this.editorMood = document.getElementById('editorMood')!;
        this.activitiesSection = document.getElementById('activitiesSection')!;
        this.activitiesContainer = document.getElementById('activitiesContainer')!;
        this.noteTitleInput = document.getElementById('noteTitleInput') as HTMLInputElement;
        this.revertBtn = document.getElementById('revertBtn') as HTMLButtonElement;
        this.photoSection = document.getElementById('photoSection')!;
        this.photoCount = document.getElementById('photoCount')!;
        this.photoThumbnails = document.getElementById('photoThumbnails')!;
        this.photoLightbox = document.getElementById('photoLightbox')!;
        this.lightboxImage = document.getElementById('lightboxImage') as HTMLImageElement;
        this.lightboxCounter = document.getElementById('lightboxCounter')!;
        this.lightboxClose = document.getElementById('lightboxClose')!;
        this.lightboxPrev = document.getElementById('lightboxPrev')!;
        this.lightboxNext = document.getElementById('lightboxNext')!;
        this.themeToggle = document.getElementById('themeToggle') as HTMLButtonElement;

        // Insights modal
        this.insightsBtn = document.getElementById('insightsBtn') as HTMLButtonElement;
        this.insightsModal = document.getElementById('insightsModal')!;
        this.insightsClose = document.getElementById('insightsClose') as HTMLButtonElement;
        this.insightsOverlay = this.insightsModal.querySelector('.insights-overlay')!;
        this.statTotalEntries = document.getElementById('statTotalEntries')!;
        this.statCurrentStreak = document.getElementById('statCurrentStreak')!;
        this.statLongestStreak = document.getElementById('statLongestStreak')!;
        this.statAvgMood = document.getElementById('statAvgMood')!;
        this.yearLabel = document.getElementById('yearLabel')!;
        this.prevYearBtn = document.getElementById('prevYear') as HTMLButtonElement;
        this.nextYearBtn = document.getElementById('nextYear') as HTMLButtonElement;
        this.yearPixelsGrid = document.getElementById('yearPixelsGrid')!;
        this.monthLabels = document.getElementById('monthLabels')!;
        this.moodBreakdown = document.getElementById('moodBreakdown')!;
        this.insightsDateRange = document.getElementById('insightsDateRange') as HTMLSelectElement;
        this.insightsActivity = document.getElementById('insightsActivity') as HTMLSelectElement;
        this.filterSummary = document.getElementById('filterSummary')!;
        this.moodTrendsChart = document.getElementById('moodTrendsChart') as unknown as SVGElement;
        this.topActivities = document.getElementById('topActivities')!;
        this.entriesPerMonth = document.getElementById('entriesPerMonth')!;
        this.exportInsightsBtn = document.getElementById('exportInsightsBtn') as HTMLButtonElement;
    }

    private initQuill(): void {
        this.quill = new Quill('#noteEditor', {
            theme: 'snow',
            placeholder: 'Write your note here...',
            modules: {
                toolbar: {
                    container: [
                        ['undo', 'redo'],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['emoji']
                    ],
                    handlers: {
                        'emoji': () => this.toggleEmojiPicker(),
                        'undo': () => this.quill.history.undo(),
                        'redo': () => this.quill.history.redo()
                    }
                },
                keyboard: {
                    bindings: {
                        bold: {
                            key: 'B',
                            shortKey: true,
                            handler: function(this: any, _range: any, context: any) {
                                this.quill.format('bold', !context.format.bold);
                            }
                        },
                        italic: {
                            key: 'I',
                            shortKey: true,
                            handler: function(this: any, _range: any, context: any) {
                                this.quill.format('italic', !context.format.italic);
                            }
                        },
                        underline: {
                            key: 'U',
                            shortKey: true,
                            handler: function(this: any, _range: any, context: any) {
                                this.quill.format('underline', !context.format.underline);
                            }
                        }
                    }
                }
            }
        });

        this.quill.on('text-change', (_delta: any, _oldDelta: any, source: string) => {
            if (!this.isUpdating && source === 'user') {
                this.updateCurrentEntry();
            }
        });

        this.initEmojiPicker();
    }

    private initEmojiPicker(): void {
        this.emojiPickerPopup = document.getElementById('emojiPickerPopup')!;
        this.emojiPicker = document.querySelector('emoji-picker')!;

        // Add aria-labels to custom toolbar buttons
        setTimeout(() => {
            const emojiBtn = document.querySelector('.ql-emoji') as HTMLElement;
            if (emojiBtn) {
                emojiBtn.setAttribute('aria-label', 'Insert emoji');
                emojiBtn.setAttribute('title', 'Insert emoji');
            }
            const undoBtn = document.querySelector('.ql-undo') as HTMLElement;
            if (undoBtn) {
                undoBtn.setAttribute('aria-label', 'Undo');
                undoBtn.setAttribute('title', 'Undo (Ctrl+Z)');
            }
            const redoBtn = document.querySelector('.ql-redo') as HTMLElement;
            if (redoBtn) {
                redoBtn.setAttribute('aria-label', 'Redo');
                redoBtn.setAttribute('title', 'Redo (Ctrl+Shift+Z)');
            }
        }, 100);

        this.emojiPicker.addEventListener('emoji-click', (event: any) => {
            const emoji = event.detail.unicode;
            this.insertEmoji(emoji);
            this.hideEmojiPicker();
        });

        // Close on click outside
        document.addEventListener('click', (event: MouseEvent) => {
            if (!this.emojiPickerPopup.classList.contains('hidden')) {
                const target = event.target as HTMLElement;
                const isClickInside = this.emojiPickerPopup.contains(target) ||
                                     target.closest('.ql-emoji');
                if (!isClickInside) {
                    this.hideEmojiPicker();
                }
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !this.emojiPickerPopup.classList.contains('hidden')) {
                this.hideEmojiPicker();
                // Return focus to emoji button
                const emojiBtn = document.querySelector('.ql-emoji') as HTMLElement;
                emojiBtn?.focus();
            }
        });
    }

    private toggleEmojiPicker(): void {
        if (this.emojiPickerPopup.classList.contains('hidden')) {
            this.showEmojiPicker();
        } else {
            this.hideEmojiPicker();
        }
    }

    private showEmojiPicker(): void {
        const emojiButton = document.querySelector('.ql-emoji') as HTMLElement;
        const rect = emojiButton.getBoundingClientRect();

        this.emojiPickerPopup.style.top = (rect.bottom + 5) + 'px';
        this.emojiPickerPopup.style.left = rect.left + 'px';

        const pickerWidth = 350;
        if (rect.left + pickerWidth > window.innerWidth) {
            this.emojiPickerPopup.style.left = (window.innerWidth - pickerWidth - 10) + 'px';
        }

        this.emojiPickerPopup.classList.remove('hidden');
        this.savedSelection = this.quill.getSelection();
    }

    private hideEmojiPicker(): void {
        this.emojiPickerPopup.classList.add('hidden');
    }

    private insertEmoji(emoji: string): void {
        const range = this.savedSelection || { index: this.quill.getLength() - 1 };
        this.quill.insertText(range.index, emoji, 'user');
        this.quill.setSelection(range.index + emoji.length);
    }

    private bindEvents(): void {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Insights modal
        this.insightsBtn.addEventListener('click', () => this.openInsights());
        this.insightsClose.addEventListener('click', () => this.closeInsights());
        this.insightsOverlay.addEventListener('click', () => this.closeInsights());
        this.prevYearBtn.addEventListener('click', () => this.changeInsightsYear(-1));
        this.nextYearBtn.addEventListener('click', () => this.changeInsightsYear(1));
        this.insightsModal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeInsights();
        });
        this.insightsDateRange.addEventListener('change', () => this.applyInsightsFilters());
        this.insightsActivity.addEventListener('change', () => this.applyInsightsFilters());
        this.exportInsightsBtn.addEventListener('click', () => this.exportInsights());

        this.dropzone.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files?.[0]) this.handleFile(target.files[0]);
        });

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
            const file = e.dataTransfer?.files[0];
            if (file) this.handleFile(file);
        });

        this.filterNotes.addEventListener('change', () => {
            this.renderCalendar();
            this.applyFilters();
        });
        this.searchInput.addEventListener('input', () => this.applyFilters());
        this.saveBtn.addEventListener('click', () => this.saveBackup());

        // Export dropdown
        this.exportBtn.addEventListener('click', () => this.toggleExportMenu());
        this.exportCsvBtn.addEventListener('click', () => { this.closeExportMenu(); this.exportCsv(); });
        this.exportJsonBtn.addEventListener('click', () => { this.closeExportMenu(); this.exportJson(); });
        this.exportMarkdownBtn.addEventListener('click', () => { this.closeExportMenu(); this.exportMarkdown(); });
        this.exportPdfBtn.addEventListener('click', () => { this.closeExportMenu(); this.exportPdf(); });

        // Close export menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.exportDropdown.contains(e.target as Node)) {
                this.closeExportMenu();
            }
        });

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

        this.prevMonthBtn.addEventListener('click', () => {
            this.calendarDate.setMonth(this.calendarDate.getMonth() - 1);
            this.renderCalendar();
        });
        this.nextMonthBtn.addEventListener('click', () => {
            this.calendarDate.setMonth(this.calendarDate.getMonth() + 1);
            this.renderCalendar();
        });

        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.showPrevPhoto());
        this.lightboxNext.addEventListener('click', () => this.showNextPhoto());
        this.photoLightbox.querySelector('.lightbox-overlay')?.addEventListener('click', () => this.closeLightbox());

        document.addEventListener('keydown', (e) => {
            if (!this.photoLightbox.classList.contains('hidden')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.showPrevPhoto();
                if (e.key === 'ArrowRight') this.showNextPhoto();
            }
        });

        this.noteTitleInput.addEventListener('input', () => this.updateCurrentEntry());
        this.revertBtn.addEventListener('click', () => this.revertEntry());

        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
                return '';
            }
        });
    }

    private async handleFile(file: File): Promise<void> {
        if (!file || !file.name.endsWith('.daylio')) {
            this.showToast('error', 'Invalid File', 'Please select a .daylio backup file exported from the Daylio app.');
            return;
        }

        try {
            const dropzoneP = this.dropzone.querySelector('p');
            if (dropzoneP) dropzoneP.textContent = 'Loading...';

            const archive = await readDaylioArchive(JSZip, file);
            this.archiveFiles = archive.preservedFiles;
            this.assets = archive.assets;
            this.assetMap = null;
            this.data = archive.data;

            this.validateBackupStructure();

            if (!this.checkVersion()) {
                if (dropzoneP) dropzoneP.textContent = 'Drop your .daylio backup file here';
                return;
            }

            this.entries = this.data!.dayEntries || [];
            this.storeOriginalEntryStates();
            this.buildMoodLabels();
            this.buildTagLabels();
            this.showApp();
        } catch (err) {
            this.showToast('error', 'Failed to Load Backup', (err as Error).message);
            const dropzoneP = this.dropzone.querySelector('p');
            if (dropzoneP) dropzoneP.textContent = 'Drop your .daylio backup file here';
        }
    }

    private checkVersion(): boolean {
        const backupVersion = this.data?.version;

        if (backupVersion === undefined) {
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

    private validateBackupStructure(): void {
        if (!this.data || typeof this.data !== 'object') {
            throw new Error('Invalid backup: not a valid JSON object');
        }

        if (!Array.isArray(this.data.dayEntries)) {
            throw new Error('Invalid backup: missing or invalid dayEntries array');
        }

        if (!Array.isArray(this.data.customMoods)) {
            throw new Error('Invalid backup: missing or invalid customMoods array');
        }

        for (let i = 0; i < Math.min(this.data.dayEntries.length, 5); i++) {
            const entry = this.data.dayEntries[i];
            if (typeof entry.datetime !== 'number') {
                throw new Error(`Invalid backup: entry ${i} missing datetime field`);
            }
            if (typeof entry.mood !== 'number') {
                throw new Error(`Invalid backup: entry ${i} missing mood field`);
            }
        }
    }

    private buildMoodLabels(): void {
        this.moods = createMoodLabels(this.data?.customMoods || []);
    }

    private buildTagLabels(): void {
        this.tags = createTagLabels(this.data?.tags || []);
    }

    private getEntryTags(entry: DayEntry): string[] {
        return resolveEntryTags(entry, this.tags);
    }

    private storeOriginalEntryStates(): void {
        this.originalEntryStates.clear();
        for (let i = 0; i < this.entries.length; i++) {
            const entry = this.entries[i];
            this.originalEntryStates.set(i, {
                note: entry.note || '',
                note_title: entry.note_title || ''
            });
        }
    }

    private hasAnyChanges(): boolean {
        for (let i = 0; i < this.entries.length; i++) {
            const entry = this.entries[i];
            const original = this.originalEntryStates.get(i);
            if (!original) continue;

            if (entry.note !== original.note || entry.note_title !== original.note_title) {
                return true;
            }
        }
        return false;
    }

    private getMoodLabel(moodId: number): string {
        return resolveMoodLabel(this.moods, moodId);
    }

    private getMoodGroupId(moodId: number): number {
        return resolveMoodGroupId(this.moods, moodId);
    }

    private showApp(): void {
        this.dropzone.classList.add('hidden');
        this.app.classList.remove('hidden');

        const withNotes = this.entries.filter(e => entryHasNote(e, html => this.htmlToPlainText(html))).length;
        this.entryCount.textContent = `${this.entries.length} entries`;
        this.notesCount.textContent = `${withNotes} with notes`;

        const version = this.data?.version;
        if (version !== undefined) {
            this.backupVersion.textContent = `v${version}`;
            if (version > SUPPORTED_VERSION) {
                this.backupVersion.classList.add('version-warning');
                (this.backupVersion as HTMLElement).dataset.tooltip = `Unsupported version (tested up to v${SUPPORTED_VERSION})`;
            } else {
                this.backupVersion.classList.remove('version-warning');
                (this.backupVersion as HTMLElement).dataset.tooltip = 'Backup format version';
            }
        } else {
            this.backupVersion.textContent = 'v?';
            (this.backupVersion as HTMLElement).dataset.tooltip = 'Unknown version';
        }

        this.miniCalendar.classList.add('visible');
        this.renderCalendar();
        this.applyFilters();
    }

    private applyFilters(): void {
        const dateRange = this.getDateRange();
        const filtered = filterEntries(this.entries, {
            notesOnly: this.filterNotes.checked,
            dateRange,
            searchTerm: this.searchInput.value,
            textExtractor: html => this.htmlToPlainText(html)
        });

        filtered.sort((a, b) => b.datetime - a.datetime);

        this.filteredEntries = filtered;
        this.renderEntries();
    }

    private getDateRange(): DateRange | null {
        return resolveDateRange(
            this.dateRangeSelect.value,
            new Date(),
            this.dateFrom.value,
            this.dateTo.value
        );
    }

    private renderCalendar(): void {
        const year = this.calendarDate.getFullYear();
        const month = this.calendarDate.getMonth();

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        this.calendarTitle.textContent = `${monthNames[month]} ${year}`;

        const entriesMap = this.buildEntriesMap();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();

        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6;

        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

        this.calendarGrid.innerHTML = '';

        for (let i = 0; i < startDay; i++) {
            const prevMonthDay = new Date(year, month, -startDay + i + 1);
            this.calendarGrid.appendChild(this.createDayCell(prevMonthDay, entriesMap, true));
        }

        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(year, month, day);
            const isToday = isCurrentMonth && day === today.getDate();
            this.calendarGrid.appendChild(this.createDayCell(date, entriesMap, false, isToday));
        }

        const cellsUsed = startDay + totalDays;
        const cellsNeeded = Math.ceil(cellsUsed / 7) * 7;
        for (let i = 0; i < cellsNeeded - cellsUsed; i++) {
            const nextMonthDay = new Date(year, month + 1, i + 1);
            this.calendarGrid.appendChild(this.createDayCell(nextMonthDay, entriesMap, true));
        }
    }

    private createDayCell(date: Date, entriesMap: Record<string, DayEntry[]>, isOtherMonth: boolean, isToday = false): HTMLElement {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.textContent = String(date.getDate());

        // Accessibility: role and full date label
        cell.setAttribute('role', 'button');
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        const fullDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

        if (isOtherMonth) {
            cell.classList.add('other-month');
        }

        if (isToday) {
            cell.classList.add('today');
        }

        const isSelected = this.selectedCalendarDate &&
            date.getFullYear() === this.selectedCalendarDate.getFullYear() &&
            date.getMonth() === this.selectedCalendarDate.getMonth() &&
            date.getDate() === this.selectedCalendarDate.getDate();

        if (isSelected) {
            cell.classList.add('selected');
            cell.setAttribute('aria-pressed', 'true');
        } else {
            cell.setAttribute('aria-pressed', 'false');
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const cellDate = new Date(date);
        cellDate.setHours(0, 0, 0, 0);
        const isFuture = cellDate > today;

        if (isFuture) {
            cell.classList.add('future');
            cell.setAttribute('aria-disabled', 'true');
            cell.setAttribute('aria-label', `${fullDate}, future date`);
            return cell;
        }

        // Make clickable days focusable
        cell.setAttribute('tabindex', '0');

        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const dayEntries = entriesMap[dateKey];
        let ariaLabel = fullDate;

        if (dayEntries && dayEntries.length > 0) {
            cell.classList.add('has-entry');
            const moodGroupId = this.getMoodGroupId(dayEntries[0].mood);
            const moodColors: Record<number, string> = {
                1: '#4ecca3',
                2: '#7ed957',
                3: '#ffd93d',
                4: '#ff8c42',
                5: '#e94560'
            };
            cell.style.setProperty('--mood-color', moodColors[moodGroupId] || '#a0a0a0');
            ariaLabel += `, ${dayEntries.length} ${dayEntries.length === 1 ? 'entry' : 'entries'}`;
        }

        if (isToday) ariaLabel += ', today';
        if (isSelected) ariaLabel += ', selected';

        cell.setAttribute('aria-label', ariaLabel);

        cell.addEventListener('click', () => this.handleCalendarDayClick(date));
        cell.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleCalendarDayClick(date);
            }
        });

        return cell;
    }

    private buildEntriesMap(): Record<string, DayEntry[]> {
        const map: Record<string, DayEntry[]> = {};
        const notesOnly = this.filterNotes.checked;

        for (const entry of this.entries) {
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

    private handleCalendarDayClick(date: Date): void {
        if (this.selectedCalendarDate &&
            date.getFullYear() === this.selectedCalendarDate.getFullYear() &&
            date.getMonth() === this.selectedCalendarDate.getMonth() &&
            date.getDate() === this.selectedCalendarDate.getDate()) {
            this.selectedCalendarDate = null;
            this.dateRangeSelect.value = 'all';
            this.customDateRange.classList.add('hidden');
        } else {
            this.selectedCalendarDate = date;
            this.dateRangeSelect.value = 'custom';
            this.customDateRange.classList.remove('hidden');

            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            this.dateFrom.value = dateStr;
            this.dateTo.value = dateStr;
        }

        this.renderCalendar();
        this.applyFilters();
    }

    private initVirtualScroll(): void {
        this.entriesPanel.addEventListener('scroll', () => this.handleScroll());

        // Accessibility: Set up listbox role
        this.entriesList.setAttribute('role', 'listbox');
        this.entriesList.setAttribute('aria-label', 'Journal entries');

        // Keyboard navigation for entry list
        this.entriesList.addEventListener('keydown', (e) => this.handleEntryListKeydown(e));
    }

    private handleEntryListKeydown(e: KeyboardEvent): void {
        const focusedEl = document.activeElement as HTMLElement;
        if (!focusedEl?.classList.contains('entry-item')) return;

        const currentIndex = parseInt(focusedEl.dataset.virtualIndex || '0');
        let nextIndex: number | null = null;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                nextIndex = Math.min(currentIndex + 1, this.filteredEntries.length - 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                nextIndex = Math.max(currentIndex - 1, 0);
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                const originalIndex = parseInt(focusedEl.dataset.index || '0');
                this.selectEntry(originalIndex);
                return;
            case 'Home':
                e.preventDefault();
                nextIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                nextIndex = this.filteredEntries.length - 1;
                break;
            case 'Escape':
                e.preventDefault();
                this.deselectEntry();
                return;
            default:
                return;
        }

        if (nextIndex !== null && nextIndex !== currentIndex) {
            this.scrollToEntry(nextIndex);
            // Focus the new entry after scroll/render
            requestAnimationFrame(() => {
                const nextEl = this.entriesList.querySelector(`.entry-item[data-virtual-index="${nextIndex}"]`) as HTMLElement;
                nextEl?.focus();
            });
        }
    }

    private scrollToEntry(virtualIndex: number): void {
        const entriesListOffset = this.entriesList.offsetTop;
        const targetScrollTop = entriesListOffset + (virtualIndex * this.itemHeight);
        const containerHeight = this.entriesPanel.clientHeight;
        const currentScrollTop = this.entriesPanel.scrollTop;

        // Scroll if the target is outside visible area
        if (targetScrollTop < currentScrollTop) {
            this.entriesPanel.scrollTop = targetScrollTop;
        } else if (targetScrollTop + this.itemHeight > currentScrollTop + containerHeight) {
            this.entriesPanel.scrollTop = targetScrollTop - containerHeight + this.itemHeight;
        }
    }

    private handleScroll(): void {
        if (this.scrollRAF) return;

        this.scrollRAF = requestAnimationFrame(() => {
            this.scrollRAF = null;
            this.renderVirtualEntries(false);
        });
    }

    private calculateVisibleRange(): VisibleRange {
        const panelScrollTop = this.entriesPanel.scrollTop;
        const entriesListOffset = this.entriesList.offsetTop;
        const panelHeight = this.entriesPanel.clientHeight;
        const totalItems = this.filteredEntries.length;

        // Calculate effective scroll position relative to entries list
        const effectiveScrollTop = Math.max(0, panelScrollTop - entriesListOffset);

        // Calculate visible height (accounting for calendar/filters when not scrolled)
        const visibleTop = Math.max(0, entriesListOffset - panelScrollTop);
        const visibleHeight = panelHeight - visibleTop;

        const visibleStart = Math.floor(effectiveScrollTop / this.itemHeight);
        const visibleCount = Math.ceil(visibleHeight / this.itemHeight);
        const visibleEnd = Math.min(visibleStart + visibleCount, totalItems);

        const bufferedStart = Math.max(0, visibleStart - this.bufferSize);
        const bufferedEnd = Math.min(totalItems, visibleEnd + this.bufferSize);

        return { bufferedStart, bufferedEnd, totalItems };
    }

    private renderVirtualEntries(forceRender = true): void {
        const { bufferedStart, bufferedEnd, totalItems } = this.calculateVisibleRange();

        if (!forceRender &&
            bufferedStart === this.lastVisibleStart &&
            bufferedEnd === this.lastVisibleEnd) {
            return;
        }

        this.lastVisibleStart = bufferedStart;
        this.lastVisibleEnd = bufferedEnd;

        const searchTerm = this.searchInput.value.trim();
        const fragment = document.createDocumentFragment();

        if (totalItems === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.setAttribute('role', 'status');
            emptyState.textContent = this.entries.length === 0
                ? 'No entries found in this backup.'
                : 'No entries match the current filters.';

            this.entriesList.innerHTML = '';
            this.entriesList.appendChild(emptyState);
            return;
        }

        if (bufferedStart > 0) {
            const topSpacer = document.createElement('div');
            topSpacer.className = 'virtual-spacer';
            topSpacer.style.height = `${bufferedStart * this.itemHeight}px`;
            fragment.appendChild(topSpacer);
        }

        for (let i = bufferedStart; i < bufferedEnd; i++) {
            const entry = this.filteredEntries[i];
            const originalIndex = this.entries.indexOf(entry);
            const div = document.createElement('div');
            div.className = 'entry-item';
            div.dataset.index = String(originalIndex);
            div.dataset.virtualIndex = String(i);

            // Accessibility attributes
            div.setAttribute('role', 'option');
            div.setAttribute('tabindex', '0');

            const isActive = originalIndex === this.currentEntryIndex;
            if (isActive) {
                div.classList.add('active');
                div.setAttribute('aria-selected', 'true');
            } else {
                div.setAttribute('aria-selected', 'false');
            }

            const date = this.formatDate(entry);
            const preview = this.getPreview(entry, searchTerm);
            const moodGroupId = this.getMoodGroupId(entry.mood);
            const moodClass = `mood-${moodGroupId}`;
            const moodLabel = this.getMoodLabel(entry.mood);

            // Build accessible label
            const plainPreview = this.htmlToPlainText(entry.note || '').substring(0, 50);
            const ariaLabel = `${date}, ${moodLabel}${plainPreview ? ', ' + plainPreview : ''}`;
            div.setAttribute('aria-label', ariaLabel);

            const hasContent = entry.note_title?.trim() || entry.note;
            const hasPhotos = entry.assets && entry.assets.length > 0;
            const photoIcon = hasPhotos ? '<span class="photo-icon" aria-hidden="true">📷</span>' : '';
            const photoSrText = hasPhotos ? '<span class="sr-only">, has photos</span>' : '';

            const activityCount = entry.tags?.length || 0;
            const activityIndicator = activityCount > 0
                ? `<span class="activity-indicator" aria-hidden="true">${activityCount} activities</span>`
                : '';
            const activitySrText = activityCount > 0
                ? `<span class="sr-only">, ${activityCount} activities</span>`
                : '';

            div.innerHTML = `
                <div class="entry-header">
                    <span class="entry-date">${date}</span>
                    <span class="entry-indicators">${activityIndicator}${activitySrText}${photoIcon}${photoSrText}</span>
                    <span class="mood-badge ${moodClass}">${moodLabel}</span>
                </div>
                <div class="${hasContent ? 'entry-preview' : 'entry-no-note'}">${preview}</div>
            `;

            div.addEventListener('click', () => this.selectEntry(originalIndex));
            fragment.appendChild(div);
        }

        const remainingItems = totalItems - bufferedEnd;
        if (remainingItems > 0) {
            const bottomSpacer = document.createElement('div');
            bottomSpacer.className = 'virtual-spacer';
            bottomSpacer.style.height = `${remainingItems * this.itemHeight}px`;
            fragment.appendChild(bottomSpacer);
        }

        this.entriesList.innerHTML = '';
        this.entriesList.appendChild(fragment);
    }

    private renderEntries(): void {
        this.lastVisibleStart = -1;
        this.lastVisibleEnd = -1;
        this.entriesPanel.scrollTop = 0;
        this.renderVirtualEntries(true);
    }

    private formatDate(entry: DayEntry): string {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[entry.month]} ${entry.day}, ${entry.year}`;
    }

    private getPreview(entry: DayEntry, searchTerm = ''): string {
        const hasNote = entry.note && entry.note.length > 0;
        const hasTitle = entry.note_title && entry.note_title.trim();

        if (!hasTitle && !hasNote) {
            return this.escapeHtml('No note');
        }

        if (searchTerm && hasNote) {
            const plain = this.htmlToPlainText(entry.note);
            const lowerPlain = plain.toLowerCase();
            const lowerTerm = searchTerm.toLowerCase();
            const matchIndex = lowerPlain.indexOf(lowerTerm);

            if (matchIndex !== -1) {
                const snippetLength = 60;
                const termLength = searchTerm.length;

                let start = Math.max(0, matchIndex - Math.floor((snippetLength - termLength) / 2));
                let end = Math.min(plain.length, start + snippetLength);

                if (end === plain.length) {
                    start = Math.max(0, end - snippetLength);
                }

                let snippet = plain.substring(start, end);

                if (start > 0) snippet = '...' + snippet;
                if (end < plain.length) snippet = snippet + '...';

                return this.highlightText(snippet, searchTerm);
            }
        }

        let text: string;
        if (hasTitle) {
            text = entry.note_title!.trim();
        } else {
            const plain = this.htmlToPlainText(entry.note);
            text = plain.length > 60 ? plain.substring(0, 60) + '...' : plain;
        }

        return this.highlightText(text, searchTerm);
    }

    private selectEntry(index: number): void {
        this.currentEntryIndex = index;
        const entry = this.entries[index];

        this.editorPlaceholder.classList.add('hidden');
        this.editor.classList.remove('hidden');

        this.editorDate.textContent = this.formatDate(entry);
        this.editorMood.textContent = this.getMoodLabel(entry.mood);
        this.editorMood.className = `mood-badge mood-${this.getMoodGroupId(entry.mood)}`;

        this.noteTitleInput.value = entry.note_title || '';

        const cleanHtml = this.daylioToQuillHtml(entry.note || '');
        const delta = this.quill.clipboard.convert({ html: cleanHtml });
        this.quill.setContents(delta, 'silent');

        // Clear Quill history for new entry
        this.quill.history.clear();

        // Hide revert button for fresh entry
        this.revertBtn.classList.add('hidden');

        // Render activities
        this.renderActivities(entry);

        document.querySelectorAll('.entry-item').forEach(el => {
            const htmlEl = el as HTMLElement;
            el.classList.toggle('active', parseInt(htmlEl.dataset.index || '') === index);
            htmlEl.setAttribute('aria-selected', parseInt(htmlEl.dataset.index || '') === index ? 'true' : 'false');
        });

        // Announce to screen readers
        this.announceToScreenReader(`Selected entry: ${this.formatDate(entry)}, ${this.getMoodLabel(entry.mood)}`);

        this.renderPhotos(entry);
    }

    private deselectEntry(): void {
        this.currentEntryIndex = -1;
        this.editor.classList.add('hidden');
        this.editorPlaceholder.classList.remove('hidden');

        document.querySelectorAll('.entry-item').forEach(el => {
            el.classList.remove('active');
            el.setAttribute('aria-selected', 'false');
        });

        this.announceToScreenReader('Entry deselected');
    }

    private announceToScreenReader(message: string): void {
        // Use a visually hidden live region to announce to screen readers
        let liveRegion = document.getElementById('srAnnouncer');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'srAnnouncer';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }
        // Clear and set to trigger announcement
        liveRegion.textContent = '';
        setTimeout(() => {
            liveRegion!.textContent = message;
        }, 100);
    }

    private renderActivities(entry: DayEntry): void {
        const tagNames = this.getEntryTags(entry);

        if (tagNames.length === 0) {
            this.activitiesSection.classList.add('hidden');
            return;
        }

        this.activitiesContainer.innerHTML = tagNames
            .map(name => `<span class="activity-chip">${this.escapeHtml(name)}</span>`)
            .join('');

        this.activitiesSection.classList.remove('hidden');
    }

    private renderPhotos(entry: DayEntry): void {
        this.currentEntryPhotos.forEach(url => URL.revokeObjectURL(url));
        this.photoThumbnails.innerHTML = '';
        this.currentEntryPhotos = [];

        const entryAssetIds = entry.assets || [];
        if (entryAssetIds.length === 0) {
            this.photoSection.classList.add('hidden');
            return;
        }

        if (!this.assetMap) {
            this.assetMap = {};
            (this.data?.assets || []).forEach(asset => {
                this.assetMap![asset.id] = asset;
            });
        }

        let missingPhotoCount = 0;

        entryAssetIds.forEach((assetId, index) => {
            const asset = this.assetMap![assetId];
            if (!asset) {
                missingPhotoCount++;
                return;
            }

            const createdAt = new Date(asset.createdAt);
            const year = createdAt.getFullYear();
            const month = createdAt.getMonth() + 1;
            const assetPath = `assets/photos/${year}/${month}/${asset.checksum}`;
            const assetData = this.assets[assetPath];

            if (assetData) {
                const url = this.createImageUrl(assetData);
                this.currentEntryPhotos.push(url);
                const photoIndex = this.currentEntryPhotos.length - 1;

                const thumb = document.createElement('button');
                thumb.type = 'button';
                thumb.className = 'photo-thumbnail';
                thumb.setAttribute('aria-label', `Open photo ${this.currentEntryPhotos.length}`);
                thumb.innerHTML = `<img src="${url}" alt="Daylio photo ${index + 1}">`;
                thumb.addEventListener('click', () => this.openLightbox(photoIndex));
                this.photoThumbnails.appendChild(thumb);
            } else {
                missingPhotoCount++;
            }
        });

        if (missingPhotoCount > 0) {
            const warning = document.createElement('p');
            warning.className = 'photo-warning';
            warning.setAttribute('role', 'status');
            warning.textContent = `${missingPhotoCount} referenced ${missingPhotoCount === 1 ? 'photo is' : 'photos are'} missing from this backup.`;
            this.photoThumbnails.appendChild(warning);
        }

        if (this.currentEntryPhotos.length > 0) {
            this.photoSection.classList.remove('hidden');
            this.photoCount.textContent = String(this.currentEntryPhotos.length);
        } else if (missingPhotoCount > 0) {
            this.photoSection.classList.remove('hidden');
            this.photoCount.textContent = '0';
        } else {
            this.photoSection.classList.add('hidden');
        }
    }

    private createImageUrl(data: Uint8Array): string {
        let mimeType = 'image/jpeg';
        if (data[0] === 0x89 && data[1] === 0x50) {
            mimeType = 'image/png';
        } else if (data[0] === 0x47 && data[1] === 0x49) {
            mimeType = 'image/gif';
        }

        const blob = new Blob([data as unknown as BlobPart], { type: mimeType });
        return URL.createObjectURL(blob);
    }

    private openLightbox(index: number): void {
        if (this.currentEntryPhotos.length === 0) return;

        // Save trigger for focus return
        this.lightboxTrigger = document.activeElement as HTMLElement;

        this.currentPhotoIndex = index;
        this.updateLightboxImage();
        this.photoLightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Focus close button for accessibility
        this.lightboxClose.focus();

        // Add focus trap
        this.photoLightbox.addEventListener('keydown', this.handleLightboxKeydown);
    }

    private handleLightboxKeydown = (e: KeyboardEvent): void => {
        if (e.key === 'Tab') {
            const focusableEls = this.photoLightbox.querySelectorAll(
                'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ) as NodeListOf<HTMLElement>;

            const firstEl = focusableEls[0];
            const lastEl = focusableEls[focusableEls.length - 1];

            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
    };

    private closeLightbox(): void {
        this.photoLightbox.classList.add('hidden');
        document.body.style.overflow = '';

        // Remove focus trap
        this.photoLightbox.removeEventListener('keydown', this.handleLightboxKeydown);

        // Return focus to trigger element
        if (this.lightboxTrigger) {
            this.lightboxTrigger.focus();
            this.lightboxTrigger = null;
        }
    }

    private showPrevPhoto(): void {
        if (this.currentEntryPhotos.length === 0) return;
        this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.currentEntryPhotos.length) % this.currentEntryPhotos.length;
        this.updateLightboxImage();
    }

    private showNextPhoto(): void {
        if (this.currentEntryPhotos.length === 0) return;
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.currentEntryPhotos.length;
        this.updateLightboxImage();
    }

    private updateLightboxImage(): void {
        this.lightboxImage.src = this.currentEntryPhotos[this.currentPhotoIndex];
        this.lightboxCounter.textContent = `${this.currentPhotoIndex + 1} / ${this.currentEntryPhotos.length}`;

        const hasMultiple = this.currentEntryPhotos.length > 1;
        this.lightboxPrev.style.display = hasMultiple ? '' : 'none';
        this.lightboxNext.style.display = hasMultiple ? '' : 'none';
    }

    // ==================== Insights Dashboard ====================

    private openInsights(): void {
        this.insightsModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.insightsClose.focus();

        // Determine year to show (most recent entry year or current year)
        if (this.entries.length > 0) {
            this.insightsYear = new Date(this.entries[0].datetime).getFullYear();
        } else {
            this.insightsYear = new Date().getFullYear();
        }

        // Populate activity dropdown
        this.populateActivityDropdown();

        // Reset filters and apply
        this.insightsDateRange.value = 'all';
        this.insightsActivity.value = 'all';
        this.applyInsightsFilters();
    }

    private populateActivityDropdown(): void {
        // Get all unique activities from entries, sorted by frequency
        const activityCounts: Record<number, number> = {};
        for (const entry of this.entries) {
            for (const tagId of entry.tags || []) {
                activityCounts[tagId] = (activityCounts[tagId] || 0) + 1;
            }
        }

        // Sort by count descending
        const sortedActivities = Object.entries(activityCounts)
            .map(([id, count]) => ({ id: Number(id), count }))
            .sort((a, b) => b.count - a.count);

        // Build options
        let html = '<option value="all">All Activities</option>';
        for (const { id } of sortedActivities) {
            const name = this.tags[id] || `Activity ${id}`;
            html += `<option value="${id}">${this.escapeHtml(name)}</option>`;
        }
        this.insightsActivity.innerHTML = html;
    }

    private applyInsightsFilters(): void {
        const dateRange = this.insightsDateRange.value;
        const activityId = this.insightsActivity.value;

        // Start with all entries
        let filtered = [...this.entries];

        const range = resolveDateRange(dateRange);
        if (range) {
            filtered = filtered.filter(entry =>
                entry.datetime >= range.from && entry.datetime <= range.to
            );
        }

        // Apply activity filter
        if (activityId !== 'all') {
            const tagId = Number(activityId);
            filtered = filtered.filter(entry =>
                (entry.tags || []).includes(tagId)
            );
        }

        this.insightsFilteredEntries = filtered;

        // Update filter summary
        const total = this.entries.length;
        const showing = filtered.length;
        if (showing === total) {
            this.filterSummary.textContent = `Showing all ${total} entries`;
        } else {
            this.filterSummary.textContent = `Showing ${showing} of ${total} entries`;
        }

        this.renderInsights();
    }

    private closeInsights(): void {
        this.insightsModal.classList.add('hidden');
        document.body.style.overflow = '';
        this.insightsBtn.focus();
    }

    private async exportInsights(): Promise<void> {
        const insightsBody = this.insightsModal.querySelector('.insights-body') as HTMLElement;
        if (!insightsBody) return;

        // Show loading state
        const originalText = this.exportInsightsBtn.textContent;
        this.exportInsightsBtn.textContent = 'Exporting...';
        this.exportInsightsBtn.disabled = true;

        try {
            // Use html2canvas to capture the insights body
            const canvas = await html2canvas(insightsBody, {
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim() || '#1a1a2e',
                scale: 2, // Higher resolution
                logging: false,
                useCORS: true,
                allowTaint: true
            });

            // Convert to blob and download
            canvas.toBlob((blob) => {
                if (!blob) {
                    this.showToast('error', 'Failed to Export Insights', 'Could not generate the image.');
                    return;
                }

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;

                // Generate filename with date range info
                const dateRange = this.insightsDateRange.value;
                const activity = this.insightsActivity.value !== 'all'
                    ? `_${this.tags[Number(this.insightsActivity.value)] || 'activity'}`
                    : '';
                const timestamp = new Date().toISOString().slice(0, 10);
                link.download = `daylio-insights_${dateRange}${activity}_${timestamp}.png`;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                this.showToast('success', 'Insights Exported', 'Saved the insights dashboard as an image.');
            }, 'image/png');
        } catch (error) {
            console.error('Export failed:', error);
            this.showToast('error', 'Failed to Export Insights', (error as Error).message);
        } finally {
            // Restore button state
            this.exportInsightsBtn.textContent = originalText;
            this.exportInsightsBtn.disabled = false;
        }
    }

    private changeInsightsYear(delta: number): void {
        this.insightsYear += delta;
        this.yearLabel.textContent = String(this.insightsYear);
        this.renderYearPixels();
    }

    private renderInsights(): void {
        this.renderQuickStats();
        this.renderYearPixels();
        this.renderMoodBreakdown();
        this.renderMoodTrends();
        this.renderTopActivities();
        this.renderEntriesPerMonth();
    }

    private renderQuickStats(): void {
        const entries = this.insightsFilteredEntries;

        // Total entries
        this.statTotalEntries.textContent = String(entries.length);

        // Calculate streaks
        const { currentStreak, longestStreak } = this.calculateStreaks(entries);
        this.statCurrentStreak.textContent = `${currentStreak} days`;
        this.statLongestStreak.textContent = `${longestStreak} days`;

        // Average mood
        if (entries.length > 0) {
            let totalMoodGroup = 0;
            let count = 0;
            for (const entry of entries) {
                const moodGroup = this.getMoodGroupId(entry.mood);
                if (moodGroup >= 1 && moodGroup <= 5) {
                    totalMoodGroup += moodGroup;
                    count++;
                }
            }
            if (count > 0) {
                const avg = totalMoodGroup / count;
                // Convert to 5-star scale (1=awful to 5=great, so invert: 6 - avg)
                const starRating = (6 - avg).toFixed(1);
                this.statAvgMood.textContent = `${starRating}/5`;
            } else {
                this.statAvgMood.textContent = '-';
            }
        } else {
            this.statAvgMood.textContent = '-';
        }
    }

    private calculateStreaks(entries: DayEntry[]): { currentStreak: number; longestStreak: number } {
        if (entries.length === 0) {
            return { currentStreak: 0, longestStreak: 0 };
        }

        // Create a set of all entry dates (as date strings)
        // Use datetime (timestamp) for reliable date extraction
        const entryDates = new Set<string>();
        for (const entry of entries) {
            const date = new Date(entry.datetime);
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            entryDates.add(dateStr);
        }

        // Sort unique dates
        const sortedDates = Array.from(entryDates).sort().reverse();

        // Calculate current streak (from today backwards)
        const today = new Date();
        let currentStreak = 0;
        let checkDate = new Date(today);

        while (true) {
            const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
            if (entryDates.has(dateStr)) {
                currentStreak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else if (currentStreak === 0) {
                // Allow starting from yesterday if no entry today
                checkDate.setDate(checkDate.getDate() - 1);
                const yesterdayStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
                if (!entryDates.has(yesterdayStr)) {
                    break;
                }
            } else {
                break;
            }
        }

        // Calculate longest streak
        let longestStreak = 0;
        let streak = 0;
        let prevDate: Date | null = null;

        for (const dateStr of sortedDates) {
            const [year, month, day] = dateStr.split('-').map(Number);
            const currentDate = new Date(year, month - 1, day);

            if (prevDate === null) {
                streak = 1;
            } else {
                const diffDays = Math.round((prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    streak++;
                } else {
                    longestStreak = Math.max(longestStreak, streak);
                    streak = 1;
                }
            }
            prevDate = currentDate;
        }
        longestStreak = Math.max(longestStreak, streak);

        return { currentStreak, longestStreak };
    }

    private renderYearPixels(): void {
        this.yearLabel.textContent = String(this.insightsYear);

        // Build a map of date -> mood for the selected year
        // Use datetime (timestamp) for reliable date extraction
        const moodMap = new Map<string, number>();
        for (const entry of this.insightsFilteredEntries) {
            const date = new Date(entry.datetime);
            if (date.getFullYear() === this.insightsYear) {
                const key = `${date.getMonth()}-${date.getDate()}`;
                // Keep the first entry of the day (or best mood if multiple)
                if (!moodMap.has(key)) {
                    moodMap.set(key, this.getMoodGroupId(entry.mood));
                }
            }
        }

        // Render month labels
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.monthLabels.innerHTML = months
            .map(m => `<div class="month-label">${m}</div>`)
            .join('');

        // Render pixel grid (12 rows x up to 31 columns)
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Check for leap year
        if ((this.insightsYear % 4 === 0 && this.insightsYear % 100 !== 0) || this.insightsYear % 400 === 0) {
            daysInMonth[1] = 29;
        }

        let html = '';
        for (let month = 0; month < 12; month++) {
            for (let day = 1; day <= 31; day++) {
                const key = `${month}-${day}`;
                const moodGroup = moodMap.get(key);

                if (day <= daysInMonth[month]) {
                    const moodClass = moodGroup ? `mood-${moodGroup}` : 'empty';
                    const dateStr = `${months[month]} ${day}, ${this.insightsYear}`;
                    const moodLabel = moodGroup ? this.getMoodLabelByGroup(moodGroup) : 'No entry';
                    html += `<div class="pixel ${moodClass}" title="${dateStr}: ${moodLabel}" data-month="${month}" data-day="${day}"></div>`;
                } else {
                    // Empty placeholder for grid alignment
                    html += `<div class="pixel" style="visibility: hidden;"></div>`;
                }
            }
        }

        this.yearPixelsGrid.innerHTML = html;

        // Add click handlers to jump to entry
        this.yearPixelsGrid.querySelectorAll('.pixel:not(.empty)').forEach(pixel => {
            pixel.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const month = parseInt(target.dataset.month || '0');
                const day = parseInt(target.dataset.day || '1');
                this.jumpToDate(this.insightsYear, month, day);
            });
        });
    }

    private getMoodLabelByGroup(groupId: number): string {
        const labels = ['', 'Great', 'Good', 'Meh', 'Bad', 'Awful'];
        return labels[groupId] || '';
    }

    private jumpToDate(year: number, month: number, day: number): void {
        // Find entry for this date using datetime
        const entry = this.entries.find(e => {
            const d = new Date(e.datetime);
            return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
        });
        if (entry) {
            const index = this.entries.indexOf(entry);
            this.closeInsights();
            this.selectEntry(index);

            // Scroll to the entry in the list
            this.scrollToEntry(this.filteredEntries.indexOf(entry));
        }
    }

    private renderMoodBreakdown(): void {
        // Count moods by group
        const moodCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let total = 0;

        for (const entry of this.insightsFilteredEntries) {
            const groupId = this.getMoodGroupId(entry.mood);
            if (groupId >= 1 && groupId <= 5) {
                moodCounts[groupId]++;
                total++;
            }
        }

        if (total === 0) {
            this.moodBreakdown.innerHTML = '<p style="color: var(--text-secondary);">No mood data available</p>';
            return;
        }

        const labels = ['', 'Great', 'Good', 'Meh', 'Bad', 'Awful'];
        let html = '';

        for (let i = 1; i <= 5; i++) {
            const count = moodCounts[i];
            const percent = ((count / total) * 100).toFixed(1);
            html += `
                <div class="mood-bar-row">
                    <span class="mood-bar-label">${labels[i]}</span>
                    <div class="mood-bar-container">
                        <div class="mood-bar mood-${i}" style="width: ${percent}%"></div>
                    </div>
                    <span class="mood-bar-percent">${percent}%</span>
                </div>
            `;
        }

        this.moodBreakdown.innerHTML = html;
    }

    private renderMoodTrends(): void {
        const entries = this.insightsFilteredEntries;

        if (entries.length < 2) {
            this.moodTrendsChart.innerHTML = '<text x="300" y="100" text-anchor="middle" class="axis-label">Not enough data for trends</text>';
            return;
        }

        // Group entries by week and calculate average mood
        const weeklyMoods: { week: string; avg: number; count: number }[] = [];
        const weekMap = new Map<string, { total: number; count: number }>();

        // Sort entries chronologically
        const sorted = [...entries].sort((a, b) => a.datetime - b.datetime);

        for (const entry of sorted) {
            const date = new Date(entry.datetime);
            // Get week start (Monday)
            const day = date.getDay();
            const diff = date.getDate() - day + (day === 0 ? -6 : 1);
            const weekStart = new Date(date.setDate(diff));
            const weekKey = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, '0')}-${String(weekStart.getDate()).padStart(2, '0')}`;

            const moodGroup = this.getMoodGroupId(entry.mood);
            if (moodGroup >= 1 && moodGroup <= 5) {
                const existing = weekMap.get(weekKey) || { total: 0, count: 0 };
                existing.total += (6 - moodGroup); // Invert: 1=awful(1) to 5=great(5)
                existing.count++;
                weekMap.set(weekKey, existing);
            }
        }

        // Convert to array and calculate averages
        for (const [week, data] of weekMap) {
            weeklyMoods.push({
                week,
                avg: data.total / data.count,
                count: data.count
            });
        }

        // Sort by week
        weeklyMoods.sort((a, b) => a.week.localeCompare(b.week));

        // Limit to last 52 weeks if more data
        const displayData = weeklyMoods.slice(-52);

        if (displayData.length < 2) {
            this.moodTrendsChart.innerHTML = '<text x="300" y="100" text-anchor="middle" class="axis-label">Not enough data for trends</text>';
            return;
        }

        // SVG dimensions
        const width = 600;
        const height = 200;
        const padding = { top: 20, right: 20, bottom: 30, left: 40 };
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        // Scale functions
        const xScale = (i: number) => padding.left + (i / (displayData.length - 1)) * chartWidth;
        const yScale = (v: number) => padding.top + chartHeight - ((v - 1) / 4) * chartHeight;

        // Build SVG content
        let svg = '';

        // Grid lines
        for (let i = 1; i <= 5; i++) {
            const y = yScale(i);
            svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="grid-line"/>`;
            svg += `<text x="${padding.left - 5}" y="${y + 3}" text-anchor="end" class="mood-label">${i}</text>`;
        }

        // Y-axis labels
        svg += `<text x="${padding.left - 25}" y="${height / 2}" text-anchor="middle" transform="rotate(-90, ${padding.left - 25}, ${height / 2})" class="axis-label">Mood</text>`;

        // Build line path
        let pathD = '';
        let areaD = '';
        const points: string[] = [];

        for (let i = 0; i < displayData.length; i++) {
            const x = xScale(i);
            const y = yScale(displayData[i].avg);
            if (i === 0) {
                pathD = `M ${x} ${y}`;
                areaD = `M ${x} ${padding.top + chartHeight} L ${x} ${y}`;
            } else {
                pathD += ` L ${x} ${y}`;
                areaD += ` L ${x} ${y}`;
            }
            points.push(`<circle cx="${x}" cy="${y}" r="4" class="data-point" title="${displayData[i].week}: ${displayData[i].avg.toFixed(1)}/5"/>`);
        }

        // Close area path
        areaD += ` L ${xScale(displayData.length - 1)} ${padding.top + chartHeight} Z`;

        svg += `<path d="${areaD}" class="trend-area"/>`;
        svg += `<path d="${pathD}" class="trend-line"/>`;
        svg += points.join('');

        // X-axis labels (show first, middle, last)
        const labelIndices = [0, Math.floor(displayData.length / 2), displayData.length - 1];
        for (const i of labelIndices) {
            const x = xScale(i);
            const label = displayData[i].week.slice(5); // MM-DD format
            svg += `<text x="${x}" y="${height - 5}" text-anchor="middle" class="axis-label">${label}</text>`;
        }

        this.moodTrendsChart.innerHTML = svg;
    }

    private renderTopActivities(): void {
        const entries = this.insightsFilteredEntries;
        const selectedActivityId = this.insightsActivity.value;
        const isFilteredByActivity = selectedActivityId !== 'all';

        // Count activities and their mood associations
        const activityStats: Record<number, { count: number; moodTotal: number }> = {};

        for (const entry of entries) {
            const moodGroup = this.getMoodGroupId(entry.mood);
            const moodScore = moodGroup >= 1 && moodGroup <= 5 ? (6 - moodGroup) : 0;

            for (const tagId of entry.tags || []) {
                // Skip the selected activity when filtering by activity (show co-occurring only)
                if (isFilteredByActivity && tagId === Number(selectedActivityId)) {
                    continue;
                }

                if (!activityStats[tagId]) {
                    activityStats[tagId] = { count: 0, moodTotal: 0 };
                }
                activityStats[tagId].count++;
                if (moodScore > 0) {
                    activityStats[tagId].moodTotal += moodScore;
                }
            }
        }

        // Sort by count descending
        const sorted = Object.entries(activityStats)
            .map(([id, stats]) => ({
                id: Number(id),
                name: this.tags[Number(id)] || `Activity ${id}`,
                count: stats.count,
                avgMood: stats.moodTotal / stats.count
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10); // Top 10

        if (sorted.length === 0) {
            const message = isFilteredByActivity
                ? 'No co-occurring activities found'
                : 'No activity data available';
            this.topActivities.innerHTML = `<p class="no-data-message">${message}</p>`;
            return;
        }

        const maxCount = sorted[0].count;
        const selectedActivityName = isFilteredByActivity
            ? this.tags[Number(selectedActivityId)] || 'selected activity'
            : '';

        let html = '';
        if (isFilteredByActivity) {
            html += `<p class="co-occurring-label">Activities that co-occur with "${this.escapeHtml(selectedActivityName)}":</p>`;
        }

        for (const activity of sorted) {
            const barWidth = (activity.count / maxCount) * 100;
            const moodColor = this.getMoodColorByScore(activity.avgMood);
            html += `
                <div class="activity-stat">
                    <span class="activity-stat-name" title="${this.escapeHtml(activity.name)}">${this.escapeHtml(activity.name)}</span>
                    <div class="activity-stat-bar-container">
                        <div class="activity-stat-bar" style="width: ${barWidth}%; background: ${moodColor};"></div>
                    </div>
                    <span class="activity-stat-count">${activity.count}×</span>
                    <span class="activity-stat-mood" title="Avg mood">${activity.avgMood.toFixed(1)}/5</span>
                </div>
            `;
        }

        this.topActivities.innerHTML = html;
    }

    private getMoodColorByScore(score: number): string {
        // Score is 1-5 (awful to great)
        if (score >= 4.5) return 'var(--mood-great)';
        if (score >= 3.5) return 'var(--mood-good)';
        if (score >= 2.5) return 'var(--mood-meh)';
        if (score >= 1.5) return 'var(--mood-bad)';
        return 'var(--mood-awful)';
    }

    private renderEntriesPerMonth(): void {
        const entries = this.insightsFilteredEntries;

        if (entries.length === 0) {
            this.entriesPerMonth.innerHTML = '<p class="no-data-message">No entries to display</p>';
            return;
        }

        // Get the date range from entries
        const sorted = [...entries].sort((a, b) => a.datetime - b.datetime);
        const firstDate = new Date(sorted[0].datetime);
        const lastDate = new Date(sorted[sorted.length - 1].datetime);

        // Count entries per month
        const monthCounts: { key: string; label: string; count: number }[] = [];
        const countMap = new Map<string, number>();

        for (const entry of entries) {
            const date = new Date(entry.datetime);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            countMap.set(key, (countMap.get(key) || 0) + 1);
        }

        // Build month list from first to last
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let current = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
        const end = new Date(lastDate.getFullYear(), lastDate.getMonth(), 1);

        while (current <= end) {
            const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
            const label = `${months[current.getMonth()]} ${String(current.getFullYear()).slice(2)}`;
            monthCounts.push({
                key,
                label,
                count: countMap.get(key) || 0
            });
            current.setMonth(current.getMonth() + 1);
        }

        // Limit to last 12 months if too many
        const displayData = monthCounts.slice(-12);

        if (displayData.length === 0) {
            this.entriesPerMonth.innerHTML = '<p class="no-data-message">No entries to display</p>';
            return;
        }

        const maxCount = Math.max(...displayData.map(m => m.count));
        const maxBarHeight = 100; // pixels

        let html = '';
        for (const month of displayData) {
            const barHeight = maxCount > 0 ? Math.round((month.count / maxCount) * maxBarHeight) : 0;
            html += `
                <div class="month-bar-container">
                    <span class="month-bar-count">${month.count || ''}</span>
                    <div class="month-bar" style="height: ${barHeight}px;" title="${month.label}: ${month.count} entries"></div>
                    <span class="month-bar-label">${month.label}</span>
                </div>
            `;
        }

        this.entriesPerMonth.innerHTML = html;
    }

    private updateCurrentEntry(): void {
        if (this.currentEntryIndex === null || this.currentEntryIndex < 0) return;

        const entry = this.entries[this.currentEntryIndex];
        if (!entry) return;
        entry.note_title = this.noteTitleInput.value;

        const quillHtml = this.quill.root.innerHTML;
        entry.note = this.quillToDaylioHtml(quillHtml);

        this.markUnsavedChanges();
        this.updateEntryPreview(this.currentEntryIndex);

        // Show revert button if entry differs from original
        const original = this.originalEntryStates.get(this.currentEntryIndex);
        if (original) {
            const hasChanges = entry.note !== original.note ||
                              entry.note_title !== original.note_title;
            this.revertBtn.classList.toggle('hidden', !hasChanges);
        }
    }

    private revertEntry(): void {
        if (this.currentEntryIndex === null || this.currentEntryIndex < 0) return;

        const original = this.originalEntryStates.get(this.currentEntryIndex);
        if (!original) return;

        const entry = this.entries[this.currentEntryIndex];
        if (!entry) return;

        // Restore original values
        entry.note = original.note;
        entry.note_title = original.note_title;

        // Update UI
        this.noteTitleInput.value = entry.note_title;
        const cleanHtml = this.daylioToQuillHtml(entry.note);
        const delta = this.quill.clipboard.convert({ html: cleanHtml });
        this.quill.setContents(delta, 'silent');
        this.quill.history.clear();

        // Update entry preview in list
        this.updateEntryPreview(this.currentEntryIndex);

        // Hide revert button
        this.revertBtn.classList.add('hidden');

        // Update unsaved changes indicator
        if (!this.hasAnyChanges()) {
            this.clearUnsavedChanges();
        }

        this.showToast('info', 'Entry Reverted', 'Entry restored to its original state.');
    }

    private updateEntryPreview(originalIndex: number): void {
        const entryEl = this.entriesList.querySelector(`.entry-item[data-index="${originalIndex}"]`);
        if (!entryEl) return;

        const entry = this.entries[originalIndex];
        const searchTerm = this.searchInput.value.trim();
        const preview = this.getPreview(entry, searchTerm);
        const hasContent = entry.note_title?.trim() || entry.note;

        const previewEl = entryEl.querySelector('.entry-preview, .entry-no-note');
        if (previewEl) {
            previewEl.className = hasContent ? 'entry-preview' : 'entry-no-note';
            previewEl.innerHTML = preview;
        }
    }

    private markUnsavedChanges(): void {
        if (!this.hasUnsavedChanges) {
            this.hasUnsavedChanges = true;
            this.saveBtn.classList.add('has-changes');
            this.saveBtn.textContent = 'Download Backup *';
        }
    }

    private clearUnsavedChanges(): void {
        this.hasUnsavedChanges = false;
        this.saveBtn.classList.remove('has-changes');
        this.saveBtn.textContent = 'Download Backup';
    }

    // HTML conversion methods
    private daylioToQuillHtml(html: string): string {
        return convertDaylioToQuillHtml(html);
    }

    private quillToDaylioHtml(html: string): string {
        return convertQuillToDaylioHtml(html);
    }

    private htmlToPlainText(html: string): string {
        return convertHtmlToPlainText(html);
    }

    private showToast(type: ToastType, title: string, message = '', duration = 5000): HTMLElement {
        const icons: Record<ToastType, string> = {
            error: '✕',
            success: '✓',
            warning: '⚠',
            info: 'ℹ'
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <div class="toast-content">
                <div class="toast-title">${this.escapeHtml(title)}</div>
                ${message ? `<div class="toast-message">${this.escapeHtml(message)}</div>` : ''}
            </div>
            <button class="toast-close" aria-label="Close">×</button>
        `;

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn?.addEventListener('click', () => this.dismissToast(toast));

        this.toastContainer.appendChild(toast);

        if (duration > 0) {
            setTimeout(() => this.dismissToast(toast), duration);
        }

        return toast;
    }

    private dismissToast(toast: HTMLElement): void {
        if (!toast || !toast.parentNode) return;

        toast.classList.add('toast-out');
        toast.addEventListener('animationend', () => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        });
    }

    private escapeHtml(text: string): string {
        return escapeHtmlText(text);
    }

    private highlightText(text: string, searchTerm: string): string {
        return highlightPlainText(text, searchTerm);
    }

    private async saveBackup(): Promise<void> {
        if (!this.data) return;

        try {
            this.data.dayEntries = this.entries;

            const blob = await createDaylioArchive(JSZip, this.data, this.archiveFiles, {
                type: 'blob',
                compression: 'STORE'
            }) as Blob;

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            const now = new Date();
            const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;
            a.download = `backup_${dateStr}.daylio`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.clearUnsavedChanges();
            this.showToast('success', 'Backup Downloaded', 'Your modified backup is ready to import into Daylio.');
        } catch (err) {
            this.showToast('error', 'Failed to Save Backup', (err as Error).message);
        }
    }

    private toggleExportMenu(): void {
        const isOpen = this.exportDropdown.classList.contains('open');
        if (isOpen) {
            this.closeExportMenu();
        } else {
            this.exportDropdown.classList.add('open');
            this.exportBtn.setAttribute('aria-expanded', 'true');
        }
    }

    private closeExportMenu(): void {
        this.exportDropdown.classList.remove('open');
        this.exportBtn.setAttribute('aria-expanded', 'false');
    }

    private exportCsv(): void {
        try {
            if (!this.entries || this.entries.length === 0) {
                this.showToast('warning', 'No Entries', 'Load a backup file first before exporting.');
                return;
            }

            const csv = buildCsvExport(this.entries, this.moods, this.tags);
            const bom = '\uFEFF';
            const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8' });

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

            this.showToast('success', 'CSV Exported', `Exported ${this.entries.length} entries to CSV.`);
        } catch (err) {
            this.showToast('error', 'Failed to Export CSV', (err as Error).message);
            console.error('CSV export error:', err);
        }
    }

    private exportJson(): void {
        try {
            if (!this.data) {
                this.showToast('warning', 'No Data', 'Load a backup file first before exporting.');
                return;
            }

            const jsonString = buildJsonExport(this.data);
            const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            const now = new Date();
            const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;
            a.download = `daylio_export_${dateStr}.json`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showToast('success', 'JSON Exported', `Exported ${this.entries.length} entries to JSON.`);
        } catch (err) {
            this.showToast('error', 'Failed to Export JSON', (err as Error).message);
            console.error('JSON export error:', err);
        }
    }

    private exportMarkdown(): void {
        try {
            if (!this.entries || this.entries.length === 0) {
                this.showToast('warning', 'No Entries', 'Load a backup file first before exporting.');
                return;
            }

            const markdown = buildMarkdownExport(this.entries, this.moods, this.tags);
            const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            const now = new Date();
            const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;
            a.download = `daylio_export_${dateStr}.md`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showToast('success', 'Markdown Exported', `Exported ${this.entries.length} entries to Markdown.`);
        } catch (err) {
            this.showToast('error', 'Failed to Export Markdown', (err as Error).message);
            console.error('Markdown export error:', err);
        }
    }

    private exportPdf(): void {
        try {
            if (!this.entries || this.entries.length === 0) {
                this.showToast('warning', 'No Entries', 'Load a backup file first before exporting.');
                return;
            }

            const docDefinition = buildPdfDocDefinition(this.entries, this.moods, this.tags);

            // Generate and download PDF
            const now = new Date();
            const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;
            pdfMake.createPdf(docDefinition).download(`daylio_export_${dateStr}.pdf`);

            this.showToast('success', 'PDF Exported', `Exported ${this.entries.length} entries to PDF.`);
        } catch (err) {
            this.showToast('error', 'Failed to Export PDF', (err as Error).message);
            console.error('PDF export error:', err);
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new DaylioScribe();
});
