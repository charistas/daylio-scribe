import { describe, expect, it } from 'vitest';
import {
    buildCsvExport,
    buildJsonExport,
    buildMarkdownExport,
    buildPdfDocDefinition,
    emojisToText,
} from '../js/exporters.js';
import { buildMoodLabels, buildTagLabels } from '../js/daylioData.js';
import { makeDaylioBackupFixture } from './fixtures/daylioBackupFixture.js';

describe('export builders', () => {
    it('exports CSV with custom moods, activities, photos, Greek text, and emoji', () => {
        const backup = makeDaylioBackupFixture();
        const csv = buildCsvExport(
            backup.dayEntries,
            buildMoodLabels(backup.customMoods),
            buildTagLabels(backup.tags)
        );

        expect(csv.split('\n')[0]).toBe('Date,Weekday,Time,Mood,Mood Score,Activities,Activity Count,Photos,Title,Note');
        expect(csv).toContain('Χαρά 😄');
        expect(csv).toContain('Καφές ☕ | Περπάτημα 🚶');
        expect(csv).toContain('Τίτλος ✨');
        expect(csv).toContain('Καλημέρα κόσμε 😊');
        expect(csv).toContain(',2,1,Τίτλος ✨,');
    });

    it('exports JSON without stripping unsupported but harmless backup sections', () => {
        const backup = makeDaylioBackupFixture();
        const json = buildJsonExport(backup);
        const parsed = JSON.parse(json);

        expect(parsed.metadata).toEqual({ fixture: true });
        expect(parsed.tag_groups[0].name).toBe('Συνήθειες');
        expect(parsed.prefs.locale).toBe('el-GR');
        expect(parsed.dayEntries[0].assets).toEqual([401]);
    });

    it('exports Markdown with note text, custom mood labels, activities, and photo counts', () => {
        const backup = makeDaylioBackupFixture();
        const markdown = buildMarkdownExport(
            backup.dayEntries,
            buildMoodLabels(backup.customMoods),
            buildTagLabels(backup.tags)
        );

        expect(markdown).toContain('**Mood:** Χαρά 😄');
        expect(markdown).toContain('**Activities:** Καφές ☕, Περπάτημα 🚶');
        expect(markdown).toContain('**Photos:** 1');
        expect(markdown).toContain('**Τίτλος ✨**');
        expect(markdown).toContain('Καλημέρα κόσμε 😊');
        expect(markdown).toContain('• πρώτο');
    });

    it('builds PDF definitions with emoji converted to text aliases and photo counts retained', () => {
        const backup = makeDaylioBackupFixture();
        const docDefinition = buildPdfDocDefinition(
            backup.dayEntries,
            buildMoodLabels(backup.customMoods),
            buildTagLabels(backup.tags),
            new Date(2024, 6, 6)
        );
        const serialized = JSON.stringify(docDefinition);

        expect(serialized).toContain('Χαρά :smile:');
        expect(serialized).toContain('Καφές :coffee:, Περπάτημα');
        expect(serialized).toContain('Photos: 1');
        expect(serialized).toContain('Τίτλος :sparkles:');
        expect(emojisToText('🚀✅')).toBe(':rocket::white_check_mark:');
    });
});
