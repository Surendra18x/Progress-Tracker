# Roadmap Tracker - Technical Guidelines

## 🏗️ Architecture
The project follows a modular, mobile-first React architecture with PWA support and dynamic theme switching.

### Key Components
- **RoadMap (`src/components/RoadMap`):** 
  - Dual-mode visualization: Horizontal SVG journey for desktop, Vertical milestone path for mobile.
  - Dark mode aware SVG gradients and filter effects.
- **Task Management:** 
  - `TaskForm`, `TaskList`, and `TaskItem` utilize responsive Tailwind grid and flex layouts with full dark mode support.
- **Theme System:**
  - Integrated Dark/Light mode using Tailwind's `dark:` classes and document root persistence.
  - Automatic system preference detection.

## 🎨 Design System
- **Theme:** Indigo (#6366f1) primary with Purple and Pink accents. Optimized contrast for both Light and Dark modes.
- **Styling:** Tailwind CSS v4 utility classes.
- **Aesthetic:** Modern Glassmorphism with adaptive backgrounds (white/80 in light, slate-900/80 in dark).
- **Typography:** High-contrast headings with wide-tracked uppercase labels for a "Mission Control" feel.

## 🛠️ Workflows
- **Linting:** Run `npm run lint` regularly. The project is configured with strict rules for React Hooks and unused variables.
- **Animations:** When modifying `RoadMap.jsx`, ensure the `Motion.path` and avatar `Motion.div` remain synchronized.
- **Celebrations:** `canvas-confetti` is triggered in the `useEffect` of `RoadMap.jsx` when all tasks are marked as completed.

## 📦 Dependencies
- `framer-motion`: Complex SVG and layout animations.
- `canvas-confetti`: Celebration effects.
- `lucide-react`: Modern iconography.
- `react-router-dom`: SPA routing.
