# Daylio Analysis

Tools for working with Daylio mood tracker backup files.

## Project Structure

```
daylio-analysis/
├── daylio-scribe/          # Web app for editing notes
│   ├── index.html          # Main app UI
│   ├── css/styles.css      # Dark theme styling
│   ├── js/app.js           # Core application logic
│   └── vendor/             # Bundled libraries (offline support)
├── scripts/                # Build/update scripts
│   └── update-vendor.js    # Copies libs from node_modules to vendor
├── backups/                # Your backup files (gitignored)
├── package.json            # Dependencies for Dependabot
├── DAYLIO_BACKUP_GUIDE.md  # How to unpack/repack backups
└── README.md               # This file
```

## Daylio Scribe

A local web app for editing Daylio journal notes with a human-friendly interface.

### Features

- Load `.daylio` backup files directly via drag-and-drop
- Automatic extraction, decoding, and repackaging (no manual steps)
- Browse entries sorted by date with mood indicators
- Edit notes using normal text (Enter for newlines)
- Search and filter entries
- Download ready-to-import `.daylio` backup with one click
- Full UTF-8 support (Greek, emoji, etc.)
- Preserves all photo assets

### Architecture

Single-page app with bundled dependencies (works offline):

**Libraries:**
- JSZip (3.10.1) - ZIP file handling
- Quill (2.0.3) - WYSIWYG editor
- emoji-picker-element (1.21.0) - Emoji picker

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

### Mood Support

The app reads mood definitions from your backup's `customMoods` array:
- Uses your custom mood labels if set
- Falls back to Daylio defaults (`great`, `good`, `meh`, `bad`, `awful`)
- Supports any number of mood levels
- Colors are based on mood groups (1-5) for consistency

## Workflow

### Using Daylio Scribe (Recommended)

1. Export backup from Daylio app
2. Open `daylio-scribe/index.html` in a browser
3. Drag and drop your `.daylio` file
4. Edit your notes
5. Click "Download Backup"
6. Import the downloaded file into Daylio

### Manual CLI Workflow

For advanced users or scripting, see `DAYLIO_BACKUP_GUIDE.md` for manual unpack/repack commands.

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

## Updating Dependencies

Libraries are bundled locally in `daylio-scribe/vendor/` for offline use and security. To check for updates:

```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Copy updated files to vendor folder
npm run update-vendor
```

GitHub Dependabot will automatically create PRs for security updates.
