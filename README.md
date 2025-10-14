# Student Finance Tracker

A comprehensive, accessible, and responsive web application for students to manage their finances effectively. Built with vanilla HTML, CSS, and JavaScript following modern web development best practices.

## 🎯 Chosen Theme

**Student Finance Tracker** - Track budgets, transactions, and spending patterns with advanced search capabilities.

## 🌟 Features

### Core Features

- **Transaction Management**: Add, edit, and delete financial transactions with detailed categorization
- **Advanced Regex Search**: Search and filter transactions using regex patterns with real-time highlighting
- **Budget Tracking**: Set monthly budget caps and receive alerts when approaching or exceeding limits
- **Data Visualization**: View spending trends and category breakdowns on an interactive dashboard
- **Multi-Currency Support**: Configure exchange rates for EUR and GBP
- **Data Portability**: Import and export transaction data in JSON format with validation
- **Responsive Design**: Optimized for mobile (360px+), tablet (768px+), and desktop (1024px+) devices
- **Full Accessibility**: Keyboard navigation, ARIA live regions, semantic HTML, and WCAG 2.1 AA compliance

---

## 🏗️ Project Structure

```
student-finance-app/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # All styles (mobile-first, responsive)
├── scripts/
│   ├── main.js            # Entry point
│   ├── state.js           # State management
│   ├── storage.js         # localStorage operations
│   ├── ui.js              # DOM manipulation and rendering
│   ├── validators.js      # Regex validation logic
│   └── search.js          # Regex search functionality
├── assets/                # Images, icons, and other media
│   ├── profile.jpg
├── tests.html             # Regex validation tests
├── seed.json              # Sample transaction data
└── README.md              # This file
```

---

## 🚀 How to Run

### 🖥️ Live Demo (GitHub Pages)

🔗 **View the Live App Here:** [*Add your GitHub Pages link here*]

### Local Development

1. Clone or download this repository  
   ```bash
   git clone https://github.com/ToluwaniOladeji/Frontend-Web-Dev-Summative-Oladeji-Toluwani.git
   ```
2. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
3. The app will automatically load saved data from localStorage if available

---

## 🧠 Data Model

Each transaction record includes:

```javascript
{
  id: "txn_1",      // Unique identifier
  description: "Lunch at cafeteria",    // Transaction description
  amount: 12.50,                        // Amount (number)
  category: "Food",                     // Category name
  date: "2025-09-25",                   // Date (YYYY-MM-DD)
  createdAt: "2025-09-25T12:00:00Z",   // ISO 8601 timestamp
  updatedAt: "2025-09-25T12:00:00Z"    // ISO 8601 timestamp
}
```

### Default Categories

- Food
- Books
- Transport
- Entertainment
- Fees
- Other

---

## 🔒 Data Persistence

- All data is stored locally in the browser's `localStorage`
- No server-side storage or external APIs
- Data persists across browser sessions
- Export data regularly to prevent loss

### Storage Keys

- `financeApp:transactions` - Transaction records
- `financeApp:settings` - App settings (currency rates, categories)
- `financeApp:budgetCap` - Monthly budget cap

---

## 🎯 Form Validation (Regex)

| Field | Pattern | Description |
|--------|----------|--------------|
| **Description** | `/^\S(?:.*\S)?$/` | No leading/trailing spaces |
| **Amount** | `/^(0|[1-9]\d*)(\.\d{1,2})?$/` | Valid amount with up to 2 decimals |
| **Date** | `/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/` | Valid date format |
| **Category** | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Letters, spaces, and hyphens only |
| **Advanced Rule** | `/\b(\w+)\s+\1\b/` | Detect duplicate words |

---

## 📱 Responsive Design

- Mobile-first, built with Flexbox and Grid
- Three breakpoints: 360px, 768px, 1024px
- Card layout on mobile, table layout on desktop
- Touch-friendly controls (≥44x44px)

---

## ♿ Accessibility Highlights

- Semantic HTML structure with proper heading hierarchy  
- `aria-live` and `role="status"` for updates and form feedback  
- Visible focus indicators for all interactive elements  
- Keyboard-only navigation fully supported  
- High-contrast color palette (WCAG 2.1 AA compliant)

---

## 👨‍💻 Author

**Student Finance App Team**

- GitHub: github.com/ToluwaniOladeji
- Email: t.oladeji@alustudent.com

---

**🕓 Last Updated:** October 2025
