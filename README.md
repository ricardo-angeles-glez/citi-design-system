Markdown
## 🌐 Live

| | URL |
|--|--|
| **Dashboard** | https://citi-design-system.vercel.app |
| **Storybook** | https://citi-ds-storybook.vercel.app |

<div align="center">

# ┌ citi Design System

**React + TypeScript component library for Citi Mexico digital products**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tests](https://img.shields.io/badge/Tests-62%20passing-00823B?logo=vitest&logoColor=white)](https://vitest.dev)
[![License](https://img.shields.io/badge/License-Private-E3173E)](./LICENSE)

[Dashboard](#-dashboard) · [Components](#-components) · [Quick Start](#-quick-start) · [Architecture](#-architecture)

</div>

---

## 📋 Overview

The Citi Design System is a centralized component library that provides documented React components, design tokens as CSS custom properties, and an interactive dashboard serving as the single source of truth for designers and developers.

### Key Features

- **18 Components** — Atoms, Components, Patterns & Banking-specific
- **100+ Design Tokens** — Colors, Typography, Spacing, Shadows, Transitions
- **Dark Mode** — Full theme support via CSS Custom Properties
- **i18n (ES/EN)** — Complete internationalization with i18next
- **WCAG AA** — Accessible components with focus management, ARIA labels, keyboard navigation
- **62 Unit Tests** — Vitest + React Testing Library
- **Interactive Dashboard** — Live documentation with code examples
- **Demo App** — Citi mobile app replica built with the design system

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/your-username/citi-design-system.git
cd citi-design-system
npm install
Development
Bash

# Start development server
npm run dev

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Start Storybook
npm run storybook

# Build for production
npm run build
📦 Components
Atoms — Fundamental building blocks
Component	Variants	Description
Button	primary secondary ghost danger	3 sizes, loading state, full-width
Input	default error disabled password	Label, error message, validation
Badge	nuevo beneficios promo active warning error	Semantic status indicators
Avatar	teal red gray	3 sizes, initials-based
Card	default outlined + 3 elevations	Content container with title & footer
Components — Composite elements
Component	Description
ListItem	Transaction row with icon, title, amount, badge
ProductCard	Banking product card with expandable sub-accounts
AppHeader	Mobile app header with avatar and navigation
Modal	Dialog with focus trap, 3 variants (default/danger/success)
Toast	Auto-dismiss notifications, 4 variants
Skeleton	Loading states with shimmer (text, circle, rect, card)
EmptyState	Empty states with icon, title, action
CardVisual	Banking card visual with chip and gradient
Banking — Specialized financial components
Component	Description
OTPInput	Verification code with auto-advance and paste support
PINPad	Numeric keypad with progress animation
CurrencyInput	Currency formatting (MXN/USD) with keypad
SpendingChart	Bar, Line & Sparkline charts with Recharts
🎨 Design Tokens
All tokens are CSS Custom Properties defined in :root with dark mode overrides in [data-theme="dark"].

CSS

/* Colors */
--color-primary-500: #003B5C;      /* Citi Blue */
--color-accent-500: #E3173E;       /* Citi Red */
--color-success-500: #00823B;
--color-warning-500: #F5A623;
--color-error-500: #E3173E;

/* Typography */
--font-display: "BanamexDisplay", Georgia, serif;
--font-size-md: 13px;
--font-weight-semibold: 600;

/* Spacing (4px base) */
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;

/* Semantic Surfaces */
--surface-bg: #FFFFFF;              /* → #0D1117 in dark */
--surface-elevated: #FFFFFF;        /* → #1C2128 in dark */
--text-primary: #1A1A1A;            /* → #E6EDF3 in dark */
--interactive-primary: #003B5C;     /* → #58A6FF in dark */
🖥 Dashboard
The interactive dashboard serves as living documentation:

Section	Content
Overview	Hero, stats, component gallery, design principles, changelog
Foundations	Colors, Typography, Spacing, Borders, Shadows, Transitions
Atoms	Button, Input, Badge, Avatar, Card — with live demos
Components	ListItem, ProductCard, Modal, Toast, Skeleton, EmptyState
Banking	OTP Input, PIN Pad, Currency Input, Spending Chart
System	Accessibility (WCAG AA), Dark Mode, Internationalization
Demo App	Full Citi mobile app replica
Dark Mode
Toggle between light and dark themes. All components adapt automatically via semantic CSS custom properties.

Internationalization
Full Spanish (MX) and English (US) support with 198+ translation keys. Switch languages instantly from the topbar.

🏗 Architecture
text

citi-design-system/
├── public/fonts/                 # BanamexDisplay TTF
├── src/
│   ├── components/               # All UI components
│   │   ├── Button/               # Button.tsx, Button.css, Button.test.tsx, index.ts
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Toast/
│   │   ├── Skeleton/
│   │   ├── OTPInput/
│   │   ├── PINPad/
│   │   ├── CurrencyInput/
│   │   ├── Chart/
│   │   └── ...
│   ├── dashboard/                # Dashboard app
│   │   ├── sections/             # Overview, Atoms, Components, System
│   │   ├── DashboardApp.tsx
│   │   └── Sidebar.tsx
│   ├── data/                     # Mock data (mockData.ts)
│   ├── i18n/                     # i18next config + locales
│   │   ├── locales/es.json
│   │   ├── locales/en.json
│   │   └── index.ts
│   ├── pages/                    # Demo App
│   ├── styles/                   # Global CSS + tokens
│   ├── test/                     # Test setup
│   └── tokens/                   # TypeScript token exports
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
Design Principles
Single source of truth — CSS custom properties are the only source of visual values
Atomic Design — Atoms → Components → Patterns → Pages
TypeScript strict — All props typed with exported interfaces
BEM naming — .citi-button__content--loading
Zero external UI deps — No Material UI, Ant Design, or Chakra
Tree-shakeable — Each component exported individually
🧪 Testing
Bash

# Run all unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
Suite	Tests	Status
Button	10	✅
Input	9	✅
Badge	6	✅
Avatar	6	✅
Card	7	✅
Modal	15	✅
Toast	9	✅
Total	62	✅ All passing
♿ Accessibility
All components meet WCAG AA standards:

✅ Color contrast ratios ≥ 4.5:1 for text
✅ Visible focus indicators on all interactive elements
✅ ARIA labels on modals, toasts, inputs, buttons
✅ Full keyboard navigation (Tab, Enter, Escape)
✅ prefers-reduced-motion support
✅ Semantic HTML with proper roles
✅ Error messages with aria-describedby
✅ Touch targets ≥ 44x44px
🛠 Tech Stack
Technology	Version	Purpose
React	19.x	UI framework
TypeScript	5.9	Static typing
Vite	7.x	Build tool & dev server
Vitest	4.x	Unit testing
React Testing Library	16.x	Component testing
Framer Motion	11.x	Animations
i18next	23.x	Internationalization
Recharts	2.x	Charts
Lucide React	0.577	Icons
Storybook	10.x	Component documentation
🤖 AI-Assisted Development
This system was built using an AI-assisted development methodology where the developer acts as product director and solution architect, while LLMs execute the technical implementation. This demonstrates that production-quality component libraries can be built using AI as a development accelerator while maintaining professional standards for code, documentation, and architecture.

📄 License
Private — Ricardo Angeles for CitiMexico

<div align="center">
Built with ❤️ for Citi Mexico

React 19 · TypeScript 5.9 · Vite 7 · 62 Tests · 18 Components · 100+ Tokens

</div> ```