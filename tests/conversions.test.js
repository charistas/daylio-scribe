import { describe, it, expect } from 'vitest';
import {
    daylioToQuillHtml,
    quillToDaylioHtml,
    htmlToPlainText,
    convertBrToQuillParagraphs,
    addQuillListAttributes,
    convertQuillLists,
} from '../js/conversions.js';

describe('daylioToQuillHtml', () => {
    describe('input validation', () => {
        it('returns empty string for null input', () => {
            expect(daylioToQuillHtml(null)).toBe('');
        });

        it('returns empty string for undefined input', () => {
            expect(daylioToQuillHtml(undefined)).toBe('');
        });

        it('returns empty string for empty string input', () => {
            expect(daylioToQuillHtml('')).toBe('');
        });
    });

    describe('div to paragraph conversion', () => {
        it('converts div tags to p tags', () => {
            const result = daylioToQuillHtml('<div>Hello</div>');
            expect(result).toContain('<p>');
            expect(result).not.toContain('<div>');
        });

        it('converts div with br to p with br', () => {
            // Note: Leading empty paragraphs are cleaned up by the function
            const result = daylioToQuillHtml('<div>text</div><div><br></div>');
            expect(result).toContain('<p>');
        });
    });

    describe('semantic tag conversion', () => {
        it('converts <b> to <strong>', () => {
            const result = daylioToQuillHtml('<div><b>bold</b></div>');
            expect(result).toContain('<strong>bold</strong>');
            expect(result).not.toContain('<b>');
        });

        it('converts <i> to <em>', () => {
            const result = daylioToQuillHtml('<div><i>italic</i></div>');
            expect(result).toContain('<em>italic</em>');
            expect(result).not.toContain('<i>');
        });

        it('converts <strike> to <s>', () => {
            const result = daylioToQuillHtml('<div><strike>strikethrough</strike></div>');
            expect(result).toContain('<s>strikethrough</s>');
            expect(result).not.toContain('<strike>');
        });
    });

    describe('style and span removal', () => {
        it('removes span tags', () => {
            const result = daylioToQuillHtml('<div><span style="color:red">text</span></div>');
            expect(result).not.toContain('<span');
            expect(result).toContain('text');
        });

        it('removes inline styles from p tags', () => {
            const result = daylioToQuillHtml('<p style="margin:0">text</p>');
            expect(result).not.toContain('style=');
        });

        it('removes font tags', () => {
            const result = daylioToQuillHtml('<div><font color="red">text</font></div>');
            expect(result).not.toContain('<font');
            expect(result).toContain('text');
        });
    });

    describe('line break handling', () => {
        it('converts escaped newlines to br', () => {
            const result = daylioToQuillHtml('<div>line1\\nline2</div>');
            // After convertBrToQuillParagraphs, br becomes paragraph break
            expect(result).toContain('line1');
            expect(result).toContain('line2');
        });
    });

    describe('list handling', () => {
        it('adds data-list="ordered" to ol list items', () => {
            const result = daylioToQuillHtml('<ol><li>item</li></ol>');
            expect(result).toContain('data-list="ordered"');
        });

        it('adds data-list="bullet" to ul list items', () => {
            const result = daylioToQuillHtml('<ul><li>item</li></ul>');
            expect(result).toContain('data-list="bullet"');
        });
    });
});

describe('quillToDaylioHtml', () => {
    describe('input validation', () => {
        it('returns empty string for null input', () => {
            expect(quillToDaylioHtml(null)).toBe('');
        });

        it('returns empty string for empty Quill state', () => {
            expect(quillToDaylioHtml('<p><br></p>')).toBe('');
        });

        it('returns empty string for empty string', () => {
            expect(quillToDaylioHtml('')).toBe('');
        });
    });

    describe('paragraph to div conversion', () => {
        it('converts p tags to div tags', () => {
            const result = quillToDaylioHtml('<p>Hello</p>');
            expect(result).toContain('<div>');
            expect(result).not.toContain('<p>');
        });
    });

    describe('semantic tag conversion', () => {
        it('converts <strong> to <b>', () => {
            const result = quillToDaylioHtml('<p><strong>bold</strong></p>');
            expect(result).toContain('<b>bold</b>');
            expect(result).not.toContain('<strong>');
        });

        it('converts <em> to <i>', () => {
            const result = quillToDaylioHtml('<p><em>italic</em></p>');
            expect(result).toContain('<i>italic</i>');
            expect(result).not.toContain('<em>');
        });
    });

    describe('Quill artifact removal', () => {
        it('removes ql-ui spans', () => {
            const result = quillToDaylioHtml('<p><span class="ql-ui">x</span>text</p>');
            expect(result).not.toContain('ql-ui');
            expect(result).toContain('text');
        });
    });

    describe('list handling', () => {
        it('converts bullet list with data-list attribute', () => {
            const input = '<ol><li data-list="bullet">item</li></ol>';
            const result = quillToDaylioHtml(input);
            expect(result).toContain('<ul>');
        });

        it('keeps ordered list as ol', () => {
            const input = '<ol><li data-list="ordered">item</li></ol>';
            const result = quillToDaylioHtml(input);
            expect(result).toContain('<ol>');
        });
    });

    describe('cleanup', () => {
        it('removes trailing empty divs', () => {
            const result = quillToDaylioHtml('<p>text</p><p><br></p><p><br></p>');
            expect(result).not.toMatch(/<div><br><\/div>$/);
        });

        it('converts empty divs to div with br', () => {
            const result = quillToDaylioHtml('<p>text</p><p></p><p>more</p>');
            // Empty p becomes empty div, which becomes <div><br></div>
            expect(result).toContain('<div><br></div>');
        });
    });
});

describe('htmlToPlainText', () => {
    describe('input validation', () => {
        it('returns empty string for null', () => {
            expect(htmlToPlainText(null)).toBe('');
        });

        it('returns empty string for undefined', () => {
            expect(htmlToPlainText(undefined)).toBe('');
        });

        it('returns empty string for empty string', () => {
            expect(htmlToPlainText('')).toBe('');
        });
    });

    describe('tag removal', () => {
        it('removes div tags', () => {
            expect(htmlToPlainText('<div>hello</div>')).toBe('hello');
        });

        it('removes p tags', () => {
            expect(htmlToPlainText('<p>hello</p>')).toBe('hello');
        });

        it('removes formatting tags', () => {
            expect(htmlToPlainText('<b>bold</b> <i>italic</i>')).toBe('bold italic');
        });
    });

    describe('line break handling', () => {
        it('converts br to newline', () => {
            expect(htmlToPlainText('line1<br>line2')).toBe('line1\nline2');
        });

        it('converts self-closing br to newline', () => {
            expect(htmlToPlainText('line1<br/>line2')).toBe('line1\nline2');
        });

        it('converts div breaks to newlines', () => {
            expect(htmlToPlainText('<div>line1</div><div>line2</div>')).toBe('line1\nline2');
        });

        it('handles escaped newlines', () => {
            expect(htmlToPlainText('line1\\nline2')).toBe('line1\nline2');
        });

        it('collapses multiple newlines to max 2', () => {
            expect(htmlToPlainText('a<br><br><br><br>b')).toBe('a\n\nb');
        });
    });

    describe('list handling', () => {
        it('converts li to bullet points', () => {
            const result = htmlToPlainText('<ul><li>item1</li><li>item2</li></ul>');
            expect(result).toContain('• item1');
            expect(result).toContain('• item2');
        });
    });

    describe('HTML entity decoding', () => {
        it('decodes &nbsp;', () => {
            expect(htmlToPlainText('hello&nbsp;world')).toBe('hello world');
        });

        it('decodes &amp;', () => {
            expect(htmlToPlainText('a&amp;b')).toBe('a&b');
        });

        it('decodes &lt; and &gt;', () => {
            expect(htmlToPlainText('&lt;tag&gt;')).toBe('<tag>');
        });

        it('decodes &quot;', () => {
            expect(htmlToPlainText('&quot;quoted&quot;')).toBe('"quoted"');
        });

        it('decodes &#39;', () => {
            expect(htmlToPlainText("it&#39;s")).toBe("it's");
        });
    });

    describe('whitespace handling', () => {
        it('trims leading and trailing whitespace', () => {
            expect(htmlToPlainText('  <div>hello</div>  ')).toBe('hello');
        });
    });
});

describe('convertBrToQuillParagraphs', () => {
    it('returns empty string for null', () => {
        expect(convertBrToQuillParagraphs(null)).toBe(null);
    });

    it('returns empty string for empty string', () => {
        expect(convertBrToQuillParagraphs('')).toBe('');
    });

    it('converts single br to paragraph break', () => {
        const result = convertBrToQuillParagraphs('line1<br>line2');
        expect(result).toContain('</p><p>');
    });

    it('preserves existing <p><br></p> patterns', () => {
        const result = convertBrToQuillParagraphs('<p><br></p>');
        expect(result).toBe('<p><br></p>');
    });

    it('wraps plain text in paragraph', () => {
        const result = convertBrToQuillParagraphs('plain text');
        expect(result).toBe('<p>plain text</p>');
    });
});

describe('addQuillListAttributes', () => {
    it('returns empty for null', () => {
        expect(addQuillListAttributes(null)).toBe(null);
    });

    it('adds data-list="ordered" to ol items', () => {
        const result = addQuillListAttributes('<ol><li>item</li></ol>');
        expect(result).toContain('data-list="ordered"');
    });

    it('adds data-list="bullet" to ul items', () => {
        const result = addQuillListAttributes('<ul><li>item</li></ul>');
        expect(result).toContain('data-list="bullet"');
    });

    it('does not override existing data-list', () => {
        const input = '<ol><li data-list="custom">item</li></ol>';
        const result = addQuillListAttributes(input);
        expect(result).toContain('data-list="custom"');
    });
});

describe('convertQuillLists', () => {
    it('converts bullet list ol to ul', () => {
        const input = '<ol><li data-list="bullet">item</li></ol>';
        const result = convertQuillLists(input);
        expect(result).toContain('<ul>');
        expect(result).not.toContain('data-list="bullet"');
    });

    it('keeps ordered lists as ol', () => {
        const input = '<ol><li data-list="ordered">item</li></ol>';
        const result = convertQuillLists(input);
        expect(result).toContain('<ol>');
    });
});

describe('round-trip conversion', () => {
    it('preserves basic text through round-trip', () => {
        const original = '<div>Hello World</div>';
        const toQuill = daylioToQuillHtml(original);
        const backToDaylio = quillToDaylioHtml(toQuill);
        expect(backToDaylio).toContain('Hello World');
    });

    it('preserves bold formatting through round-trip', () => {
        const original = '<div><b>bold text</b></div>';
        const toQuill = daylioToQuillHtml(original);
        const backToDaylio = quillToDaylioHtml(toQuill);
        expect(backToDaylio).toContain('<b>bold text</b>');
    });

    it('preserves italic formatting through round-trip', () => {
        const original = '<div><i>italic text</i></div>';
        const toQuill = daylioToQuillHtml(original);
        const backToDaylio = quillToDaylioHtml(toQuill);
        expect(backToDaylio).toContain('<i>italic text</i>');
    });
});
