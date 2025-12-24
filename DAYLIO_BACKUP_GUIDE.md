# Daylio Backup Guide

## Backup File Structure

A `.daylio` file is a ZIP archive containing:

```
backup.daylio          # Base64-encoded JSON with all your data
assets/photos/         # Photo attachments organized by year/month
```

## Unpacking

```bash
# 1. Extract the ZIP
unzip your_backup.daylio -d extracted/

# 2. Decode the base64 JSON
base64 -D -i extracted/backup.daylio -o extracted/backup_decoded.json

# 3. Pretty-print for readability (optional but recommended)
jq '.' extracted/backup_decoded.json > temp.json && mv temp.json extracted/backup_decoded.json
```

## JSON Structure

Key fields in `backup_decoded.json`:

| Field | Description |
|-------|-------------|
| `dayEntries` | Array of journal entries (mood, notes, tags, date) |
| `tags` | Activity/tag definitions |
| `tag_groups` | Categories that group tags |
| `customMoods` | Your mood level definitions |
| `goals` | Goal definitions |
| `goalEntries` | Goal completion records |
| `reminders` | Notification settings |
| `prefs` | App preferences |
| `assets` | References to photo attachments |
| `version` | Backup format version |

## Editing Rules

**IMPORTANT**: When editing string values (like notes):
- Do NOT press Enter for newlines inside strings
- Type the literal characters `\n` instead
- JSON strings cannot contain actual newline characters

**Validate before packing**:
```bash
jq empty extracted/backup_decoded.json && echo "Valid JSON"
```

## Repacking

```bash
# 1. Encode JSON back to base64
base64 -i extracted/backup_decoded.json -o extracted/backup.daylio

# 2. Create the ZIP package (use -0 for no compression, matching original)
cd extracted/
zip -r -0 ../new_backup.daylio backup.daylio assets/
```

## Quick Reference Commands

```bash
# Validate JSON
jq empty backup_decoded.json

# Count entries
jq '.dayEntries | length' backup_decoded.json

# View structure
jq 'keys' backup_decoded.json

# Compact JSON (remove pretty-printing, optional)
jq -c '.' backup_decoded.json > compact.json
```
