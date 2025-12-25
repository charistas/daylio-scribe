import { describe, it, expect } from 'vitest';
import {
    escapeHtml,
    highlightText,
    escapeCsvField,
} from '../js/conversions.js';

describe('escapeHtml', () => {
    describe('input validation', () => {
        it('returns empty string for null', () => {
            expect(escapeHtml(null)).toBe('');
        });

        it('returns empty string for undefined', () => {
            expect(escapeHtml(undefined)).toBe('');
        });

        it('returns empty string for empty string', () => {
            expect(escapeHtml('')).toBe('');
        });
    });

    describe('special character escaping', () => {
        it('escapes < character', () => {
            expect(escapeHtml('<')).toBe('&lt;');
        });

        it('escapes > character', () => {
            expect(escapeHtml('>')).toBe('&gt;');
        });

        it('escapes & character', () => {
            expect(escapeHtml('&')).toBe('&amp;');
        });

        it('preserves " character (safe in text content)', () => {
            // Note: textContent doesn't escape quotes - they're only dangerous in attributes
            expect(escapeHtml('"')).toBe('"');
        });

        it('escapes multiple special characters', () => {
            const result = escapeHtml('<script>alert("xss")</script>');
            expect(result).not.toContain('<script>');
            expect(result).toContain('&lt;script&gt;');
        });
    });

    describe('safe content', () => {
        it('preserves plain text', () => {
            expect(escapeHtml('Hello World')).toBe('Hello World');
        });

        it('preserves numbers', () => {
            expect(escapeHtml('12345')).toBe('12345');
        });

        it('preserves unicode characters', () => {
            expect(escapeHtml('Hello 世界 🌍')).toBe('Hello 世界 🌍');
        });
    });
});

describe('highlightText', () => {
    describe('input validation', () => {
        it('returns escaped text for null search term', () => {
            expect(highlightText('hello', null)).toBe('hello');
        });

        it('returns escaped text for empty search term', () => {
            expect(highlightText('hello', '')).toBe('hello');
        });

        it('returns empty string for null text', () => {
            expect(highlightText(null, 'term')).toBe('');
        });

        it('returns empty string for empty text', () => {
            expect(highlightText('', 'term')).toBe('');
        });
    });

    describe('highlighting', () => {
        it('wraps match in mark tags', () => {
            expect(highlightText('hello world', 'world')).toBe('hello <mark>world</mark>');
        });

        it('is case insensitive', () => {
            expect(highlightText('Hello World', 'WORLD')).toBe('Hello <mark>World</mark>');
        });

        it('highlights multiple matches', () => {
            const result = highlightText('foo bar foo', 'foo');
            expect(result).toBe('<mark>foo</mark> bar <mark>foo</mark>');
        });

        it('handles no match gracefully', () => {
            expect(highlightText('hello', 'xyz')).toBe('hello');
        });
    });

    describe('regex special characters', () => {
        it('handles dots in search term', () => {
            expect(highlightText('file.txt', '.')).toContain('<mark>.</mark>');
        });

        it('handles asterisks in search term', () => {
            expect(highlightText('a*b', '*')).toContain('<mark>*</mark>');
        });

        it('handles parentheses in search term', () => {
            expect(highlightText('(test)', '(test)')).toBe('<mark>(test)</mark>');
        });

        it('handles brackets in search term', () => {
            expect(highlightText('[item]', '[item]')).toBe('<mark>[item]</mark>');
        });
    });

    describe('XSS prevention', () => {
        it('escapes HTML in text before highlighting', () => {
            const result = highlightText('<script>alert("xss")</script>', 'script');
            expect(result).not.toContain('<script>');
            expect(result).toContain('&lt;');
        });

        it('escapes HTML in search term', () => {
            const result = highlightText('test <b>bold</b> test', '<b>');
            expect(result).toContain('&lt;b&gt;');
        });
    });
});

describe('escapeCsvField', () => {
    describe('input validation', () => {
        it('returns empty string for null', () => {
            expect(escapeCsvField(null)).toBe('');
        });

        it('returns empty string for undefined', () => {
            expect(escapeCsvField(undefined)).toBe('');
        });

        it('returns empty string for empty string', () => {
            expect(escapeCsvField('')).toBe('');
        });
    });

    describe('simple values', () => {
        it('returns plain text unchanged', () => {
            expect(escapeCsvField('hello')).toBe('hello');
        });

        it('converts numbers to strings', () => {
            expect(escapeCsvField(123)).toBe('123');
        });

        it('converts booleans to strings', () => {
            expect(escapeCsvField(true)).toBe('true');
        });
    });

    describe('special characters', () => {
        it('wraps fields with commas in quotes', () => {
            expect(escapeCsvField('a,b')).toBe('"a,b"');
        });

        it('wraps fields with newlines in quotes', () => {
            expect(escapeCsvField('a\nb')).toBe('"a\nb"');
        });

        it('wraps fields with carriage returns in quotes', () => {
            expect(escapeCsvField('a\rb')).toBe('"a\rb"');
        });

        it('escapes double quotes by doubling them', () => {
            expect(escapeCsvField('say "hello"')).toBe('"say ""hello"""');
        });

        it('handles mixed special characters', () => {
            expect(escapeCsvField('a,b\n"c"')).toBe('"a,b\n""c"""');
        });
    });

    describe('edge cases', () => {
        it('handles field starting with quote', () => {
            expect(escapeCsvField('"start')).toBe('"""start"');
        });

        it('handles field ending with quote', () => {
            expect(escapeCsvField('end"')).toBe('"end"""');
        });

        it('handles only quotes', () => {
            // Input: """ (3 quotes) -> wrap in quotes + double each = """""" (8 chars)
            expect(escapeCsvField('"""')).toBe('""""""""');
        });

        it('preserves unicode characters', () => {
            expect(escapeCsvField('日本語')).toBe('日本語');
        });

        it('handles unicode with comma', () => {
            expect(escapeCsvField('日本語,テスト')).toBe('"日本語,テスト"');
        });
    });
});
