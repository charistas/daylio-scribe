import type { DaylioBackup } from './types.js';

export interface DaylioArchiveContents {
    data: DaylioBackup;
    preservedFiles: Record<string, Uint8Array>;
    assets: Record<string, Uint8Array>;
}

export interface DaylioArchiveOptions {
    type?: string;
    compression?: string;
}

export function base64DecodeUtf8(base64: string): string {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
}

export function base64EncodeUtf8(str: string): string {
    const bytes = new TextEncoder().encode(str);
    let binaryString = '';
    for (let i = 0; i < bytes.length; i++) {
        binaryString += String.fromCharCode(bytes[i]);
    }
    return btoa(binaryString);
}

export function decodeDaylioBackupContent(base64Content: string): DaylioBackup {
    return JSON.parse(base64DecodeUtf8(base64Content.trim())) as DaylioBackup;
}

export function encodeDaylioBackupContent(data: DaylioBackup): string {
    return base64EncodeUtf8(JSON.stringify(data));
}

export async function readDaylioArchive(JSZipCtor: any, input: unknown): Promise<DaylioArchiveContents> {
    const zip = await JSZipCtor.loadAsync(input);
    const backupFile = zip.file('backup.daylio');
    if (!backupFile) {
        throw new Error('backup.daylio not found in the archive');
    }

    const base64Content = await backupFile.async('string');
    const preservedFiles: Record<string, Uint8Array> = {};
    const assets: Record<string, Uint8Array> = {};

    const fileNames = Object.keys(zip.files);
    for (const name of fileNames) {
        const entry = zip.files[name];
        if (entry.dir || name === 'backup.daylio') continue;

        const bytes = await entry.async('uint8array');
        preservedFiles[name] = bytes;
        if (name.startsWith('assets/')) {
            assets[name] = bytes;
        }
    }

    return {
        data: decodeDaylioBackupContent(base64Content),
        preservedFiles,
        assets
    };
}

export async function createDaylioArchive(
    JSZipCtor: any,
    data: DaylioBackup,
    preservedFiles: Record<string, Uint8Array> = {},
    options: DaylioArchiveOptions = {}
): Promise<unknown> {
    const zip = new JSZipCtor();
    zip.file('backup.daylio', encodeDaylioBackupContent(data));

    for (const [path, content] of Object.entries(preservedFiles)) {
        if (path === 'backup.daylio') continue;
        zip.file(path, content);
    }

    return zip.generateAsync({
        type: options.type || 'blob',
        compression: options.compression || 'STORE'
    });
}
