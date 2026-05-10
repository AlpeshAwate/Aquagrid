# AquaGrid - Water Intelligence Platform

AquaGrid is a React-based water intelligence platform for public water visibility, enterprise asset monitoring, digital-twin workflows, marketplace activity, and compliance views.

## Tech Stack

- React 19
- Vite 7
- TypeScript
- Tailwind CSS 3
- React Router
- Zustand
- Lucide React
- Cesium
- Recharts

## Active App Path

The active browser entry path is:

```text
index.html -> src/main.tsx -> src/App.tsx
```

Older JSX files such as `src/main.jsx` and `src/App.jsx` are not referenced by `index.html` and should be treated as legacy unless they are intentionally reconnected.

## Project Structure

```text
src/
  components/   Reusable UI and feature components
  pages/        Routed application pages
  stores/       Zustand state stores
  services/     API and integration services
  hooks/        Shared React hooks
  utils/        Helper and translation utilities
  types/        Shared TypeScript types
  __tests__/    Vitest tests and setup
```

## Setup

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm test
npm run test:coverage
```

## Environment

Create a local `.env` file from `.env.example` when API or WebSocket endpoints need to be customized.

```env
VITE_API_BASE=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
VITE_GA_ID=G-XXXXXXXXXX
VITE_ENABLE_AR=true
VITE_ENABLE_MARKET=true
```

## Routes

- `/` - public water intelligence page
- `/global-twin` - public global twin view
- `/login` - sign-in page
- `/dashboard` - protected enterprise dashboard
- `/assets` - protected asset view
- `/digital-twin` - protected digital twin view
- `/marketplace` - protected marketplace view
- `/compliance` - protected compliance view
- `/settings` - protected settings view

## Notes

- `dist/`, `node_modules/`, logs, local env files, and build artifacts should remain untracked.
- The app includes mock fallback data in the service layer so screens can render when backend APIs are unavailable.
- The active app path is TypeScript-first; new routed work should generally use `tsx` unless there is a specific reason to add JSX.
