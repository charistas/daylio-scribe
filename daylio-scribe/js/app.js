/**
 * Daylio Scribe - A human-friendly editor for Daylio backup notes
 */

class DaylioScribe {
    constructor() {
        this.data = null;
        this.entries = [];
        this.filteredEntries = [];
        this.currentEntryIndex = null;
        this.moodLabels = ['', 'great', 'good', 'meh', 'bad', 'awful'];

        // Store the original ZIP contents for repackaging
        this.originalZip = null;
        this.assets = {};  // Store asset files from the ZIP

        this.initElements();
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
        this.noteInput = document.getElementById('noteInput');
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

        // Editor - auto-save on change
        this.noteTitleInput.addEventListener('input', () => this.updateCurrentEntry());
        this.noteInput.addEventListener('input', () => this.updateCurrentEntry());
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

            this.showApp();
        } catch (err) {
            alert('Error loading backup: ' + err.message);
            this.dropzone.querySelector('p').textContent = 'Drop your .daylio backup file here';
        }
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
            const moodClass = `mood-${entry.mood}`;
            const moodLabel = this.moodLabels[entry.mood] || '';

            div.innerHTML = `
                <div class="entry-header">
                    <span class="entry-date">${date}</span>
                    <span class="mood-badge ${moodClass}">${moodLabel}</span>
                </div>
                <div class="${entry.note ? 'entry-preview' : 'entry-no-note'}">${preview}</div>
            `;

            div.addEventListener('click', () => this.selectEntry(originalIndex));
            this.entriesList.appendChild(div);
        });
    }

    formatDate(entry) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[entry.month - 1]} ${entry.day}, ${entry.year}`;
    }

    getPreview(entry) {
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
        this.editorMood.textContent = this.moodLabels[entry.mood] || '';
        this.editorMood.className = `mood-badge mood-${entry.mood}`;

        this.noteTitleInput.value = entry.note_title || '';
        this.noteInput.value = this.htmlToPlainText(entry.note || '');

        // Update active state in list
        document.querySelectorAll('.entry-item').forEach(el => {
            el.classList.toggle('active', parseInt(el.dataset.index) === index);
        });
    }

    updateCurrentEntry() {
        if (this.currentEntryIndex === null) return;

        const entry = this.entries[this.currentEntryIndex];
        entry.note_title = this.noteTitleInput.value;
        entry.note = this.plainTextToHtml(this.noteInput.value);

        // Update preview in list
        this.renderEntries();
    }

    /**
     * Convert HTML note to plain text for editing
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
     * Convert plain text back to HTML for Daylio
     */
    plainTextToHtml(text) {
        if (!text) return '';

        // Escape HTML special characters
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Convert newlines to <br>
        html = html.replace(/\n/g, '<br>');

        return html;
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
