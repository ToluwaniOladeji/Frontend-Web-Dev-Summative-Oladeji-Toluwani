/**
 * UI Module
 * Handles DOM manipulation and rendering
 */

import * as state from './state.js';
import * as search from './search.js';
import * as validators from './validators.js';

/**
 * Initialize UI event listeners
 */
export function initUI() {
    // Navigation
    initNavigation();
    
    // Dashboard
    initDashboard();
    
    // Records
    initRecords();
    
    // Form
    initForm();
    
    // Settings
    initSettings();
    
    // Listen to state changes
    state.addListener(handleStateChange);
    
    // Initial render
    handleStateChange(state.getState());
}

/**
 * Initialize navigation
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            showSection(sectionId);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

/**
 * Show specific section
 * @param {string} sectionId - Section ID to show
 */
function showSection(sectionId) {
    const sections = document.querySelectorAll('.app-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

/**
 * Initialize dashboard
 */
function initDashboard() {
    const setCapBtn = document.getElementById('set-cap-btn');
    const budgetCapInput = document.getElementById('budget-cap');
    
    setCapBtn.addEventListener('click', () => {
        const cap = parseFloat(budgetCapInput.value);
        if (!isNaN(cap) && cap > 0) {
            state.setBudgetCap(cap);
            showStatus('cap-status', 'Budget cap set successfully!', 'success', 'polite');
        } else {
            showStatus('cap-status', 'Please enter a valid amount', 'error', 'assertive');
        }
    });
}

/**
 * Initialize records section
 */
function initRecords() {
    // Search
    const searchInput = document.getElementById('search-input');
    const caseInsensitiveCheckbox = document.getElementById('case-insensitive');
    const searchError = document.getElementById('search-error');
    
    const handleSearch = () => {
        const pattern = searchInput.value;
        const flags = caseInsensitiveCheckbox.checked ? 'gi' : 'g';
        
        if (!pattern) {
            state.setSearch(null);
            searchError.textContent = '';
            return;
        }
        
        const validation = search.validatePattern(pattern);
        if (!validation.valid) {
            searchError.textContent = search.getSearchError(pattern);
            state.setSearch(null);
            return;
        }
        
        const regex = search.compileRegex(pattern, flags);
        if (regex) {
            state.setSearch(regex);
            searchError.textContent = '';
        } else {
            searchError.textContent = search.getSearchError(pattern);
            state.setSearch(null);
        }
    };
    
    searchInput.addEventListener('input', handleSearch);
    caseInsensitiveCheckbox.addEventListener('change', handleSearch);
    
    // Sort
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const field = btn.dataset.sort;
            const currentSort = state.getState().currentSort;
            const ascending = currentSort.field === field ? !currentSort.ascending : true;
            state.setSort(field, ascending);
            
            // Update button text
            const arrow = ascending ? '↑' : '↓';
            btn.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)} ${arrow}`;
        });
    });
}

/**
 * Initialize form
 */
function initForm() {
    const form = document.getElementById('transaction-form');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    
    // Real-time validation
    const descInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const dateInput = document.getElementById('date');
    const categorySelect = document.getElementById('category');
    
    descInput.addEventListener('blur', () => validateField('description', descInput.value));
    amountInput.addEventListener('blur', () => validateField('amount', amountInput.value));
    dateInput.addEventListener('blur', () => validateField('date', dateInput.value));
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const data = {
            description: descInput.value,
            amount: amountInput.value,
            category: categorySelect.value,
            date: dateInput.value
        };
        
        const validation = validators.validateTransaction(data);
        
        if (!validation.valid) {
            // Show errors
            Object.entries(validation.errors).forEach(([field, message]) => {
                showFieldError(field, message);
            });
            showStatus('form-status', 'Please fix the errors above', 'error', 'assertive');
            return;
        }
        
        // Clear errors
        clearAllFieldErrors();
        
        const editId = state.getEditingId();
        if (editId) {
            // Update existing transaction
            state.updateTransaction(editId, data);
            showStatus('form-status', 'Transaction updated successfully!', 'success', 'polite');
            state.setEditingId(null);
        } else {
            // Add new transaction
            state.addTransaction(data);
            showStatus('form-status', 'Transaction added successfully!', 'success', 'polite');
        }
        
        // Reset form
        form.reset();
        submitBtn.textContent = 'Add Transaction';
        
        // Switch to records view
        setTimeout(() => {
            showSection('records');
            document.querySelector('[data-section="records"]').classList.add('active');
            document.querySelector('[data-section="add-edit"]').classList.remove('active');
        }, 1000);
    });
    
    cancelBtn.addEventListener('click', () => {
        form.reset();
        clearAllFieldErrors();
        state.setEditingId(null);
        submitBtn.textContent = 'Add Transaction';
        document.getElementById('form-status').textContent = '';
        showSection('records');
        document.querySelector('[data-section="records"]').classList.add('active');
        document.querySelector('[data-section="add-edit"]').classList.remove('active');
    });
}

/**
 * Validate single field
 * @param {string} field - Field name
 * @param {string} value - Field value
 */
function validateField(field, value) {
    let result;
    
    switch (field) {
        case 'description':
            result = validators.validateDescription(value);
            break;
        case 'amount':
            result = validators.validateAmount(value);
            break;
        case 'date':
            result = validators.validateDate(value);
            break;
        case 'category':
            result = validators.validateCategory(value);
            break;
        default:
            return;
    }
    
    if (!result.valid) {
        showFieldError(field, result.message);
    } else {
        clearFieldError(field);
    }
}

/**
 * Show field error
 * @param {string} field - Field name
 * @param {string} message - Error message
 */
function showFieldError(field, message) {
    const errorElement = document.getElementById(`${field}-error`);
    const inputElement = document.getElementById(field);
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

/**
 * Clear field error
 * @param {string} field - Field name
 */
function clearFieldError(field) {
    const errorElement = document.getElementById(`${field}-error`);
    const inputElement = document.getElementById(field);
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    if (inputElement) {
        inputElement.classList.remove('error');
    }
}

/**
 * Clear all field errors
 */
function clearAllFieldErrors() {
    ['description', 'amount', 'date', 'category'].forEach(field => {
        clearFieldError(field);
    });
}

/**
 * Initialize settings
 */
function initSettings() {
    const saveRatesBtn = document.getElementById('save-rates-btn');
    const usdRateInput = document.getElementById('usd-rate');
    const rwfRateInput = document.getElementById('rwf-rate');
    const exportBtn = document.getElementById('export-json-btn');
    const importFile = document.getElementById('import-file');
    const clearDataBtn = document.getElementById('clear-data-btn');
    
    // Load current rates
    const settings = state.getSettings();
    usdRateInput.value = settings.usdRate || 1.09;
    rwfRateInput.value = settings.rwfRate || 1.27;

    // Save rates
    saveRatesBtn.addEventListener('click', () => {
        const usdRate = parseFloat(usdRateInput.value);
        const rwfRate = parseFloat(rwfRateInput.value);
        
        if (isNaN(usdRate) || isNaN(rwfRate) || usdRate <= 0 || rwfRate <= 0) {
            showStatus('rates-status', 'Please enter valid rates', 'error', 'assertive');
            return;
        }
        
        state.updateSettings({ usdRate, rwfRate });
        showStatus('rates-status', 'Rates saved successfully!', 'success', 'polite');
    });
    
    // Export JSON
    exportBtn.addEventListener('click', () => {
        const transactions = state.getTransactions();
        const json = JSON.stringify(transactions, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });
    
    // Import JSON
    importFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                const validation = validators.validateImportData(data);
                
                if (!validation.valid) {
                    showStatus('import-status', validation.message, 'error', 'assertive');
                    return;
                }
                
                state.importTransactions(data);
                showStatus('import-status', `Successfully imported ${data.length} transactions!`, 'success', 'polite');
                importFile.value = '';
            } catch (error) {
                showStatus('import-status', 'Invalid JSON file', 'error', 'assertive');
            }
        };
        reader.readAsText(file);
    });
    
    // Clear data
    clearDataBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all transactions? This cannot be undone.')) {
            state.clearTransactions();
            showStatus('import-status', 'All transactions cleared', 'success', 'polite');
        }
    });
    
    // Render categories
    renderCategories();
}

/**
 * Render categories list
 */
function renderCategories() {
    const categoriesList = document.getElementById('categories-list');
    const settings = state.getSettings();
    const categories = settings.categories || [];
    
    categoriesList.innerHTML = categories.map(cat => 
        `<span class="category-tag">${cat}</span>`
    ).join('');
}

/**
 * Show status message
 * @param {string} elementId - Element ID
 * @param {string} message - Status message
 * @param {string} type - Message type (success/error)
 * @param {string} liveLevel - ARIA live level (polite/assertive)
 */
function showStatus(elementId, message, type, liveLevel = 'polite') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.textContent = message;
    element.className = type === 'success' ? 'cap-status under-budget' : 'cap-status over-budget';
    element.setAttribute('aria-live', liveLevel);
    
    // Clear after 5 seconds
    setTimeout(() => {
        element.textContent = '';
    }, 5000);
}

/**
 * Handle state changes
 * @param {Object} currentState - Current application state
 */
function handleStateChange(currentState) {
    renderDashboard(currentState);
    renderRecords(currentState);
}

/**
 * Render dashboard
 * @param {Object} currentState - Current application state
 */
function renderDashboard(currentState) {
    const stats = state.calculateStats();
    
    // Update stats
    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-spent').textContent = `N${stats.totalSpent.toFixed(2)}`;
    document.getElementById('stat-category').textContent = stats.topCategory;
    document.getElementById('stat-week').textContent = `N${stats.last7Days.toFixed(2)}`;
    
    // Update budget cap status
    const capStatus = document.getElementById('cap-status');
    const budgetCap = currentState.budgetCap;
    
    if (budgetCap) {
        const remaining = budgetCap - stats.totalSpent;
        
        if (remaining >= 0) {
            capStatus.textContent = `Budget: N${stats.totalSpent.toFixed(2)} / N${budgetCap.toFixed(2)} - Remaining: N${remaining.toFixed(2)}`;
            capStatus.className = 'cap-status under-budget';
            capStatus.setAttribute('aria-live', 'polite');
        } else {
            capStatus.textContent = `Budget exceeded! Spent: N${stats.totalSpent.toFixed(2)} / Cap: N${budgetCap.toFixed(2)} - Over by: N${Math.abs(remaining).toFixed(2)}`;
            capStatus.className = 'cap-status over-budget';
            capStatus.setAttribute('aria-live', 'assertive');
        }
    } else {
        capStatus.textContent = '';
    }
    
    // Render category chart
    renderCategoryChart(stats.categoryBreakdown);
}

/**
 * Render category chart
 * @param {Array} breakdown - Category breakdown data
 */
function renderCategoryChart(breakdown) {
    const chartContainer = document.getElementById('category-chart');
    
    if (breakdown.length === 0) {
        chartContainer.innerHTML = '<p style="color: var(--text-secondary);">No data to display</p>';
        return;
    }
    
    chartContainer.innerHTML = breakdown.map(item => `
        <div class="chart-bar">
            <div class="chart-bar-label">
                <span>${item.category}</span>
                <span>N${item.amount.toFixed(2)} (${item.percentage.toFixed(1)}%)</span>
            </div>
            <div class="chart-bar-bg">
                <div class="chart-bar-fill" style="width: ${item.percentage}%"></div>
            </div>
        </div>
    `).join('');
}

/**
 * Render records
 * @param {Object} currentState - Current application state
 */
function renderRecords(currentState) {
    let transactions = state.getSortedTransactions();
    const searchRegex = currentState.currentSearch;
    
    // Apply search filter
    if (searchRegex) {
        transactions = search.searchTransactions(transactions, searchRegex);
    }
    
    // Show/hide empty state
    const emptyState = document.getElementById('empty-state');
    if (transactions.length === 0) {
        emptyState.classList.remove('hidden');
        document.getElementById('records-tbody').innerHTML = '';
        document.getElementById('records-cards').innerHTML = '';
        return;
    } else {
        emptyState.classList.add('hidden');
    }
    
    // Render table (desktop)
    renderTable(transactions, searchRegex);
    
    // Render cards (mobile)
    renderCards(transactions, searchRegex);
}

/**
 * Render table view
 * @param {Array} transactions - Transactions to render
 * @param {RegExp|null} searchRegex - Search regex for highlighting
 */
function renderTable(transactions, searchRegex) {
    const tbody = document.getElementById('records-tbody');
    
    tbody.innerHTML = transactions.map(t => `
        <tr>
            <td>${search.highlight(t.date, searchRegex)}</td>
            <td>${search.highlight(t.description, searchRegex)}</td>
            <td>N${search.highlight(t.amount.toFixed(2), searchRegex)}</td>
            <td>${search.highlight(t.category, searchRegex)}</td>
            <td>
                <button class="btn btn-small btn-secondary" onclick="window.editTransaction('${t.id}')">Edit</button>
                <button class="btn btn-small btn-danger" onclick="window.deleteTransaction('${t.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

/**
 * Render cards view
 * @param {Array} transactions - Transactions to render
 * @param {RegExp|null} searchRegex - Search regex for highlighting
 */
function renderCards(transactions, searchRegex) {
    const cardsContainer = document.getElementById('records-cards');
    
    cardsContainer.innerHTML = transactions.map(t => `
        <div class="record-card">
            <div class="record-card-header">
                <div class="record-card-description">${search.highlight(t.description, searchRegex)}</div>
                <div class="record-card-amount">$${search.highlight(t.amount.toFixed(2), searchRegex)}</div>
            </div>
            <div class="record-card-details">
                <div>Category: ${search.highlight(t.category, searchRegex)}</div>
                <div>Date: ${search.highlight(t.date, searchRegex)}</div>
            </div>
            <div class="record-card-actions">
                <button class="btn btn-small btn-secondary" onclick="window.editTransaction('${t.id}')">Edit</button>
                <button class="btn btn-small btn-danger" onclick="window.deleteTransaction('${t.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Export functions to window for onclick handlers
window.editTransaction = (id) => {
    const transaction = state.getTransaction(id);
    if (!transaction) return;
    
    // Populate form
    document.getElementById('description').value = transaction.description;
    document.getElementById('amount').value = transaction.amount;
    document.getElementById('category').value = transaction.category;
    document.getElementById('date').value = transaction.date;
    
    // Set editing mode
    state.setEditingId(id);
    document.getElementById('submit-btn').textContent = 'Update Transaction';
    
    // Show form section
    showSection('add-edit');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector('[data-section="add-edit"]').classList.add('active');
    
    // Focus on description field
    document.getElementById('description').focus();
};

window.deleteTransaction = (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
        state.deleteTransaction(id);
    }
};

