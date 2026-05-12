import { describe, expect, it } from 'vitest';
import { htmlToPlainText } from '../js/conversions.js';
import {
    buildMoodLabels,
    buildTagLabels,
    entryHasNote,
    filterEntries,
    getDateRange,
    getEntryTags,
    getMoodGroupId,
    getMoodLabel,
} from '../js/daylioData.js';
import { makeDaylioBackupFixture } from './fixtures/daylioBackupFixture.js';

describe('Daylio data helpers', () => {
    it('resolves custom moods and fallback Daylio mood labels', () => {
        const backup = makeDaylioBackupFixture();
        const moods = buildMoodLabels(backup.customMoods);

        expect(getMoodLabel(moods, 101)).toBe('Χαρά 😄');
        expect(getMoodGroupId(moods, 101)).toBe(1);
        expect(getMoodLabel(moods, 102)).toBe('meh');
        expect(getMoodGroupId(moods, 102)).toBe(3);
        expect(getMoodLabel(moods, 999)).toBe('mood 999');
    });

    it('resolves activities without losing Greek names or emoji', () => {
        const backup = makeDaylioBackupFixture();
        const tags = buildTagLabels(backup.tags);

        expect(getEntryTags(backup.dayEntries[0], tags)).toEqual(['Καφές ☕', 'Περπάτημα 🚶']);
        expect(getEntryTags(backup.dayEntries[1], tags)).toEqual([]);
    });

    it('detects note-bearing entries from rich text and titles', () => {
        const backup = makeDaylioBackupFixture();

        expect(entryHasNote(backup.dayEntries[0], htmlToPlainText)).toBe(true);
        expect(entryHasNote(backup.dayEntries[1], htmlToPlainText)).toBe(false);

        const titleOnly = { ...backup.dayEntries[1], note_title: 'Μόνο τίτλος' };
        expect(entryHasNote(titleOnly, htmlToPlainText)).toBe(true);
    });

    it('filters entries by Greek search terms, note-only state, and inclusive custom dates', () => {
        const backup = makeDaylioBackupFixture();
        const dateRange = getDateRange('custom', new Date(2024, 6, 20, 12), '2024-07-05', '2024-07-05');

        const filtered = filterEntries(backup.dayEntries, {
            notesOnly: true,
            dateRange,
            searchTerm: 'κόσμε',
            textExtractor: htmlToPlainText
        });

        expect(filtered.map(entry => entry.id)).toEqual([1]);
    });

    it('keeps preset date filters concrete and inclusive', () => {
        const now = new Date(2024, 6, 20, 12, 0, 0, 0);

        expect(getDateRange('thisMonth', now)).toEqual({
            from: new Date(2024, 6, 1).getTime(),
            to: new Date(2024, 7, 0, 23, 59, 59, 999).getTime()
        });

        expect(getDateRange('lastYear', now)).toEqual({
            from: new Date(2023, 0, 1).getTime(),
            to: new Date(2023, 11, 31, 23, 59, 59, 999).getTime()
        });

        const inverted = getDateRange('custom', now, '2024-07-10', '2024-07-05');
        expect(filterEntries(makeDaylioBackupFixture().dayEntries, {
            dateRange: inverted,
            textExtractor: htmlToPlainText
        })).toEqual([]);
    });
});
