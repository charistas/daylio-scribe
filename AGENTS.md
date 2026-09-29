# Repository Guidance

## Build and Development Commands

On this laptop, use `socket npm` / `socket npx` for registry installs, updates, resolution, and package execution. Plain `npm run` (and `npm test`) may run checked-in local scripts; nested registry operations must still use Socket. If Socket is unavailable or blocks an operation, report the blocker rather than bypassing it. On other hosts, follow their approved package security workflow.


```bash
npm run build           # Bundle TypeScript to dist/app.js (IIFE format)
npm run build:watch     # Build with file watching
npm test                # Run tests in watch mode
npm run test:run        # Run tests once (used in CI)
npm run update-vendor   # Update bundled vendor libraries
```

## Architecture

Daylio Scribe is a client-side web app for editing Daylio journal backup files. It runs entirely in the browser with no server required.

### Core Structure

- **`js/app.ts`** - Main application class (`DaylioScribe`). Single-file architecture handling:
  - Backup loading via drag-and-drop (`.daylio` files are ZIP archives containing JSON)
  - Quill rich text editor integration
  - Virtual scrolling for entry list (optimized for 1000+ entries)
  - Mini calendar, filters, search with highlighting
  - Photo gallery with lightbox viewer
  - Insights dashboard with charts and statistics
  - Theme toggle (dark/light mode)

- **`js/types.ts`** - TypeScript interfaces for Daylio backup structure (`DaylioBackup`, `DayEntry`, `CustomMood`, `Tag`, `Asset`, etc.)

- **`js/conversions.ts`** - HTML conversion utilities (extracted for testability):
  - `daylioToQuillHtml()` / `quillToDaylioHtml()` - Bidirectional HTML conversion between Daylio and Quill formats
  - `htmlToPlainText()` - Strip HTML for previews/search
  - `highlightText()`, `escapeCsvField()`, `escapeHtml()`

### Build Output

- `dist/app.js` - Bundled application (esbuild, IIFE format)
- `index.html` loads vendor libs via script tags, then the bundled app

### Vendor Libraries (bundled in `/vendor`)

- Quill (rich text editor)
- JSZip (backup file handling)
- html2canvas (insights export)
- emoji-picker-element
- jsPDF (PDF export)

## Testing

Tests use Vitest with jsdom environment. Test files are in `/tests`:
- `conversions.test.js` - HTML conversion function tests
- `utils.test.js` - Utility function tests

Run a specific test file:
```bash
socket npx vitest run tests/conversions.test.js
```

## Daylio Backup Format

`.daylio` files are ZIP archives containing:
- `backup.daylio` - **Base64-encoded** JSON (decode with `atob()` + `TextDecoder`)
- `assets/photos/{year}/{month}/{checksum}` - Photo attachments

Key data structures:
- `dayEntries[]` - Journal entries with `datetime`, `mood`, `note`, `note_title`, `tags[]`, `assets[]`
- `customMoods[]` - User-defined mood levels with `mood_group_id` (1-5 scale)
- `tags[]` - Activities/tags that can be attached to entries

The app validates backup version against `SUPPORTED_VERSION` (currently 19) and warns users about newer formats.

## Code Notes

- **Duplicated conversion functions**: The HTML conversion functions in `conversions.ts` are duplicated as private methods in `DaylioScribe` class (lines ~2120-2265). The standalone versions in `conversions.ts` exist for unit testing.

- **Virtual scrolling**: Uses fixed 73px item height with 5-item buffer above/below viewport. Scroll events are throttled via `requestAnimationFrame`.

- **Quill integration**: Uses `clipboard.convert()` for HTML→Delta, `setContents(delta, 'silent')` to avoid triggering change events when loading entries.
