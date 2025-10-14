/**
 * Main Entry Point
 * Initializes the application
 */

import * as state from './state.js';
import * as ui from './ui.js';

/**
 * Initialize application
 */
function init() {
    console.log('Student Finance Tracker - Initializing...');
    
    // Initialize state from localStorage
    state.initState();
    
    // Initialize UI and event listeners
    ui.initUI();
    
    console.log('Student Finance Tracker - Ready!');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

