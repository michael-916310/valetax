# 💱 Currency Converter

## ✨ Features

- 🌍 **30+ Currencies** - Support for major world currencies
- 💱 **Real-time Conversion** - Instant calculations as you type
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 💾 **Offline Support** - Cached rates work without internet
- 🔄 **Manual Refresh** - Update rates on demand
- 💫 **Smart Persistence** - Remembers your last conversion
- ⌨️ **Keyboard Navigation** - Full keyboard support in modals
- 🎨 **Modern UI** - Built with Ant Design components
- ⚡ **Performance** - Optimized with React.memo & lazy loading
- 🔍 **Search Currencies** - Quick filter in currency selector

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.2.0 + TypeScript 5.2.2
- **State Management:** Redux Toolkit 2.9.1 + RTK Query
- **UI Library:** Ant Design 5.27.6
- **Routing:** React Router DOM 6.17.0
- **Build Tool:** Webpack 5.89.0
- **Code Quality:** ESLint + Prettier + TypeScript

## 📋 Setup Requirements

### System Requirements:

- Node.js >= 16.x
- npm >= 8.x (or yarn >= 1.22.x)

### Installation:

```bash
# Clone the repository
git clone https://github.com/michael-916310/valetax.git
cd valetax

# Install dependencies
npm install
```

## 🚀 How to Run

### Development:

```bash
npm start
# or
npm run start:dev
```

### Production Build:

```bash
npm run build:dev
```

### Code Quality:

```bash
# TypeScript linting
npm run lint:ts
npm run lint:ts:fix

# SCSS linting
npm run lint:scss
npm run lint:scss:fix

# Format code
npm run format
npm run format:check
```

## 🏗️ Project Architecture

### Folder Structure:

```
src/
├── app/                    # Application initialization & providers
│   ├── providers/
│   │   ├── StoreProvider/  # Redux store configuration
│   │   └── router/         # React Router setup
│   └── App.tsx
├── pages/                  # Page components (lazy loaded)
│   ├── main/
│   └── not-found/
├── feature/                # Feature modules
│   ├── convertionPanel/    # Currency conversion feature
│   │   ├── ui/
│   │   │   ├── enterData/
│   │   │   ├── conversionResult/
│   │   │   └── convertionPanel.tsx
│   └── infoBar/            # Rates status & refresh
├── entities/               # Business entities
│   └── rates/              # Exchange rates entity
│       ├── model/          # State, selectors, types
│       └── api/
├── shared/                 # Shared resources
│   ├── api/                # API clients (RTK Query)
│   ├── ui/                 # Reusable UI components
│   ├── constants/          # Static data (currencies)
│   └── utils/              # Utility functions
└── index.tsx
```

### Architecture Principles:

- **Feature-Sliced Design (FSD)** inspired structure
- **Separation of Concerns:** Pages → Features → Entities → Shared

## 🔧 Key Technical Decisions

### API Choice: VATComply Free API

**Why VATComply?**

- ✅ Free, no API key required
- ✅ Reliable uptime
- ✅ EUR-based rates with 30+ currencies
- ✅ Simple JSON format
- ✅ CORS-enabled

**Endpoint:** `https://api.vatcomply.com/rates`

**Response Format:**

```json
{
  "date": "2025-10-22",
  "base": "EUR",
  "rates": {
    "USD": 1.1587,
    "GBP": 0.8689,
    ...
  }
}
```

### Caching Strategy

**Two-Level Caching:**

1. **Redux State (Runtime)**
   - Stores current rates in Redux
   - Fast access for calculations
   - Cleared on page refresh

2. **LocalStorage (Persistent)**
   - Saves last successful rates
   - Fallback when API fails
   - Survives page reloads
   - Auto-cleanup on stale data

**Implementation:**

- RTK Query handles API calls with automatic caching
- Middleware persists successful responses to localStorage
- Smart selector returns cached data on API errors
- User settings (currency pair, amount) saved separately

### Data Formatting & Validation

**Currency Formatting:**

- Amounts: 2 decimal places (e.g., $123.45)
- Exchange rates: 6 decimal places (e.g., 1.123456)
- Native symbols from currency database (€, $, £, etc.)

**Input Validation:**

- Debounced input (500ms) for performance
- Accepts both comma and dot as decimal separator
- Real-time blocking of non-numeric characters
- Min value: 0, Max precision: 2 decimals

**Date/Time:**

- LocaleString format for user's timezone
- Displays last update timestamp
- Shows "cached" indicator when using fallback data

### Performance Optimizations

**React Optimizations:**

- ✅ React.memo on heavy components
- ✅ useCallback for event handlers
- ✅ useMemo for expensive computations
- ✅ Lazy loading for CurrencySelectModal
- ✅ Code splitting for pages

**Bundle Optimizations:**

- Webpack code splitting
- Tree shaking
- Minification in production
- Lazy imports reduce initial load
