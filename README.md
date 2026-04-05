# FinTrack — Finance Dashboard

A clean, interactive finance dashboard built with React + MUI for tracking income, expenses, and spending patterns.

---

## 🚀 Live Demo
> https://glittery-monstera-b16527.netlify.app/

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework |
| Material UI (MUI) | UI components |
| Recharts | Data visualization |
| React Router DOM | Navigation |
| Framer Motion | Animations |
| Context API | State management |
| LocalStorage | Data persistence |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

1. Clone the repository
```bash
git clone https://github.com/dhruv5513/finance-dashboard.git
```

2. Navigate to project folder
```bash
cd finance-dashboard
```

3. Install dependencies
```bash
npm install
```

4. Start development server
```bash
npm run dev
```

5. Open browser and visit

http://localhost:5173

---

## 📁 Project Structure

src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         # Top navbar with role switcher + dark mode
│   │   └── Sidebar.jsx        # Navigation sidebar
│   ├── dashboard/
│   │   ├── SummaryCards.jsx   # Balance, Income, Expense cards
│   │   ├── BalanceTrendChart.jsx  # Line chart - monthly trend
│   │   └── SpendingChart.jsx  # Pie chart - category breakdown
│   ├── transactions/
│   │   ├── TransactionList.jsx    # Transactions table
│   │   ├── TransactionFilter.jsx  # Search, filter, advanced filters
│   │   ├── AddTransactionModal.jsx # Add/Edit modal
│   │   └── ExportButton.jsx       # CSV/JSON export
│   └── insights/
│       └── InsightsPanel.jsx  # Spending insights + savings rate
├── context/
│   └── AppContext.jsx         # Global state management
├── data/
│   └── mockData.js            # 50 mock transactions
├── pages/
│   ├── DashboardPage.jsx
│   ├── TransactionsPage.jsx
│   └── InsightsPage.jsx
├── hooks/
│   └── useTransactions.js     # Custom hook
└── utils/
└── helpers.js             # Currency, date formatters

---

## ✨ Features

### 1. Dashboard Overview
- Total Balance, Income, Expenses summary cards
- Balance Trend line chart (monthly)
- Spending Breakdown pie chart (by category)

### 2. Transactions Section
- View all 50 transactions in a clean table
- Search by description or category
- Filter by type (Income/Expense)
- Advanced filters — date range, amount range, category
- Export transactions as CSV or JSON

### 3. Role Based UI (RBAC)
| Feature | Viewer | Admin |
|---|---|---|
| View transactions | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |
| Export data | ✅ | ✅ |

> Switch roles using the dropdown in the top navbar

### 4. Insights Section
- Top spending category
- Monthly expense comparison
- Savings rate per month (with progress bars)
- Category wise expense breakdown

### 5. Optional Enhancements
- 🌙 Dark mode toggle
- 💾 Data persistence via LocalStorage
- 📤 Export as CSV / JSON
- ✨ Framer Motion animations
- 🔍 Advanced filtering (date, amount, category)

---

## 🗃️ State Management

Global state is managed using **React Context API** (`AppContext.jsx`):

AppContext
├── transactions        # All transaction data
├── filteredTransactions # Filtered based on search/filters
├── role               # "viewer" or "admin"
├── filter             # "all", "income", "expense"
├── searchQuery        # Search input value
├── selectedCategory   # Category filter
├── dateFrom / dateTo  # Date range filter
├── amountMin / amountMax # Amount range filter
├── darkMode           # UI theme
└── CRUD operations    # add, edit, delete

**Why Context API?**
- Lightweight — no extra libraries needed
- Perfect for this scale of application
- Easy to understand and maintain

---

## 🎨 Design Decisions

- **MUI** for consistent, accessible components
- **Dark mode** for better user experience
- **Animated background** (blobs + particles + grid) for visual appeal
- **Role based UI** clearly shows different permissions
- **Framer Motion** for smooth page load animations
- **Color coded** categories and transaction types for quick scanning

---

## 📝 Assumptions

- Mock data used instead of real API (50 transactions across 4 months)
- Roles are simulated on frontend only (no backend auth)
- LocalStorage used for data persistence across page refreshes

---

## 👨‍💻 Author

**Dhurav**
Frontend Developer Intern Candidate
Zorvyn FinTech Pvt. Ltd. Assessment