/**
 * Storage Module
 * Handles localStorage interactions for data persistence
 */

const STORAGE_KEYS = {
    TRANSACTIONS: 'financeApp:transactions',
    SETTINGS: 'financeApp:settings',
    BUDGET_CAP: 'financeApp:budgetCap'
};

/**
 * Load transactions from localStorage
 * @returns {Array} - Array of transaction objects
 */
export function loadTransactions() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading transactions:', error);
        return [];
    }
}

/**
 * Save transactions to localStorage
 * @param {Array} transactions - Array of transaction objects
 */
export function saveTransactions(transactions) {
    try {
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
        console.error('Error saving transactions:', error);
        throw new Error('Failed to save transactions');
    }
}

/**
 * Load settings from localStorage
 * @returns {Object} - Settings object
 */
export function loadSettings() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data ? JSON.parse(data) : {
            eurRate: 1.09,
            gbpRate: 1.27,
            categories: ['Food', 'Books', 'Transport', 'Entertainment', 'Fees', 'Other']
        };
    } catch (error) {
        console.error('Error loading settings:', error);
        return {
            eurRate: 1.09,
            gbpRate: 1.27,
            categories: ['Food', 'Books', 'Transport', 'Entertainment', 'Fees', 'Other']
        };
    }
}

/**
 * Save settings to localStorage
 * @param {Object} settings - Settings object
 */
export function saveSettings(settings) {
    try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving settings:', error);
        throw new Error('Failed to save settings');
    }
}

/**
 * Load budget cap from localStorage
 * @returns {number|null} - Budget cap amount or null
 */
export function loadBudgetCap() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.BUDGET_CAP);
        return data ? parseFloat(data) : null;
    } catch (error) {
        console.error('Error loading budget cap:', error);
        return null;
    }
}

/**
 * Save budget cap to localStorage
 * @param {number} cap - Budget cap amount
 */
export function saveBudgetCap(cap) {
    try {
        localStorage.setItem(STORAGE_KEYS.BUDGET_CAP, cap.toString());
    } catch (error) {
        console.error('Error saving budget cap:', error);
        throw new Error('Failed to save budget cap');
    }
}

/**
 * Export transactions as JSON
 * @param {Array} transactions - Array of transaction objects
 * @returns {string} - JSON string
 */
export function exportToJSON(transactions) {
    return JSON.stringify(transactions, null, 2);
}

/**
 * Import transactions from JSON
 * @param {string} jsonString - JSON string
 * @returns {Array} - Array of transaction objects
 */
export function importFromJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Invalid JSON format');
    }
}

/**
 * Clear all data from localStorage
 */
export function clearAllData() {
    try {
        localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
        localStorage.removeItem(STORAGE_KEYS.BUDGET_CAP);
    } catch (error) {
        console.error('Error clearing data:', error);
        throw new Error('Failed to clear data');
    }
}

