# 💰 Spendle — Personal Finance Tracker

> **React · Chart.js · Bootstrap · Context API · Vite**

A smart, modern personal expense tracker built for real-world use — and resume-ready.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Login / Logout** | Session persisted across refresh via localStorage |
| **Stat Cards** | Live Income, Expense, Balance, Top Category |
| **Monthly Budget** | Set a limit — progress bar turns amber at 80%, red at 100% |
| **Budget Alerts** | Warning + exceeded banners auto-shown |
| **Dual Charts** | Toggle: Monthly Bar (income vs expense) ↔ Category Doughnut |
| **Add Transactions** | Income / Expense toggle, 8 categories, date picker |
| **Transaction History** | Search · Filter by tag · Sort by date / amount |
| **Smart Suggestions** | Detects high-spend categories + savings rate tips |
| **Recurring Templates** | One-tap log: Rent, EMI, Netflix, Salary, and more |
| **CSV Export** | Download all transactions as a spreadsheet |
| **Dark / Light Mode** | Smooth toggle, theme persisted to localStorage |
| **Error Boundary** | Graceful crash protection with reload prompt |
| **Responsive** | Mobile-first layout, works on all screen sizes |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| React Bootstrap 2 | Responsive component library |
| Chart.js 4 + react-chartjs-2 | Bar & Doughnut analytics charts |
| Context API + useReducer | Global state management |
| Custom Hook (`useTransactions`) | Centralised derived state |
| API Layer (`transactionApi.js`) | Supabase-ready abstraction |
| Export Utils | CSV download, summary text |
| Vite 6 | Dev server & build tool |
| localStorage | Zero-backend data persistence |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/spendle.git
cd spendle

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) and sign in with any email + password.

---

## 📁 Project Structure

```
src/
 ├── api/
 │   └── transactionApi.js        # Supabase-ready API abstraction
 ├── components/
 │   ├── AppNavbar.jsx             # Sticky nav with dark/light toggle
 │   ├── AccountSummary.jsx        # Stat cards + monthly budget panel
 │   ├── MonthlyChart.jsx          # Bar / Doughnut chart toggle
 │   ├── AddExpenseForm.jsx        # Income / Expense form
 │   ├── HistoryList.jsx           # Search, filter, sort, CSV export
 │   ├── SmartSuggestions.jsx      # Personalised spending tips
 │   ├── RecurringExpenses.jsx     # One-tap recurring templates
 │   ├── Loginpage.jsx             # Login screen
 │   └── ErrorBoundary.jsx         # Crash protection
 ├── context/
 │   ├── TransactionContext.jsx    # Transactions + budget global state
 │   └── ThemeContext.jsx          # Dark / light theme state
 ├── hooks/
 │   └── useTransactions.js        # Custom hook — derived computations
 ├── utils/
 │   └── exportUtils.js            # CSV + text export helpers
 ├── App.jsx                       # Landing page + routing
 ├── main.jsx                      # Entry point + providers
 └── index.css                     # All styles with CSS variables + dark mode
```

---

## 🔐 Backend Integration (Planned)

The `src/api/transactionApi.js` file is a drop-in abstraction layer. To connect Supabase:

```js
// src/api/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Then in transactionApi.js — swap localStorage for:
export const getTransactions = async () => {
  const { data } = await supabase.from('transactions').select('*');
  return data;
};
```

No component changes needed — just swap the API layer.

---

## 🧠 Key Concepts Demonstrated

- **React Context + useReducer** for scalable state management
- **Custom hooks** for separating business logic from UI
- **API abstraction pattern** for easy backend migration
- **Component composition** with clear single responsibilities
- **CSS custom properties** for complete dark/light theming
- **Error Boundary** for production-grade crash handling
- **Controlled forms** with validation
- **Chart.js integration** with react-chartjs-2

---

## 📌 Roadmap

- [ ] Supabase Auth + database integration
- [ ] PDF export (jsPDF)
- [ ] Monthly comparison reports
- [ ] Recurring expense auto-scheduling
- [ ] PWA support (offline-first)

---

*Built with ❤️ · React + Vite · Resume Project 2026*
