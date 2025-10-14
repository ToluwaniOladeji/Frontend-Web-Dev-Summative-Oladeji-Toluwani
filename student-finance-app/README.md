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

### Dashboard Statistics

- Total number of transactions
- Total amount spent
- Top spending category
- Last 7 days spending trend
- Category breakdown with visual chart
- Budget cap status with ARIA live announcements

### Data Management

- Auto-save to localStorage
- JSON import/export with structure validation
- Clear all data with confirmation
- Currency rate configuration

## 📋 Regex Catalog

### Validation Patterns

| Pattern | Regex | Purpose | Example |
|---------|-------|---------|---------|
| **Description** | `/^\S(?:.*\S)?$/` | No leading/trailing spaces, no double spaces | `"Lunch at cafeteria"` ✓ |
| **Amount** | `/^(0\|[1-9]\d*)(\.\d{1,2})?$/` | Positive number with up to 2 decimals | `"12.50"` ✓ |
| **Date** | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | YYYY-MM-DD format | `"2025-10-12"` ✓ |
| **Category** | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Letters, spaces, hyphens | `"Food"` ✓ |

### Advanced Patterns (with lookahead/back-reference)

| Pattern | Regex | Purpose | Example |
|---------|-------|---------|---------|
| **Duplicate Words** | `/\b(\w+)\s+\1\b/i` | Detect repeated words (back-reference) | `"the the"` matches |
| **Has Cents** | `/\.\d{2}\b/` | Check for cents in amount (lookahead) | `"12.50"` matches |
| **Beverage Keywords** | `/(coffee\|tea\|juice\|soda\|water)/i` | Find beverage-related transactions | `"Morning coffee"` matches |

### Search Examples

- **Find coffee or tea purchases**: `coffee|tea`
- **Find amounts with cents**: `\.\d{2}\b`
- **Find transactions in September**: `2025-09`
- **Case-sensitive search**: Uncheck "Case Insensitive" option
- **Find specific category**: `^Food$` (exact match)

## ⌨️ Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next interactive element |
| `Shift + Tab` | Move to previous interactive element |
| `Enter` | Activate buttons and links |
| `Space` | Toggle checkboxes |
| `Escape` | Cancel editing mode (when in form) |

### Navigation Flow

1. Use `Tab` to navigate through the header navigation links
2. Press `Enter` to switch between sections (Dashboard, Records, Add Transaction, Settings, About)
3. Within each section, `Tab` through form fields, buttons, and interactive elements
4. All interactive elements have visible focus indicators

## ♿ Accessibility Features

### Semantic HTML

- Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Heading hierarchy (`<h1>` to `<h4>`)
- Semantic form elements with associated `<label>` tags
- Skip-to-content link for keyboard users

### ARIA Attributes

- `aria-label` for navigation and ambiguous elements
- `role="status"` and `aria-live="polite"` for non-critical updates
- `aria-live="assertive"` for budget cap exceeded alerts
- `role="alert"` for form validation errors
- `aria-describedby` for form field help text

### Visual Accessibility

- **Color Contrast**: All text meets WCAG 2.1 AA standards (4.5:1 for normal text)
- **Focus Indicators**: Visible 2px outline on all focusable elements
- **Text Sizing**: Responsive font sizes, minimum 16px base
- **Interactive Targets**: Minimum 44x44px touch targets on mobile

### Screen Reader Support

- Descriptive labels for all form inputs
- Status messages announced via ARIA live regions
- Table headers properly associated with data cells
- Alternative text for visual information

## 🎨 Responsive Design

### Breakpoints

- **Small (360px+)**: Mobile devices, 2-column stats grid
- **Medium (768px+)**: Tablets, 4-column stats grid, table view for records
- **Large (1024px+)**: Desktops, enhanced spacing and typography

### Mobile-First Approach

- Base styles designed for mobile devices
- Progressive enhancement for larger screens
- Card-based layout on mobile, table layout on desktop
- Touch-friendly button sizes (minimum 44x44px)

### Layout Techniques

- **Flexbox**: Navigation, form actions, button groups
- **CSS Grid**: Statistics dashboard, category breakdown
- **Media Queries**: Responsive breakpoints for different screen sizes

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
├── tests.html             # Regex validation tests
├── seed.json              # Sample transaction data
└── README.md              # This file
```

## 🚀 How to Run

### Local Development

1. Clone or download this repository
2. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
3. The app will automatically load from localStorage if data exists

### Running Tests

1. Open `tests.html` in a web browser
2. View automated regex validation tests
3. Check console for detailed test results

### Importing Sample Data

1. Navigate to the Settings section
2. Click "Choose JSON File" under Import Data
3. Select `seed.json` from the project directory
4. Sample transactions will be loaded into the app

## 📊 Data Model

Each transaction record includes:

```javascript
{
  id: "txn_1728123456789_abc123",      // Unique identifier
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

## 🔒 Data Persistence

- All data is stored locally in the browser's `localStorage`
- No server-side storage or external APIs
- Data persists across browser sessions
- Export data regularly to prevent loss

### Storage Keys

- `financeApp:transactions` - Transaction records
- `financeApp:settings` - App settings (currency rates, categories)
- `financeApp:budgetCap` - Monthly budget cap

## 🎯 Form Validation

All form inputs are validated in real-time using regex patterns:

1. **Description**: Validated on blur, checks for proper spacing and duplicate words
2. **Amount**: Validated on blur, ensures positive number with max 2 decimals
3. **Date**: Validated on blur, checks YYYY-MM-DD format and prevents future dates
4. **Category**: Required field, selected from dropdown

Error messages appear below each field with `role="alert"` for screen readers.

## 🔍 Search Functionality

### How to Use

1. Navigate to the Records section
2. Enter a regex pattern in the search field
3. Toggle "Case Insensitive" as needed
4. Matching transactions are highlighted with `<mark>` tags
5. Invalid patterns show error messages

### Error Handling

- Safe regex compilation with try/catch
- Invalid patterns display user-friendly error messages
- Search continues to work with previous valid pattern

## 🎨 Animations & Transitions

- **Navigation hover**: Smooth color transition and upward movement
- **Section switching**: Fade-in animation (0.3s)
- **Card hover**: Subtle shadow and transform effects
- **Button hover**: Color change and elevation
- **Chart bars**: Animated width transitions (0.5s)

## 🌐 Browser Compatibility

Tested and compatible with:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires ES6 module support.

## 📝 Development Notes

### ES Modules

The app uses ES6 modules for code organization:

- Import/export syntax for modularity
- Separate concerns (state, UI, storage, validation, search)
- Easy to test and maintain

### Code Quality

- Consistent naming conventions
- Comprehensive comments
- Error handling throughout
- Input sanitization to prevent XSS

### Performance

- Efficient DOM updates
- Debounced search input
- Minimal reflows and repaints
- LocalStorage for fast data access

## 🐛 Known Limitations

- No server-side backup (data stored locally only)
- Limited to browser's localStorage capacity (~5-10MB)
- No multi-device sync
- Manual currency rate updates (no API integration)

## 🔮 Future Enhancements

- Dark mode toggle
- CSV export functionality
- Offline-first with service workers
- Custom category management
- Recurring transaction templates
- Data visualization charts (pie, line)
- Multi-language support

## 📄 License

This project is created for educational purposes as part of a web development course assignment.

## 👨‍💻 Author

Student Finance App Team

- **GitHub**: [github.com/student-finance-app](https://github.com/student-finance-app)
- **Email**: contact@studentfinance.app

## 🙏 Acknowledgments

- Assignment requirements from the course instructor
- Web accessibility guidelines from W3C WAI
- MDN Web Docs for regex and JavaScript references

---

**Last Updated**: October 2025

