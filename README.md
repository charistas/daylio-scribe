# Daylio Scribe

A local web app for editing Daylio journal notes with a human-friendly interface.

## Features

- Load `.daylio` backup files directly via drag-and-drop
- Automatic extraction, decoding, and repackaging (no manual steps)
- Browse entries sorted by date with mood indicators
- Rich text editing with formatting support:
  - **Bold**, *Italic*, ~~Strikethrough~~, Underline
  - Bullet and numbered lists
  - Emoji picker
- Resizable note editor
- Search and filter entries
- Download ready-to-import `.daylio` backup with one click
- Full UTF-8 support (Greek, emoji, etc.)
- Works offline (all dependencies bundled locally)
- Preserves all photo assets

## How to Use

1. Export a backup from the Daylio app
2. Open `daylio-scribe/index.html` in your browser
3. Drag and drop your `.daylio` file onto the page
4. Browse and edit your notes
5. Click "Download Backup"
6. Import the downloaded file back into Daylio

## Mood Support

The app reads mood definitions from your backup:
- Displays your custom mood labels if set
- Falls back to Daylio defaults (great, good, meh, bad, awful)
- Supports any number of mood levels
- Color-coded mood badges for quick reference

