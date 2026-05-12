export const PHOTO_PATH = 'assets/photos/2024/7/photo-checksum.jpg';
export const PHOTO_BYTES = new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    0x00, 0x00, 0x00, 0x0d
]);
export const UNKNOWN_PATH = 'metadata/original-file.txt';
export const UNKNOWN_BYTES = new Uint8Array([
    0x70, 0x72, 0x65, 0x73, 0x65, 0x72, 0x76, 0x65, 0x20, 0x6d, 0x65
]);

export function makeDaylioBackupFixture() {
    return {
        version: 19,
        customMoods: [
            {
                id: 101,
                custom_name: 'Χαρά 😄',
                mood_group_id: 1,
                predefined_name_id: 1,
                icon_id: 7,
                createdAt: 1720171800000,
                state: 0
            },
            {
                id: 102,
                custom_name: '',
                mood_group_id: 3,
                predefined_name_id: 3,
                icon_id: 12,
                createdAt: 1720258200000,
                state: 0
            }
        ],
        tags: [
            {
                id: 201,
                name: 'Καφές ☕',
                icon: 1,
                order: 1,
                state: 0,
                createdAt: 1720171800000,
                id_tag_group: 301
            },
            {
                id: 202,
                name: 'Περπάτημα 🚶',
                icon: 2,
                order: 2,
                state: 0,
                createdAt: 1720171800000,
                id_tag_group: 301
            }
        ],
        tag_groups: [
            {
                id: 301,
                name: 'Συνήθειες',
                order: 1,
                state: 0,
                createdAt: 1720171800000,
                is_expanded: true
            }
        ],
        assets: [
            {
                id: 401,
                checksum: 'photo-checksum.jpg',
                createdAt: 1720171800000,
                type: 1
            }
        ],
        dayEntries: [
            {
                id: 1,
                datetime: 1720171800000,
                mood: 101,
                note: '<div>Καλημέρα <b>κόσμε</b> 😊</div><div><i>πλάγια</i> και <u>υπογράμμιση</u></div><ul><li>πρώτο</li><li>δεύτερο 🚀</li></ul>',
                note_title: 'Τίτλος ✨',
                year: 2024,
                month: 6,
                day: 5,
                hour: 12,
                minute: 30,
                assets: [401],
                tags: [201, 202],
                isFavorite: true,
                createdAt: 1720171800000,
                timeZoneOffset: 180
            },
            {
                id: 2,
                datetime: 1704063600000,
                mood: 102,
                note: '',
                note_title: '',
                year: 2024,
                month: 0,
                day: 1,
                hour: 1,
                minute: 0,
                assets: [],
                tags: [],
                isFavorite: false,
                createdAt: 1704063600000,
                timeZoneOffset: 120
            }
        ],
        goals: [],
        prefs: {
            locale: 'el-GR'
        },
        writing_templates: [],
        metadata: {
            fixture: true
        }
    };
}
