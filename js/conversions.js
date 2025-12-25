/**
 * HTML conversion and utility functions for Daylio Scribe
 * Extracted for testability
 */

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Convert <br> tags to paragraph structure that Quill understands.
 * Quill's block model doesn't support <br> inside paragraphs - it silently drops them.
 */
export function convertBrToQuillParagraphs(html) {
    if (!html) return html;

    let result = html;

    // Step 1: Protect existing <p><br></p> patterns (they're already correct blank lines)
    const BLANK_LINE_PLACEHOLDER = '___BLANK_LINE_PLACEHOLDER___';
    result = result.replace(/<p><br\s*\/?><\/p>/gi, BLANK_LINE_PLACEHOLDER);

    // Step 2: Convert <br><br> (blank line) to empty paragraph
    const BR_PLACEHOLDER = '___BR_PLACEHOLDER___';
    result = result.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, `</p><p>${BR_PLACEHOLDER}</p><p>`);

    // Step 3: Convert remaining single <br> to paragraph break
    result = result.replace(/<br\s*\/?>/gi, '</p><p>');

    // Step 4: Restore placeholders
    result = result.replace(new RegExp(BR_PLACEHOLDER, 'g'), '<br>');
    result = result.replace(new RegExp(BLANK_LINE_PLACEHOLDER, 'g'), '<p><br></p>');

    // Step 5: Wrap leading text in <p> if it doesn't start with a tag
    if (result && !result.startsWith('<')) {
        const firstTagMatch = result.match(/<[^>]+>/);
        if (firstTagMatch) {
            const firstTagIndex = result.indexOf(firstTagMatch[0]);
            const leadingText = result.substring(0, firstTagIndex);
            const rest = result.substring(firstTagIndex);
            if (leadingText.trim()) {
                result = `<p>${leadingText}</p>${rest}`;
            }
        } else {
            // No tags at all - wrap everything
            result = `<p>${result}</p>`;
        }
    }

    // Step 6: Fix malformed closing/opening tag sequences
    result = result.replace(/<\/p>\s*<\/p>/gi, '</p>');
    result = result.replace(/<p>\s*<p>/gi, '<p>');

    // Step 7: Remove empty paragraphs (but keep <p><br></p> for blank lines)
    result = result.replace(/<p><\/p>/g, '');

    return result;
}

/**
 * Add data-list attributes to list items for Quill compatibility
 */
export function addQuillListAttributes(html) {
    if (!html) return html;

    const parser = new DOMParser();
    const doc = parser.parseFromString('<div>' + html + '</div>', 'text/html');
    const container = doc.body.firstChild;

    // Add data-list="ordered" to li elements inside ol tags
    container.querySelectorAll('ol > li').forEach(li => {
        if (!li.getAttribute('data-list')) {
            li.setAttribute('data-list', 'ordered');
        }
    });

    // Add data-list="bullet" to li elements inside ul tags
    container.querySelectorAll('ul > li').forEach(li => {
        if (!li.getAttribute('data-list')) {
            li.setAttribute('data-list', 'bullet');
        }
    });

    return container.innerHTML;
}

/**
 * Convert Quill's list format to standard HTML lists
 */
export function convertQuillLists(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString('<div>' + html + '</div>', 'text/html');
    const container = doc.body.firstChild;

    // Find all ol elements and convert based on their li children
    const ols = container.querySelectorAll('ol');
    ols.forEach(ol => {
        const items = ol.querySelectorAll('li');
        if (items.length > 0) {
            const firstItem = items[0];
            const listType = firstItem.getAttribute('data-list');

            if (listType === 'bullet') {
                // Convert to ul
                const ul = doc.createElement('ul');
                items.forEach(li => {
                    li.removeAttribute('data-list');
                    ul.appendChild(li.cloneNode(true));
                });
                ol.parentNode.replaceChild(ul, ol);
            } else {
                // Keep as ol with data-list="ordered" for Quill compatibility
                items.forEach(li => {
                    li.setAttribute('data-list', 'ordered');
                });
            }
        }
    });

    return container.innerHTML;
}

/**
 * Convert Daylio HTML to Quill-compatible HTML
 */
export function daylioToQuillHtml(html) {
    if (!html) return '';

    let result = html;

    // Remove inline styles from spans (keep the tag structure)
    result = result.replace(/<span[^>]*>/gi, '');
    result = result.replace(/<\/span>/gi, '');

    // Remove inline styles from p tags but keep the tag
    result = result.replace(/<p[^>]*>/gi, '<p>');

    // Remove inline styles from li tags but preserve data-list attribute for Quill
    result = result.replace(/<li([^>]*)>/gi, (match, attrs) => {
        const dataListMatch = attrs.match(/data-list="([^"]*)"/);
        if (dataListMatch) {
            return `<li data-list="${dataListMatch[1]}">`;
        }
        return '<li>';
    });

    // Convert <div><br></div> patterns to <p><br></p> for Quill
    result = result.replace(/<div><br\s*\/?><\/div>/gi, '<p><br></p>');

    // Convert remaining divs to paragraphs
    result = result.replace(/<div>/gi, '<p>');
    result = result.replace(/<\/div>/gi, '</p>');

    // Handle \n in the content
    result = result.replace(/\\n/g, '<br>');

    // Convert <b> to <strong> (Quill uses strong)
    result = result.replace(/<b>/gi, '<strong>');
    result = result.replace(/<\/b>/gi, '</strong>');

    // Convert <i> to <em> (Quill uses em)
    result = result.replace(/<i>/gi, '<em>');
    result = result.replace(/<\/i>/gi, '</em>');

    // Convert <s> or <strike> to <s> (Quill uses s for strikethrough)
    result = result.replace(/<strike>/gi, '<s>');
    result = result.replace(/<\/strike>/gi, '</s>');

    // Remove <font> tags
    result = result.replace(/<font[^>]*>/gi, '');
    result = result.replace(/<\/font>/gi, '');

    // Convert <br> tags to paragraph structure for Quill
    result = convertBrToQuillParagraphs(result);

    // Clean up empty paragraphs at the start
    result = result.replace(/^(<p><br><\/p>)+/, '');

    // Add data-list attributes for Quill list recognition
    result = addQuillListAttributes(result);

    return result;
}

/**
 * Convert Quill HTML back to Daylio-compatible HTML
 */
export function quillToDaylioHtml(html) {
    if (!html || html === '<p><br></p>') return '';

    let result = html;

    // Remove Quill UI artifacts
    result = result.replace(/<span class="ql-ui"[^>]*>.*?<\/span>/gi, '');

    // Convert Quill's list format to standard HTML
    result = result.replace(/<ol>(\s*<li data-list="bullet">)/gi, '<ul><li>');
    result = result.replace(/<li data-list="bullet">/gi, '<li>');
    result = result.replace(/<\/li>(\s*)<\/ol>/gi, (match, space, offset) => {
        const before = result.substring(0, offset);
        if (before.lastIndexOf('<ul>') > before.lastIndexOf('<ol>')) {
            return '</li>' + space + '</ul>';
        }
        return match;
    });

    // Handle bullet lists properly with a more robust approach
    result = convertQuillLists(result);

    // Convert <strong> to <b>
    result = result.replace(/<strong>/gi, '<b>');
    result = result.replace(/<\/strong>/gi, '</b>');

    // Convert <em> to <i>
    result = result.replace(/<em>/gi, '<i>');
    result = result.replace(/<\/em>/gi, '</i>');

    // Convert paragraphs to divs (Daylio uses divs)
    result = result.replace(/<p>/gi, '<div>');
    result = result.replace(/<\/p>/gi, '</div>');

    // Clean up: Handle empty divs
    result = result.replace(/<div><\/div>/gi, '<div><br></div>');

    // Remove trailing <div><br></div>
    result = result.replace(/(<div><br><\/div>)+$/, '');

    // Remove leading/trailing whitespace
    result = result.trim();

    return result;
}

/**
 * Convert HTML note to plain text for preview/search
 */
export function htmlToPlainText(html) {
    if (!html) return '';

    let text = html;

    // Replace <br> and <br/> with newlines
    text = text.replace(/<br\s*\/?>/gi, '\n');

    // Replace </div><div> patterns with newlines (paragraph breaks)
    text = text.replace(/<\/div>\s*<div>/gi, '\n');

    // Replace closing block tags with newlines
    text = text.replace(/<\/(div|p|li)>/gi, '\n');

    // Replace <li> with bullet point
    text = text.replace(/<li[^>]*>/gi, '• ');

    // Remove all remaining HTML tags
    text = text.replace(/<[^>]+>/g, '');

    // Decode HTML entities
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#39;/g, "'");

    // Handle escaped newlines from JSON
    text = text.replace(/\\n/g, '\n');

    // Clean up multiple consecutive newlines (max 2)
    text = text.replace(/\n{3,}/g, '\n\n');

    // Trim whitespace
    text = text.trim();

    return text;
}

/**
 * Highlight search term in text (case-insensitive)
 * Returns HTML with <mark> tags around matches
 */
export function highlightText(text, searchTerm) {
    if (!searchTerm || !text) return escapeHtml(text);

    const escaped = escapeHtml(text);
    const escapedTerm = escapeHtml(searchTerm);

    // Create case-insensitive regex, escaping regex special chars
    const regexSafe = escapedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${regexSafe})`, 'gi');

    return escaped.replace(regex, '<mark>$1</mark>');
}

/**
 * Escape a field for CSV (handle quotes, commas, newlines)
 */
export function escapeCsvField(field) {
    if (field === null || field === undefined) return '';

    const str = String(field);

    // If contains comma, quote, or newline, wrap in quotes and escape quotes
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return '"' + str.replace(/"/g, '""') + '"';
    }

    return str;
}
