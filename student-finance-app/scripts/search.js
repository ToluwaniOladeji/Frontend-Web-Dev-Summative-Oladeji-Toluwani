/**
 * Search Module
 * Implements live regex search functionality
 */

/**
 * Compile regex pattern safely
 * @param {string} input - Regex pattern string
 * @param {string} flags - Regex flags (default: 'i')
 * @returns {RegExp|null} - Compiled regex or null if invalid
 */
export function compileRegex(input, flags = 'i') {
    try {
        return input ? new RegExp(input, flags) : null;
    } catch (error) {
        return null;
    }
}

/**
 * Highlight matches in text using <mark> tags
 * @param {string} text - Text to highlight
 * @param {RegExp|null} regex - Regex pattern to match
 * @returns {string} - HTML string with highlighted matches
 */
export function highlight(text, regex) {
    if (!regex || !text) {
        return escapeHtml(text);
    }
    
    try {
        // Escape HTML first to prevent XSS
        const escapedText = escapeHtml(text);
        
        // If the regex doesn't match, return the escaped text
        if (!regex.test(text)) {
            return escapedText;
        }
        
        // Reset regex lastIndex
        regex.lastIndex = 0;
        
        // Replace matches with <mark> tags
        return text.replace(regex, match => `<mark>${escapeHtml(match)}</mark>`);
    } catch (error) {
        console.error('Error highlighting text:', error);
        return escapeHtml(text);
    }
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Search transactions using regex
 * @param {Array} transactions - Array of transaction objects
 * @param {RegExp|null} regex - Regex pattern to match
 * @returns {Array} - Filtered array of transactions
 */
export function searchTransactions(transactions, regex) {
    if (!regex) {
        return transactions;
    }
    
    return transactions.filter(transaction => {
        // Search in description, category, and amount
        const searchableText = `${transaction.description} ${transaction.category} ${transaction.amount}`;
        return regex.test(searchableText);
    });
}

/**
 * Get search error message
 * @param {string} pattern - Regex pattern that failed
 * @returns {string} - Error message
 */
export function getSearchError(pattern) {
    if (!pattern) {
        return '';
    }
    return `Invalid regex pattern: "${pattern}". Please check your syntax.`;
}

/**
 * Validate regex pattern
 * @param {string} pattern - Regex pattern to validate
 * @returns {Object} - {valid: boolean, error: string}
 */
export function validatePattern(pattern) {
    if (!pattern) {
        return { valid: true, error: '' };
    }
    
    try {
        new RegExp(pattern);
        return { valid: true, error: '' };
    } catch (error) {
        return { valid: false, error: error.message };
    }
}

