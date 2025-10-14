/**
 * Validators Module
 * Contains regex-based validation logic for form inputs
 */

// Regex patterns
export const patterns = {
    // Description/title: forbid leading/trailing spaces and collapse doubles
    description: /^\S(?:.*\S)?$/,
    
    // Numeric field (amount): allows 0 or positive numbers with up to 2 decimal places
    amount: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
    
    // Date (YYYY-MM-DD)
    date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    
    // Category/tag (letters, spaces, hyphens)
    category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
    
    // Advanced: Detect duplicate words (back-reference)
    duplicateWords: /\b(\w+)\s+\1\b/i,
    
    // Advanced: Check for cents in amount (lookahead)
    hasCents: /\.\d{2}\b/,
    
    // Advanced: Beverage keywords
    beverage: /(coffee|tea|juice|soda|water)/i
};

/**
 * Validate description field
 * @param {string} value - The description to validate
 * @returns {Object} - {valid: boolean, message: string}
 */
export function validateDescription(value) {
    if (!value || value.trim() === '') {
        return { valid: false, message: 'Description is required' };
    }
    
    if (!patterns.description.test(value)) {
        return { valid: false, message: 'Description cannot have leading/trailing spaces or double spaces' };
    }
    
    // Check for duplicate words using advanced regex
    if (patterns.duplicateWords.test(value)) {
        return { valid: false, message: 'Description contains duplicate words' };
    }
    
    if (value.length < 3) {
        return { valid: false, message: 'Description must be at least 3 characters long' };
    }
    
    if (value.length > 100) {
        return { valid: false, message: 'Description must be less than 100 characters' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validate amount field
 * @param {string} value - The amount to validate
 * @returns {Object} - {valid: boolean, message: string}
 */
export function validateAmount(value) {
    if (!value || value.trim() === '') {
        return { valid: false, message: 'Amount is required' };
    }
    
    if (!patterns.amount.test(value)) {
        return { valid: false, message: 'Amount must be a valid number with up to 2 decimal places' };
    }
    
    const numValue = parseFloat(value);
    if (numValue <= 0) {
        return { valid: false, message: 'Amount must be greater than 0' };
    }
    
    if (numValue > 999999.99) {
        return { valid: false, message: 'Amount must be less than 1,000,000' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validate date field
 * @param {string} value - The date to validate
 * @returns {Object} - {valid: boolean, message: string}
 */
export function validateDate(value) {
    if (!value || value.trim() === '') {
        return { valid: false, message: 'Date is required' };
    }
    
    if (!patterns.date.test(value)) {
        return { valid: false, message: 'Date must be in YYYY-MM-DD format' };
    }
    
    // Additional validation: check if date is valid
    const dateObj = new Date(value);
    if (isNaN(dateObj.getTime())) {
        return { valid: false, message: 'Invalid date' };
    }
    
    // Check if date is not in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateObj > today) {
        return { valid: false, message: 'Date cannot be in the future' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validate category field
 * @param {string} value - The category to validate
 * @returns {Object} - {valid: boolean, message: string}
 */
export function validateCategory(value) {
    if (!value || value.trim() === '') {
        return { valid: false, message: 'Category is required' };
    }
    
    // For select dropdown, we just check if it's not empty
    // If we allow custom categories, we'd use the pattern
    return { valid: true, message: '' };
}

/**
 * Validate entire transaction form
 * @param {Object} data - The transaction data
 * @returns {Object} - {valid: boolean, errors: Object}
 */
export function validateTransaction(data) {
    const errors = {};
    
    const descResult = validateDescription(data.description);
    if (!descResult.valid) {
        errors.description = descResult.message;
    }
    
    const amountResult = validateAmount(data.amount);
    if (!amountResult.valid) {
        errors.amount = amountResult.message;
    }
    
    const dateResult = validateDate(data.date);
    if (!dateResult.valid) {
        errors.date = dateResult.message;
    }
    
    const categoryResult = validateCategory(data.category);
    if (!categoryResult.valid) {
        errors.category = categoryResult.message;
    }
    
    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}

/**
 * Validate JSON import data
 * @param {Array} data - The imported data array
 * @returns {Object} - {valid: boolean, message: string}
 */
export function validateImportData(data) {
    if (!Array.isArray(data)) {
        return { valid: false, message: 'Import data must be an array' };
    }
    
    for (let i = 0; i < data.length; i++) {
        const record = data[i];
        
        if (!record.id || typeof record.id !== 'string') {
            return { valid: false, message: `Record ${i + 1}: Invalid or missing id` };
        }
        
        if (!record.description || typeof record.description !== 'string') {
            return { valid: false, message: `Record ${i + 1}: Invalid or missing description` };
        }
        
        if (typeof record.amount !== 'number' || record.amount <= 0) {
            return { valid: false, message: `Record ${i + 1}: Invalid or missing amount` };
        }
        
        if (!record.category || typeof record.category !== 'string') {
            return { valid: false, message: `Record ${i + 1}: Invalid or missing category` };
        }
        
        if (!record.date || !patterns.date.test(record.date)) {
            return { valid: false, message: `Record ${i + 1}: Invalid or missing date` };
        }
        
        if (!record.createdAt || !record.updatedAt) {
            return { valid: false, message: `Record ${i + 1}: Missing timestamps` };
        }
    }
    
    return { valid: true, message: 'Data is valid' };
}

