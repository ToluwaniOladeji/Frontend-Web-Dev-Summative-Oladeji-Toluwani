# Student Finance Tracker

A comprehensive, accessible, and responsive web application for students to manage their finances effectively. Built with vanilla HTML, CSS, and JavaScript following modern web development best practices.

## 🎯 Chosen Theme

**Student Finance Tracker** - Track budgets, transactions, and spending patterns with advanced search capabilities.

---

## 🧩 Wireframes

### 🖥️ Desktop Wireframe

```
-----------------------------------------------------------------------------------
| Header (navbar + profile)                                                      |
| ┌──────────────────────┐  ┌──────────────────────────┐  ┌──────┐              |
| | [Profile Picture]    |  | “Tolu’s Finance Tracker” |  | Nav |              |
| └──────────────────────┘  └──────────────────────────┘  └──────┘              |
-----------------------------------------------------------------------------------
| Main Content Area                                                              |
| ┌──────────────────────────────┐ ┌───────────────────────────────┐           |
| | Dashboard Pane                | | Side / Secondary Pane (e.g.,    |           |
| | • Total Transactions          | | Stats sidebar, graph, alerts)   |           |
| | • Total Spent                 | |                                 |           |
| | • Top Category                | |                                 |           |
| | • Last 7 Days                 | |                                 |           |
| | • Monthly Cap / Alert         | |                                 |           |
| └──────────────────────────────┘ └───────────────────────────────┘           |
|                                                                              |
| ┌──────────────┬──────────────┬───────────────┬──────────────┬───────────┐   |
| | Search /     | Sort Controls| Records Table /| Pagination /| Actions /  |   |
| | Regex Input  | (Date / Desc | Cards (on mobile)| Controls   | Buttons   |   |
| | [input]      | / Amount)     |               |             |           |   |
| └──────────────┴──────────────┴───────────────┴──────────────┴───────────┘   |
|                                                                              |
| Section: Add / Edit Transaction Form                                         |
| ┌───────────────────────────────────────────────────────────────┐          |
| | Description / Amount / Category / Date input fields + buttons         |    |
| └───────────────────────────────────────────────────────────────┘          |
|                                                                              |
| Section: Settings / Import / Export                                        |
| ┌───────────────────────────────────────────────────────────────┐          |
| | Currency settings, import JSON, export button, clear data         |      |
| └───────────────────────────────────────────────────────────────┘          |
|                                                                              |
| Section: About / Footer                                                     |
| ┌───────────────────────────────────────────────────────────────┐          |
| | Purpose, features list, contact info, keyboard navigation guide |       |
| └───────────────────────────────────────────────────────────────┘          |
-----------------------------------------------------------------------------------
```

### 📱 Mobile Wireframe

```
-----------------------------------------------------
| [👤] Tolu's Finance Tracker                       |

▼ Dashboard
-----------------------------------------------------
| TOTAL TRANSACTIONS    | TOTAL SPENT               |
|          12            |        $1617.83          |
-----------------------------------------------------
| TOP CATEGORY           | LAST 7 DAYS              |
| Fees                   |        $186.09           |
-----------------------------------------------------

▼ Records
-----------------------------------------------------
| Search [__________] 🔍                            |
|---------------------------------------------------|
| Description         | Amount   | Category | Date  |
| Lunch at cafeteria  | $12.50   | Food     | 9/25  |
| Textbook            | $89.99   | Books    | 9/23  |
-----------------------------------------------------

▼ Add Transaction
-----------------------------------------------------
| Description: [___________]                        |
| Amount: [___________]                             |
| Category: [Select ▼]                              |
| Date: [YYYY-MM-DD]                                |
| [Add Transaction ✅]                              |
-----------------------------------------------------

▼ Settings
-----------------------------------------------------
| Base Currency: [USD ▼]                            |
| Conversion Rate: [____]                           |
| Theme: [Light/Dark ▼]                             |
| [Save ⚙️]                                         |
-----------------------------------------------------

▼ About
-----------------------------------------------------
| Purpose: Track your daily expenses easily.        |
| Contact: [GitHub] [Email]                         |
-----------------------------------------------------

-----------------------------------------------------
| © 2025 Tolu Oladeji — All Rights Reserved          |
-----------------------------------------------------
```

---

## 🌟 Features

### Core Features

* **Transaction Management**: Add, edit, and delete financial transactions with detailed categorization
* **Advanced Regex Search**: Search and filter transactions using regex patterns with real-time highlighting
* **Budget Tracking**: Set monthly budget caps and receive alerts when approaching or exceeding limits
* **Data Visualization**: View spending trends and category breakdowns on an interactive dashboard
* **Multi-Currency Support**: Configure exchange rates for EUR and GBP
* **Data Portability**: Import and export transaction data in JSON format with validation
* **Responsive Design**: Optimized for mobile (360px+), tablet (768px+), and desktop (1024px+) devices
* **Full Accessibility**: Keyboard navigation, ARIA live regions, semantic HTML, and WCAG 2.1 AA compliance

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

🔗 **View the Live App Here:** [https://toluwanioladeji.github.io/Frontend-Web-Dev-Summative-Oladeji-Toluwani/](https://toluwanioladeji.github.io/Frontend-Web-Dev-Summative-Oladeji-Toluwani/)

### Local Development

1. Clone or download this repository

   ```bash
   git clone https://github.com/ToluwaniOladeji/Frontend-Web-Dev-Summative-Oladeji-Toluwani.git
   ```
2. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
3. The app will automatically load saved data from localStorage if available

---

## 🎥 Demo Video

Watch a short walkthrough demonstrating the app’s navigation, keyboard flow, regex edge cases, import/export functionality, and responsive design.

🔗 **Demo Video Link:** https://youtu.be/4HnRxgu5kYw?si=uE--7-KX13iHXpWr

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

* Food
* Books
* Transport
* Entertainment
* Fees
* Other

---

## 🔒 Data Persistence

* All data is stored locally in the browser's `localStorage`
* No server-side storage or external APIs
* Data persists across browser sessions
* Export data regularly to prevent loss

### Storage Keys

* `financeApp:transactions` - Transaction records
* `financeApp:settings` - App settings (currency rates, categories)
* `financeApp:budgetCap` - Monthly budget cap

---

## 🎯 Form Validation (Regex)

| Field             | Pattern                           | Description                       |                                    |           |                   |
| ----------------- | --------------------------------- | --------------------------------- | ---------------------------------- | --------- | ----------------- |
| **Description**   | `/^\S(?:.*\S)?$/`                 | No leading/trailing spaces        |                                    |           |                   |
| **Amount**        | `/^(0                             | [1-9]\d*)(.\d{1,2})?$/`           | Valid amount with up to 2 decimals |           |                   |
| **Date**          | `/^\d{4}-(0[1-9]                  | 1[0-2])-(0[1-9]                   | [12]\d                             | 3[01])$/` | Valid date format |
| **Category**      | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Letters, spaces, and hyphens only |                                    |           |                   |
| **Advanced Rule** | `/\b(\w+)\s+\1\b/`                | Detect duplicate words            |                                    |           |                   |

---

## 📱 Responsive Design

* Mobile-first, built with Flexbox and Grid
* Three breakpoints: 360px, 768px, 1024px
* Card layout on mobile, table layout on desktop
* Touch-friendly controls (≥44x44px)

---

## ♿ Accessibility Highlights

* Semantic HTML structure with proper heading hierarchy
* `aria-live` and `role="status"` for updates and form feedback
* Visible focus indicators for all interactive elements
* Keyboard-only navigation fully supported
* High-contrast color palette (WCAG 2.1 AA compliant)

---

## 👨‍💻 Author

**Student Finance App Team**

* GitHub: github.com/ToluwaniOladeji
* Email: [t.oladeji@alustudent.com](mailto:t.oladeji@alustudent.com)

---

**🕓 Last Updated:** October 2025
