/**
 * Type definitions for Daylio Scribe
 */

// Daylio backup structure
export interface DaylioBackup {
    version?: number;
    dayEntries: DayEntry[];
    customMoods: CustomMood[];
    tags?: Tag[];
    tag_groups?: TagGroup[];
    assets?: Asset[];
    goals?: Goal[];
    prefs?: Record<string, unknown>;
    writing_templates?: WritingTemplate[];
    metadata?: Record<string, unknown>;
}

export interface DayEntry {
    id: number;
    datetime: number;
    mood: number;
    note: string;
    note_title: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    assets: number[];
    tags: number[];
    isFavorite?: boolean;
    createdAt?: number;
    timeZoneOffset?: number;
}

export interface CustomMood {
    id: number;
    custom_name: string;
    mood_group_id: number;
    predefined_name_id: number;
    icon_id?: number;
    createdAt?: number;
    state?: number;
}

export interface Tag {
    id: number;
    name: string;
    icon?: number;
    order?: number;
    state?: number;
    createdAt?: number;
    id_tag_group?: number;
}

export interface TagGroup {
    id: number;
    name: string;
    order?: number;
    state?: number;
    createdAt?: number;
    is_expanded?: boolean;
}

export interface Asset {
    id: number;
    checksum: string;
    createdAt: number;
    type?: number;
}

export interface Goal {
    id: number;
    name: string;
    state?: number;
    createdAt?: number;
}

export interface WritingTemplate {
    id: number;
    title: string;
    body: string;
    order?: number;
    state?: number;
    createdAt?: number;
}

// App-specific types
export interface MoodInfo {
    label: string;
    groupId: number;
}

export interface DateRange {
    from: number;
    to: number;
}

export interface VisibleRange {
    bufferedStart: number;
    bufferedEnd: number;
    totalItems: number;
}

// Toast notification types
export type ToastType = 'error' | 'success' | 'warning' | 'info';
