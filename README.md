# Daylio Scribe

[![Tests](https://github.com/charistas/daylio-scribe/actions/workflows/test.yml/badge.svg)](https://github.com/charistas/daylio-scribe/actions/workflows/test.yml)

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
- Mini calendar for quick date navigation
- Date range filter (presets + custom range)
- Download ready-to-import `.daylio` backup with one click
- Export to CSV, JSON, Markdown, or PDF
- Full UTF-8 support (Greek, emoji, etc.)
- Works offline (all dependencies bundled locally)
- View photo attachments with thumbnail gallery and fullscreen lightbox
- Dark/light theme toggle (respects system preference)
- Activities display for each entry
- Insights dashboard with mood trends, streaks, year-in-pixels, and export to PNG
- Full keyboard navigation and screen reader support

## How to Use

1. Export a backup from the Daylio app
2. Open `index.html` in your browser (or visit the [live app](https://charistas.github.io/daylio-scribe/))
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

## Round-Trip Scope

Daylio Scribe preserves the original local-first workflow: `.daylio` files are decoded, edited, and repackaged in the browser without uploading data. The repackaged backup keeps `backup.daylio`, photo assets, and unknown non-directory files from the source archive so edited backups remain download-ready for import.

Covered by local tests:
- UTF-8 backup encoding for Greek text and emoji
- Rich note HTML conversion for bold, italic, underline, strikethrough, bullet lists, and ordered lists
- Custom mood labels and fallback mood labels
- Activities/tags with Greek names and emoji
- Photo attachment bytes and unknown archive files during `.daylio` repackaging
- Date filters, note-only filters, and Greek search terms
- CSV, JSON, Markdown, and PDF export builders

Known unsupported Daylio edge cases:
- Backup versions newer than the tested format version (v19) are allowed only after an explicit warning; structural changes in newer Daylio backups may still be unsupported.
- Editing is limited to note title and note body. Other Daylio data such as moods, activities, goals, templates, and attachment metadata is preserved but not editable.
- Attachments are preserved and previewed when the referenced asset file is present. Missing or renamed asset files are reported in the UI but cannot be repaired automatically.
- Embedded media types other than image assets may be preserved in the archive but are not previewed or edited.
- Daylio-specific rich text features outside the supported HTML subset may be preserved as raw HTML or normalized by the editor.

## License

Copyright (c) 2025 charistas. All rights reserved.

This source code is provided for viewing and educational purposes only. No permission is granted to copy, modify, distribute, or use this code in any project without explicit written permission from the author.
