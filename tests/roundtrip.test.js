import { describe, expect, it } from 'vitest';
import JSZip from 'jszip';
import {
    createDaylioArchive,
    decodeDaylioBackupContent,
    encodeDaylioBackupContent,
    readDaylioArchive,
} from '../js/daylioArchive.js';
import {
    PHOTO_BYTES,
    PHOTO_PATH,
    UNKNOWN_BYTES,
    UNKNOWN_PATH,
    makeDaylioBackupFixture,
} from './fixtures/daylioBackupFixture.js';

describe('Daylio archive round-trip integrity', () => {
    it('encodes and decodes Greek text, emoji, rich text, custom moods, activities, and attachments metadata', () => {
        const backup = makeDaylioBackupFixture();

        const encoded = encodeDaylioBackupContent(backup);
        const decoded = decodeDaylioBackupContent(encoded);

        expect(decoded).toEqual(backup);
        expect(decoded.dayEntries[0].note).toContain('Καλημέρα');
        expect(decoded.dayEntries[0].note).toContain('😊');
        expect(decoded.dayEntries[0].note).toContain('<u>υπογράμμιση</u>');
        expect(decoded.customMoods[0].custom_name).toBe('Χαρά 😄');
        expect(decoded.tags.map(tag => tag.name)).toEqual(['Καφές ☕', 'Περπάτημα 🚶']);
        expect(decoded.assets[0].checksum).toBe('photo-checksum.jpg');
    });

    it('reads and rebuilds a download-ready .daylio archive without dropping attachments or unknown files', async () => {
        const backup = makeDaylioBackupFixture();
        const sourceZip = new JSZip();
        sourceZip.file('backup.daylio', encodeDaylioBackupContent(backup));
        sourceZip.file(PHOTO_PATH, PHOTO_BYTES);
        sourceZip.file(UNKNOWN_PATH, UNKNOWN_BYTES);

        const sourceArchive = await sourceZip.generateAsync({
            type: 'uint8array',
            compression: 'STORE'
        });

        const parsed = await readDaylioArchive(JSZip, sourceArchive);
        expect(parsed.data).toEqual(backup);
        expect(Array.from(parsed.assets[PHOTO_PATH])).toEqual(Array.from(PHOTO_BYTES));
        expect(Array.from(parsed.preservedFiles[UNKNOWN_PATH])).toEqual(Array.from(UNKNOWN_BYTES));

        parsed.data.dayEntries[0].note_title = 'Επεξεργασμένος τίτλος ✅';
        parsed.data.dayEntries[0].note += '<div>Νέα γραμμή 📝</div>';

        const rebuiltArchive = await createDaylioArchive(JSZip, parsed.data, parsed.preservedFiles, {
            type: 'uint8array',
            compression: 'STORE'
        });

        const rebuiltZip = await JSZip.loadAsync(rebuiltArchive);
        const rebuiltBackupFile = rebuiltZip.file('backup.daylio');
        expect(rebuiltBackupFile).toBeTruthy();

        const rebuiltBackup = decodeDaylioBackupContent(await rebuiltBackupFile.async('string'));
        expect(rebuiltBackup.dayEntries[0].note_title).toBe('Επεξεργασμένος τίτλος ✅');
        expect(rebuiltBackup.dayEntries[0].note).toContain('Νέα γραμμή 📝');
        expect(rebuiltBackup.dayEntries[1]).toEqual(backup.dayEntries[1]);

        const rebuiltPhoto = await rebuiltZip.file(PHOTO_PATH).async('uint8array');
        const rebuiltUnknown = await rebuiltZip.file(UNKNOWN_PATH).async('uint8array');
        expect(Array.from(rebuiltPhoto)).toEqual(Array.from(PHOTO_BYTES));
        expect(Array.from(rebuiltUnknown)).toEqual(Array.from(UNKNOWN_BYTES));
    });

    it('rejects archives that do not contain backup.daylio', async () => {
        const zip = new JSZip();
        zip.file(PHOTO_PATH, PHOTO_BYTES);
        const archive = await zip.generateAsync({ type: 'uint8array' });

        await expect(readDaylioArchive(JSZip, archive)).rejects.toThrow('backup.daylio not found');
    });
});
