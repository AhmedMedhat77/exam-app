# Exam App 🎓

A modern, high-performance web platform for online exam management, diplomas, and test-taking built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **TanStack React Query**.

---

## 🚀 Features

### 👨‍🎓 User Portal
- **Interactive Exam Player**: Seamless exam-taking interface with step-by-step navigation, timer, and question answer selection.
- **Detailed Submissions & Analytics**: Comprehensive post-exam result breakdowns with summary stats, performance charts, and question-by-question analytics.
- **Diploma Directory**: Browse enrolled and completed diplomas with infinite scrolling.
- **Account & Security Settings**: Manage user profile details, email verification via OTP, and password security.

### 🛡️ Admin Management
- **Diploma Management**: Complete CRUD operations for diplomas including image upload, rich descriptions, immutability toggles, and table filtering.
- **Exam Administration**: Create, filter, sort, and manage exams tied to diplomas.
- **Question & Audit Management**: Structured question setup and audit logging.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Core Framework** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite 8](https://vitejs.dev/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/), [Geist & Inter Fonts](https://fontsource.org/) |
| **State & Data Fetching** | [TanStack React Query v5](https://tanstack.com/query), [Zustand](https://zustand-demo.pmnd.rs/) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Routing** | [React Router v8](https://reactrouter.com/) |
| **Code Quality & Linting** | [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), [Prettier](https://prettier.io/), [React Compiler](https://react.dev/learn/react-compiler) |

---

## 📁 Project Structure

```text
src/
├── app/                  # Application entry points, router, and global providers
├── features/             # Feature-driven modular architecture
│   ├── auth/             # Login, registration, and OTP verification
│   ├── diploma/          # Admin & user diploma management
│   ├── exam/             # Exam creation, listing, and configuration
│   ├── profile/          # User profile settings & security
│   ├── question/         # Exam question player & components
│   ├── submission/       # Exam results, scoring & performance analytics
│   └── user/             # User state and management
└── shared/               # Reusable UI components, hooks, layouts, and utilities
    ├── components/       # Common tables, headers, and filters
    ├── hooks/            # Reusable React hooks
    ├── layouts/          # Dashboard and authentication layouts
    ├── lib/              # Axios instance and core utilities
    └── ui/               # Base UI primitive components
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: `^18.18.0` or `>=20.0.0`
- **Package Manager**: `npm` or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AhmedMedhat77/exam-app.git
   cd exam-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (create a `.env` file in the root):
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with HMR |
| `npm run build` | Runs TypeScript checks and builds the production bundle |
| `npm run preview` | Previews the production build locally |
| `npm run typecheck` | Executes `tsc --noEmit` to verify type safety |
| `npm run lint` | Runs `oxlint` fast linter across the codebase |
| `npm run format` | Formats code with Prettier |
| `npm run format:check` | Verifies code formatting compliance |

---

## 🔒 Code Standards & Quality

This project enforces strict clean code standards:
- **Feature-Based Architecture**: Modular folders containing types, schemas, hooks, services, and components.
- **Type Safety**: Full TypeScript coverage with strict mode enabled.
- **Strict Linting**: Automated checks via Oxlint and Husky pre-commit hooks.
- **React Compiler**: Optimized renders and auto-memoization enabled via `@vitejs/plugin-react` and Babel React Compiler.

---

## 📄 License

This project is private and proprietary.
