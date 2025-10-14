/**
 * State Module
 * Manages application state and provides methods to manipulate data
 */

import * as storage from './storage.js';

// Helper to load seed data from seed.json when no transactions are present
async function loadSeedIfEmpty() {
    try {
        const existing = storage.loadTransactions();
        if (existing && existing.length > 0) return existing;

        // Fetch seed.json relative to the app root
        const resp = await fetch('seed.json');
        if (!resp.ok) return [];
        const data = await resp.json();

        // Save seed data to storage so subsequent loads use localStorage
        storage.saveTransactions(data);
        return data;
    } catch (error) {
        console.warn('Could not load seed.json:', error);
        return storage.loadTransactions();
    }
}

// Application state
let state = {
    transactions: [],
    settings: {},
    budgetCap: null,
    currentSort: { field: 'date', ascending: false },
    currentSearch: null,
    editingId: null
};

// State change listeners
const listeners = [];

/**
 * Initialize state from localStorage
 */
export async function initState() {
    // Load transactions from localStorage or seed.json if empty
    state.transactions = await loadSeedIfEmpty();
    state.settings = storage.loadSettings();
    state.budgetCap = storage.loadBudgetCap();
    notifyListeners();
}

/**
 * Get current state
 * @returns {Object} - Current state
 */
export function getState() {
    return { ...state };
}

/**
 * Add a state change listener
 * @param {Function} listener - Callback function
 */
export function addListener(listener) {
    listeners.push(listener);
}

/**
 * Notify all listeners of state change
 */
function notifyListeners() {
    listeners.forEach(listener => listener(state));
}

/**
 * Generate unique ID for transaction
 * @returns {string} - Unique ID
 */
function generateId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `txn_${timestamp}_${random}`;
}

/**
 * Add new transaction
 * @param {Object} data - Transaction data
 * @returns {Object} - Added transaction
 */
export function addTransaction(data) {
    const now = new Date().toISOString();
    const transaction = {
        id: generateId(),
        description: data.description.trim(),
        amount: parseFloat(data.amount),
        category: data.category,
        date: data.date,
        createdAt: now,
        updatedAt: now
    };
    
    state.transactions.push(transaction);
    storage.saveTransactions(state.transactions);
    notifyListeners();
    
    return transaction;
}

/**
 * Update existing transaction
 * @param {string} id - Transaction ID
 * @param {Object} data - Updated transaction data
 * @returns {Object|null} - Updated transaction or null if not found
 */
export function updateTransaction(id, data) {
    const index = state.transactions.findIndex(t => t.id === id);
    if (index === -1) {
        return null;
    }
    
    const transaction = state.transactions[index];
    transaction.description = data.description.trim();
    transaction.amount = parseFloat(data.amount);
    transaction.category = data.category;
    transaction.date = data.date;
    transaction.updatedAt = new Date().toISOString();
    
    storage.saveTransactions(state.transactions);
    notifyListeners();
    
    return transaction;
}

/**
 * Delete transaction
 * @param {string} id - Transaction ID
 * @returns {boolean} - True if deleted, false if not found
 */
export function deleteTransaction(id) {
    const index = state.transactions.findIndex(t => t.id === id);
    if (index === -1) {
        return false;
    }
    
    state.transactions.splice(index, 1);
    storage.saveTransactions(state.transactions);
    notifyListeners();
    
    return true;
}

/**
 * Get transaction by ID
 * @param {string} id - Transaction ID
 * @returns {Object|null} - Transaction or null if not found
 */
export function getTransaction(id) {
    return state.transactions.find(t => t.id === id) || null;
}

/**
 * Get all transactions
 * @returns {Array} - Array of transactions
 */
export function getTransactions() {
    return [...state.transactions];
}

/**
 * Set sort order
 * @param {string} field - Field to sort by
 * @param {boolean} ascending - Sort direction
 */
export function setSort(field, ascending) {
    state.currentSort = { field, ascending };
    notifyListeners();
}

/**
 * Get sorted transactions
 * @returns {Array} - Sorted array of transactions
 */
export function getSortedTransactions() {
    const sorted = [...state.transactions];
    const { field, ascending } = state.currentSort;
    
    sorted.sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];
        
        // Handle different data types
        if (field === 'amount') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        } else if (field === 'date') {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
        } else {
            aVal = aVal.toString().toLowerCase();
            bVal = bVal.toString().toLowerCase();
        }
        
        if (aVal < bVal) return ascending ? -1 : 1;
        if (aVal > bVal) return ascending ? 1 : -1;
        return 0;
    });
    
    return sorted;
}

/**
 * Set search regex
 * @param {RegExp|null} regex - Search regex
 */
export function setSearch(regex) {
    state.currentSearch = regex;
    notifyListeners();
}

/**
 * Get current search regex
 * @returns {RegExp|null} - Current search regex
 */
export function getSearch() {
    return state.currentSearch;
}

/**
 * Set budget cap
 * @param {number} cap - Budget cap amount
 */
export function setBudgetCap(cap) {
    state.budgetCap = cap;
    storage.saveBudgetCap(cap);
    notifyListeners();
}

/**
 * Get budget cap
 * @returns {number|null} - Budget cap amount
 */
export function getBudgetCap() {
    return state.budgetCap;
}

/**
 * Update settings
 * @param {Object} settings - Settings object
 */
export function updateSettings(settings) {
    state.settings = { ...state.settings, ...settings };
    storage.saveSettings(state.settings);
    notifyListeners();
}

/**
 * Get settings
 * @returns {Object} - Settings object
 */
export function getSettings() {
    return { ...state.settings };
}

/**
 * Import transactions
 * @param {Array} transactions - Array of transactions
 */
export function importTransactions(transactions) {
    state.transactions = transactions;
    storage.saveTransactions(state.transactions);
    notifyListeners();
}

/**
 * Clear all transactions
 */
export function clearTransactions() {
    state.transactions = [];
    storage.saveTransactions(state.transactions);
    notifyListeners();
}

/**
 * Set editing ID
 * @param {string|null} id - Transaction ID being edited
 */
export function setEditingId(id) {
    state.editingId = id;
    notifyListeners();
}

/**
 * Get editing ID
 * @returns {string|null} - Transaction ID being edited
 */
export function getEditingId() {
    return state.editingId;
}

/**
 * Calculate statistics
 * @returns {Object} - Statistics object
 */
export function calculateStats() {
    const transactions = state.transactions;
    
    // Total transactions
    const total = transactions.length;
    
    // Total spent
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Top category
    const categoryTotals = {};
    transactions.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    
    let topCategory = '-';
    let topAmount = 0;
    Object.entries(categoryTotals).forEach(([category, amount]) => {
        if (amount > topAmount) {
            topCategory = category;
            topAmount = amount;
        }
    });
    
    // Last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const last7Days = transactions
        .filter(t => new Date(t.date) >= sevenDaysAgo)
        .reduce((sum, t) => sum + t.amount, 0);
    
    // Category breakdown
    const categoryBreakdown = Object.entries(categoryTotals)
        .map(([category, amount]) => ({
            category,
            amount,
            percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0
        }))
        .sort((a, b) => b.amount - a.amount);
    
    return {
        total,
        totalSpent,
        topCategory,
        last7Days,
        categoryBreakdown
    };
}

