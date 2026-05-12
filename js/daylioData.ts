import type { CustomMood, DateRange, DayEntry, MoodInfo, Tag } from './types.js';

export const SUPPORTED_VERSION = 19;

export const DEFAULT_MOOD_LABELS: Record<number, string> = {
    1: 'great',
    2: 'good',
    3: 'meh',
    4: 'bad',
    5: 'awful'
};

export interface EntryFilterOptions {
    notesOnly?: boolean;
    dateRange?: DateRange | null;
    searchTerm?: string;
    textExtractor?: (html: string) => string;
}

export function buildMoodLabels(
    customMoods: CustomMood[] = [],
    defaultMoodLabels: Record<number, string> = DEFAULT_MOOD_LABELS
): Record<number, MoodInfo> {
    const moods: Record<number, MoodInfo> = {};

    for (const mood of customMoods) {
        let label = mood.custom_name?.trim();
        if (!label) {
            label = defaultMoodLabels[mood.predefined_name_id] || `mood ${mood.id}`;
        }

        moods[mood.id] = {
            label,
            groupId: mood.mood_group_id
        };
    }

    return moods;
}

export function buildTagLabels(tags: Tag[] = []): Record<number, string> {
    const labels: Record<number, string> = {};
    for (const tag of tags) {
        labels[tag.id] = tag.name;
    }
    return labels;
}

export function getMoodLabel(moods: Record<number, MoodInfo>, moodId: number): string {
    return moods[moodId]?.label || `mood ${moodId}`;
}

export function getMoodGroupId(moods: Record<number, MoodInfo>, moodId: number): number {
    return moods[moodId]?.groupId || moodId;
}

export function getTagName(tags: Record<number, string>, tagId: number): string {
    return tags[tagId] || `activity ${tagId}`;
}

export function getEntryTags(entry: DayEntry, tags: Record<number, string>): string[] {
    if (!entry.tags || entry.tags.length === 0) return [];
    return entry.tags.map(tagId => getTagName(tags, tagId));
}

export function entryHasNote(entry: DayEntry, textExtractor: (html: string) => string): boolean {
    if (entry.note_title?.trim()) return true;
    return Boolean(textExtractor(entry.note || '').trim());
}

export function getDateRange(
    selection: string,
    now = new Date(),
    fromVal = '',
    toVal = ''
): DateRange | null {
    let from: Date;
    let to: Date;

    switch (selection) {
        case 'all':
            return null;

        case 'thisMonth':
            from = new Date(now.getFullYear(), now.getMonth(), 1);
            to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            break;

        case 'last30':
            from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            to = now;
            break;

        case 'last3Months':
            from = new Date(now.getFullYear(), now.getMonth() - 2, 1);
            to = now;
            break;

        case 'thisYear':
            from = new Date(now.getFullYear(), 0, 1);
            to = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
            break;

        case 'lastYear':
            from = new Date(now.getFullYear() - 1, 0, 1);
            to = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
            break;

        case 'custom':
            if (!fromVal && !toVal) return null;
            from = fromVal ? new Date(`${fromVal}T00:00:00`) : new Date(0);
            to = toVal ? new Date(`${toVal}T23:59:59.999`) : now;
            break;

        default:
            return null;
    }

    return { from: from.getTime(), to: to.getTime() };
}

export function filterEntries(entries: DayEntry[], options: EntryFilterOptions = {}): DayEntry[] {
    const textExtractor = options.textExtractor || ((html: string) => html.replace(/<[^>]+>/g, ''));
    const searchTerm = options.searchTerm?.toLowerCase().trim() || '';

    return entries.filter(entry => {
        if (options.notesOnly && !entryHasNote(entry, textExtractor)) {
            return false;
        }

        if (options.dateRange) {
            const entryDate = entry.datetime;
            if (entryDate < options.dateRange.from || entryDate > options.dateRange.to) {
                return false;
            }
        }

        if (searchTerm) {
            const noteText = textExtractor(entry.note || '').toLowerCase();
            const titleText = (entry.note_title || '').toLowerCase();
            if (!noteText.includes(searchTerm) && !titleText.includes(searchTerm)) {
                return false;
            }
        }

        return true;
    });
}
