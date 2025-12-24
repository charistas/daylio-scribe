# Daylio Analysis

Tools for working with Daylio mood tracker backup files.

## Project Structure

```
daylio-analysis/
├── daylio-scribe/          # Web app for editing notes
│   ├── index.html          # Main app UI
│   ├── css/styles.css      # Dark theme styling
│   └── js/app.js           # Core application logic
├── backups/                # Your backup files (gitignored)
│   ├── extracted/          # Unpacked backup contents
│   │   ├── backup.daylio           # Base64-encoded JSON
│   │   ├── backup_decoded.json     # Decoded, editable JSON
│   │   └── assets/photos/          # Photo attachments
│   └── *.daylio            # Backup packages
├── DAYLIO_BACKUP_GUIDE.md  # How to unpack/repack backups
└── README.md               # This file
```

## Daylio Scribe

A local web app for editing Daylio journal notes with a human-friendly interface.

### Features

- Load `backup_decoded.json` via drag-and-drop
- Browse entries sorted by date with mood indicators
- Edit notes using normal text (Enter for newlines)
- Search and filter entries
- Export modified JSON for repackaging

### Architecture

Single-page app with no dependencies:

- **UI**: Entry list (left panel) + editor (right panel)
- **State**: `DaylioScribe` class manages loaded data and current selection
- **Auto-save**: Changes update the in-memory data immediately

### Conversion Logic

The core challenge is bidirectional HTML↔plaintext conversion:

**HTML → Plain Text** (`htmlToPlainText`):
- `<br>`, `</div>`, `</p>` → newlines
- `<li>` → bullet points
- Strip all other tags
- Decode entities (`&nbsp;`, `&amp;`, etc.)
- Collapse multiple newlines

**Plain Text → HTML** (`plainTextToHtml`):
- Escape special characters (`&`, `<`, `>`)
- Convert `\n` → `<br>`

### Mood Values

| Value | Label |
|-------|-------|
| 1 | great |
| 2 | good |
| 3 | meh |
| 4 | bad |
| 5 | awful |

## Workflow

1. Export backup from Daylio app
2. Unpack: `unzip backup.daylio -d extracted/`
3. Decode: `base64 -D -i extracted/backup.daylio -o extracted/backup_decoded.json`
4. Format: `jq '.' backup_decoded.json > temp.json && mv temp.json backup_decoded.json`
5. Edit using Daylio Scribe (open `daylio-scribe/index.html`)
6. Encode: `base64 -i backup_decoded.json -o backup.daylio`
7. Repack: `zip -r -0 ../modified.daylio backup.daylio assets/`
8. Import into Daylio app

See `DAYLIO_BACKUP_GUIDE.md` for detailed commands.

## JSON Structure

Key fields in `backup_decoded.json`:

| Field | Type | Description |
|-------|------|-------------|
| `dayEntries` | array | Journal entries |
| `dayEntries[].datetime` | number | Unix timestamp (ms) |
| `dayEntries[].year/month/day` | number | Date components |
| `dayEntries[].mood` | number | 1-5 mood value |
| `dayEntries[].note` | string | HTML-formatted note |
| `dayEntries[].note_title` | string | Optional title |
| `dayEntries[].tags` | array | Tag IDs |
| `dayEntries[].assets` | array | Photo references |
| `tags` | array | Tag definitions |
| `tag_groups` | array | Tag categories |
| `customMoods` | array | Mood level definitions |
