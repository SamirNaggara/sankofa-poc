# Sankofa POC

## Purpose
Sankofa is a travel startup connecting content creators with their fans through curated travel experiences. This is a **POC for investors** — no backend, all data is simulated/fake. The UI must feel premium, fluid, and impressive. Visual polish is paramount.

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Lint code

## Stack
- React 19 + Vite 8
- Tailwind CSS v4 (CSS-first config — NO `tailwind.config.js`, everything in `@theme` block)
- Framer Motion (animations & transitions)
- Recharts (dashboard charts)
- Lucide-react (icons)

## Design System
Defined in `src/index.css` `@theme` block:
- **Colors**: Primary amber/or, secondary terracotta, accent teal, cream backgrounds, charcoal text
- **Fonts**: Inter (body), Playfair Display (headings)

## Architecture
- `useState`-based routing in `App.jsx` with `AnimatePresence` for page transitions
- `navigate()` function passed via prop drilling (no router library, no global state)
- **Two user flows**:
  - Creator: onboarding → dashboard → editor/results
  - Traveler: profile + coming-soon placeholder

## Key Patterns
- `PageTransition` wrapper component for route animations
- Stagger variants for list animations
- `whileHover` / `whileTap` micro-interactions everywhere
- All Recharts charts wrapped in `ResponsiveContainer`

## Auto-Fill Demo Behavior (Critical for Investor Demo)
Forms fill themselves automatically to create a "wow effect":
- `simulateTyping` — typewriter effect, character by character
- `simulateSelection` — sequential checkbox/option picking
- Located in `src/hooks/useSimulateTyping.js`
- The Onboarding flow is fully scripted: fields auto-fill, steps auto-advance, then navigates to dashboard
- This demo behavior is central to the investor pitch

## Conventions
- **French language** UI (all user-facing text in French)
- No TypeScript
- No router library (useState routing only)
- No global state management
- All mock data lives in `src/data/fakeData.js`
- **Tailwind v4 CSS-first**: never create `tailwind.config.js`
