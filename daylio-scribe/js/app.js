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
        this.saveBtn.addEventListener('click', () => this.saveJSON());

        // Editor - auto-save on change
        this.noteTitleInput.addEventListener('input', () => this.updateCurrentEntry());
        this.noteInput.addEventListener('input', () => this.updateCurrentEntry());
    }

    handleFile(file) {
        if (!file || !file.name.endsWith('.json')) {
            alert('Please select a valid JSON file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.data = JSON.parse(e.target.result);
                this.entries = this.data.dayEntries || [];
                this.showApp();
            } catch (err) {
                alert('Error parsing JSON: ' + err.message);
            }
        };
        reader.readAsText(file);
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

    saveJSON() {
        if (!this.data) return;

        // Update the entries in data
        this.data.dayEntries = this.entries;

        // Create and download file
        const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'backup_decoded.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new DaylioScribe();
});
