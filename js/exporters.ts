import { EMOJI_MAP } from './emojiMap.js';
import { escapeCsvField, htmlToPlainText } from './conversions.js';
import { getEntryTags, getMoodGroupId, getMoodLabel } from './daylioData.js';
import type { DayEntry, DaylioBackup, MoodInfo } from './types.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function buildJsonExport(data: DaylioBackup): string {
    return JSON.stringify(data, null, 2);
}

export function buildCsvExport(
    entries: DayEntry[],
    moods: Record<number, MoodInfo>,
    tags: Record<number, string>
): string {
    const headers = ['Date', 'Weekday', 'Time', 'Mood', 'Mood Score', 'Activities', 'Activity Count', 'Photos', 'Title', 'Note'];
    const rows: string[][] = [headers];
    const sortedEntries = [...entries].sort((a, b) => a.datetime - b.datetime);

    for (const entry of sortedEntries) {
        const date = `${entry.year}-${String(entry.month + 1).padStart(2, '0')}-${String(entry.day).padStart(2, '0')}`;
        const weekday = WEEKDAYS[new Date(entry.year, entry.month, entry.day).getDay()];
        const time = `${String(entry.hour).padStart(2, '0')}:${String(entry.minute).padStart(2, '0')}`;
        const mood = getMoodLabel(moods, entry.mood);
        const moodGroupId = getMoodGroupId(moods, entry.mood);
        const moodScore = String(6 - moodGroupId);
        const activityNames = getEntryTags(entry, tags);
        const activities = activityNames.join(' | ');
        const activityCount = String(activityNames.length);
        const photoCount = String(entry.assets?.length || 0);
        const title = entry.note_title || '';
        const note = htmlToPlainText(entry.note || '');

        rows.push([date, weekday, time, mood, moodScore, activities, activityCount, photoCount, title, note]);
    }

    return rows.map(row =>
        row.map(cell => escapeCsvField(cell)).join(',')
    ).join('\n');
}

export function buildMarkdownExport(
    entries: DayEntry[],
    moods: Record<number, MoodInfo>,
    tags: Record<number, string>
): string {
    const lines: string[] = [];
    lines.push('# Daylio Journal Export');
    lines.push('');

    const sortedEntries = [...entries].sort((a, b) => b.datetime - a.datetime);
    let currentYear = -1;
    let currentMonth = -1;

    for (const entry of sortedEntries) {
        if (entry.year !== currentYear) {
            currentYear = entry.year;
            currentMonth = -1;
            lines.push(`## ${currentYear}`);
            lines.push('');
        }

        if (entry.month !== currentMonth) {
            currentMonth = entry.month;
            lines.push(`### ${MONTHS[currentMonth]}`);
            lines.push('');
        }

        const date = new Date(entry.year, entry.month, entry.day);
        const weekday = WEEKDAYS[date.getDay()];
        const time = `${String(entry.hour).padStart(2, '0')}:${String(entry.minute).padStart(2, '0')}`;
        const mood = getMoodLabel(moods, entry.mood);

        lines.push(`#### ${MONTHS[entry.month]} ${entry.day}, ${weekday} at ${time}`);
        lines.push('');
        lines.push(`**Mood:** ${mood}`);

        const activities = getEntryTags(entry, tags);
        if (activities.length > 0) {
            lines.push(`**Activities:** ${activities.join(', ')}`);
        }

        const photoCount = entry.assets?.length || 0;
        if (photoCount > 0) {
            lines.push(`**Photos:** ${photoCount}`);
        }

        lines.push('');

        if (entry.note_title?.trim()) {
            lines.push(`**${entry.note_title.trim()}**`);
            lines.push('');
        }

        if (entry.note) {
            const plainText = htmlToPlainText(entry.note);
            if (plainText) {
                lines.push(plainText);
                lines.push('');
            }
        }

        lines.push('---');
        lines.push('');
    }

    return lines.join('\n');
}

export function emojisToText(text: string): string {
    type SegmenterLike = {
        segment(input: string): Iterable<{ segment: string }>;
    };
    const SegmenterCtor = typeof Intl !== 'undefined'
        ? (Intl as typeof Intl & {
            Segmenter?: new (locale: string, options: { granularity: 'grapheme' }) => SegmenterLike;
        }).Segmenter
        : undefined;

    const segmenter = SegmenterCtor
        ? new SegmenterCtor('en', { granularity: 'grapheme' })
        : null;

    const segments = segmenter
        ? Array.from(segmenter.segment(text), part => part.segment)
        : Array.from(text);

    let result = '';
    for (const segment of segments) {
        const name = EMOJI_MAP[segment] || EMOJI_MAP[segment.replace(/\uFE0F/g, '')];
        result += name || segment;
    }
    return result;
}

export function buildPdfDocDefinition(
    entries: DayEntry[],
    moods: Record<number, MoodInfo>,
    tags: Record<number, string>,
    exportedOn = new Date()
): Record<string, unknown> {
    const sortedEntries = [...entries].sort((a, b) => b.datetime - a.datetime);
    const content: unknown[] = [];

    content.push({ text: 'Daylio Journal', style: 'title' });
    content.push({ text: `Exported on ${exportedOn.toLocaleDateString()}`, style: 'subtitle', margin: [0, 0, 0, 15] });

    let currentYear = -1;
    let currentMonth = -1;

    for (const entry of sortedEntries) {
        if (entry.year !== currentYear) {
            currentYear = entry.year;
            currentMonth = -1;
            content.push({ text: String(currentYear), style: 'yearHeader', margin: [0, 10, 0, 5] });
        }

        if (entry.month !== currentMonth) {
            currentMonth = entry.month;
            content.push({ text: MONTHS[currentMonth], style: 'monthHeader', margin: [0, 5, 0, 5] });
        }

        const date = new Date(entry.year, entry.month, entry.day);
        const weekday = WEEKDAYS[date.getDay()];
        const time = `${String(entry.hour).padStart(2, '0')}:${String(entry.minute).padStart(2, '0')}`;
        const mood = emojisToText(getMoodLabel(moods, entry.mood));

        content.push({
            columns: [
                { text: `${MONTHS[entry.month]} ${entry.day}, ${weekday}`, style: 'entryDate', width: 'auto' },
                { text: `${time} - ${mood}`, style: 'entryMeta', width: '*', margin: [10, 0, 0, 0] }
            ],
            margin: [0, 3, 0, 2]
        });

        const activities = getEntryTags(entry, tags);
        if (activities.length > 0) {
            content.push({ text: emojisToText(activities.join(', ')), style: 'activities', margin: [0, 0, 0, 2] });
        }

        const photoCount = entry.assets?.length || 0;
        if (photoCount > 0) {
            content.push({ text: `Photos: ${photoCount}`, style: 'activities', margin: [0, 0, 0, 2] });
        }

        if (entry.note_title?.trim()) {
            content.push({ text: emojisToText(entry.note_title.trim()), style: 'noteTitle', margin: [0, 2, 0, 2] });
        }

        if (entry.note) {
            const plainText = htmlToPlainText(entry.note);
            if (plainText) {
                content.push({ text: emojisToText(plainText), style: 'noteContent', margin: [0, 0, 0, 3] });
            }
        }

        content.push({
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }],
            margin: [0, 5, 0, 5]
        });
    }

    return {
        content,
        styles: {
            title: { fontSize: 24, bold: true },
            subtitle: { fontSize: 10, color: '#666666' },
            yearHeader: { fontSize: 18, bold: true },
            monthHeader: { fontSize: 14, bold: true, color: '#505050' },
            entryDate: { fontSize: 11, bold: true },
            entryMeta: { fontSize: 11, color: '#666666' },
            activities: { fontSize: 9, color: '#505050' },
            noteTitle: { fontSize: 10, bold: true },
            noteContent: { fontSize: 9 }
        },
        defaultStyle: {
            font: 'Roboto'
        },
        pageMargins: [40, 40, 40, 40] as [number, number, number, number]
    };
}
