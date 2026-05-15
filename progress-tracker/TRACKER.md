# 🚀 Progress Tracker PWA — Master Development Plan
> A comprehensive blueprint for Gemini CLI to build a production-ready React PWA

---

## 📌 Project Overview

**App Name:** DayForge (or rename as preferred)
**Stack:** React 18 + Vite, TailwindCSS, Framer Motion, PWA (Vite PWA Plugin)
**Target:** Mobile-first Progressive Web App
**State:** Zustand (simple, scalable) + localStorage persistence
**Routing:** React Router v6

---

## 🗂️ Full Feature Set

### 1. Daily Tasks & Progress (Enhanced)
- Add daily tasks with estimated time/effort (Low / Medium / High)
- Mark tasks as complete, partial, or skipped
- Daily progress bar showing % completion with smooth animation
- Per-task mini progress (for recurring multi-step tasks)
- **Heatmap Calendar:** Full month view, color intensity based on daily completion %
  - Green shades: 0% → light, 100% → dark
  - Click any day to see that day's task log
- **Weekly bar chart** showing task completion trend

### 2. Streak System (Enhanced)
- Current streak counter (consecutive days with ≥1 task completed)
- Longest streak record
- **Freeze protection:** User can freeze streak once per week (like Duolingo)
- Streak milestone badges: 7, 14, 30, 60, 100 days
- Streak flame animation that grows bigger with streak length
- Break notification: "You haven't logged today yet!" reminder logic (stored in app)

### 3. Goals & Goal Tasks (Enhanced)
- Create a Goal with: title, description, category, target date, color tag
- Add sub-tasks under each Goal (ordered checklist)
- Goal progress auto-calculates from sub-task completion %
- Goal status: Not Started → In Progress → Completed → Archived
- **Goal Timeline View:** Horizontal timeline showing all active goals side by side
- **Suggested milestones:** When user sets a 3-month goal, app auto-suggests weekly check-in points

### 4. Animated Roadmap (Signature Feature — Enhanced)
- Home screen hero section with SVG animated roadmap path
- Avatar (customizable emoji or preset character) walks the path
- **Stops/nodes** on the path represent: current active tasks & goals
- When a task is completed → avatar animates to jump/walk to next node
- Path has visual "chapters": Past (grayed), Present (glowing), Future (dotted)
- Idle animation: avatar bobs gently when nothing is happening
- **Milestone celebrations:** Confetti burst + sound (optional) when goal is completed
- Path style adapts to dark/light mode

### 5. NEW: Dashboard Home
- Quick Stats row: Today's tasks, Current streak, Active goals, This week's %
- Motivational quote of the day (static curated list, rotates daily)
- "What to do now" smart suggestion: surfaces the next incomplete task or goal sub-task
- Recent activity log (last 5 actions)

### 6. NEW: Habit Tracker (Bonus Module)
- Separate from daily tasks — recurring daily/weekly habits (e.g., "Read 30 min")
- Each habit has its own mini heatmap
- Habit completion tracked independently from goals

### 7. NEW: Focus Timer (Bonus Module)
- Simple Pomodoro-style timer linkable to a task
- 25 min work / 5 min break preset (customizable)
- Timer logs against the linked task on completion

### 8. NEW: Settings & Profile
- Name, avatar selection (emoji picker)
- Notification preferences (Web Push or in-app reminders)
- Data export as JSON
- Reset all data option
- Theme: Light / Dark / System

---

## 🗃️ Data Models

```typescript
// Daily Task
interface DailyTask {
  id: string;
  date: string; // "YYYY-MM-DD"
  title: string;
  effort: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'skipped';
  completedAt?: string;
}

// Goal
interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  color: string; // hex
  targetDate: string;
  createdAt: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'archived';
  tasks: GoalTask[];
}

interface GoalTask {
  id: string;
  goalId: string;
  title: string;
  order: number;
  completed: boolean;
  completedAt?: string;
}

// Streak
interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastLoggedDate: string;
  freezesAvailable: number;
  lastFreezeUsed?: string;
  milestonesBadges: string[]; // badge ids earned
}

// Habit
interface Habit {
  id: string;
  title: string;
  frequency: 'daily' | 'weekdays' | 'weekends';
  logs: { date: string; completed: boolean }[];
}

// User Profile
interface UserProfile {
  name: string;
  avatar: string; // emoji
  theme: 'light' | 'dark' | 'system';
  joinedAt: string;
}
```

---

## 📁 Project File Structure

```
src/
├── main.jsx
├── App.jsx
├── index.css
│
├── components/
│   ├── layout/
│   │   ├── BottomNav.jsx          # Mobile bottom navigation
│   │   ├── Header.jsx
│   │   └── PageTransition.jsx     # Framer Motion page wrapper
│   │
│   ├── roadmap/
│   │   ├── RoadmapCanvas.jsx      # SVG animated path
│   │   ├── RoadmapNode.jsx        # Each task/goal stop
│   │   └── Avatar.jsx             # Walking avatar with animations
│   │
│   ├── tasks/
│   │   ├── DailyTaskList.jsx
│   │   ├── TaskCard.jsx
│   │   ├── AddTaskModal.jsx
│   │   ├── DailyProgressBar.jsx
│   │   └── Heatmap.jsx            # Month heatmap calendar
│   │
│   ├── goals/
│   │   ├── GoalCard.jsx
│   │   ├── GoalDetail.jsx
│   │   ├── GoalTimeline.jsx
│   │   ├── AddGoalModal.jsx
│   │   └── GoalTaskList.jsx
│   │
│   ├── streak/
│   │   ├── StreakBadge.jsx
│   │   ├── StreakFlame.jsx
│   │   └── MilestoneCelebration.jsx
│   │
│   ├── habits/
│   │   ├── HabitCard.jsx
│   │   ├── HabitHeatmap.jsx
│   │   └── AddHabitModal.jsx
│   │
│   ├── timer/
│   │   ├── FocusTimer.jsx
│   │   └── TimerRing.jsx
│   │
│   └── ui/
│       ├── Button.jsx
│       ├── Modal.jsx
│       ├── ProgressBar.jsx
│       ├── Badge.jsx
│       ├── ConfettiEffect.jsx
│       └── QuoteCard.jsx
│
├── pages/
│   ├── Home.jsx          # Roadmap + Dashboard
│   ├── Tasks.jsx         # Daily tasks + heatmap
│   ├── Goals.jsx         # Goals list + timeline
│   ├── GoalDetail.jsx    # Single goal expanded
│   ├── Habits.jsx        # Habits tracker
│   ├── Stats.jsx         # Weekly/monthly analytics
│   └── Settings.jsx
│
├── store/
│   ├── useTaskStore.js
│   ├── useGoalStore.js
│   ├── useStreakStore.js
│   ├── useHabitStore.js
│   └── useUserStore.js
│
├── hooks/
│   ├── useStreak.js       # Streak calculation logic
│   ├── useHeatmap.js      # Heatmap data transformer
│   └── useRoadmap.js      # Roadmap path + avatar position logic
│
└── utils/
    ├── dateHelpers.js
    ├── progressCalc.js
    └── storage.js          # localStorage helpers
```

---

## 📦 Dependencies to Install

```bash
npm install zustand react-router-dom framer-motion
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms
npx tailwindcss init -p

# PWA
npm install -D vite-plugin-pwa

# Icons
npm install lucide-react

# Confetti
npm install canvas-confetti

# Date utilities
npm install date-fns
```

---

## ⚙️ Vite PWA Configuration

In `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'DayForge - Progress Tracker',
        short_name: 'DayForge',
        description: 'Track your daily tasks, goals, and growth',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
          }
        ]
      }
    })
  ],
})
```

---

## 🎨 Design System (Tailwind Config)

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4', 100: '#dcfce7',
          400: '#4ade80', 500: '#22c55e',
          600: '#16a34a', 900: '#14532d',
        },
        surface: {
          50: '#f8fafc', 100: '#f1f5f9',
          800: '#1e293b', 900: '#0f172a', 950: '#020617',
        },
        accent: '#f59e0b', // amber for streaks
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],      // Bold headings
        body: ['DM Sans', 'sans-serif'],       // Body text
        mono: ['JetBrains Mono', 'monospace'], // Stats/numbers
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'flame': 'flame 1.5s ease-in-out infinite alternate',
        'walk': 'walk 0.5s steps(4) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(34,197,94,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(34,197,94,0.8)' },
        },
        flame: {
          '0%': { transform: 'scale(1) rotate(-2deg)' },
          '100%': { transform: 'scale(1.1) rotate(2deg)' },
        }
      }
    }
  }
}
```

**Google Fonts to import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
```

---

## 🗺️ Roadmap Animation — Technical Specification

The roadmap is the **hero/signature** feature. Here's exactly how to build it:

### SVG Path Approach
```jsx
// RoadmapCanvas.jsx - Key implementation details

// 1. Draw a winding SVG path (cubic bezier curves)
// 2. Place <circle> nodes at specific points along the path
// 3. Use path.getTotalLength() and path.getPointAtLength() to position avatar
// 4. Animate avatar position with Framer Motion useMotionValue

const RoadmapCanvas = () => {
  // Path: winding road from bottom to top of screen
  const pathD = "M 50,400 C 150,350 250,380 300,300 C 350,220 200,180 250,100 C 300,20 400,50 450,20";
  
  // Nodes = goals + top daily tasks, calculated as % along path
  // Avatar position = % of total tasks/goals completed
  
  return (
    <svg viewBox="0 0 500 450" className="w-full">
      {/* Dashed future path */}
      <path d={pathD} stroke="#334155" strokeWidth="4" strokeDasharray="8 4" fill="none" />
      {/* Solid completed path - animates width on completion */}
      <motion.path d={pathD} stroke="#22c55e" strokeWidth="4" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: completionRatio }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      {/* Nodes */}
      {nodes.map(node => <RoadmapNode key={node.id} {...node} />)}
      {/* Avatar */}
      <Avatar pathRef={pathRef} progress={completionRatio} />
    </svg>
  );
};
```

### Avatar States
- **Idle:** Gentle vertical bob (CSS keyframe)
- **Moving:** Walk cycle animation (frame-based)
- **Celebrating:** Jump + spin on task completion
- **Sleeping:** Eyes closed when no tasks for the day

---

## 🏗️ Build Order (Phases for CLI)

### Phase 1 — Foundation (Do First)
1. Vite + React project setup
2. Install all dependencies
3. Configure TailwindCSS with custom design tokens
4. Configure Vite PWA plugin with manifest
5. Set up React Router with all routes
6. Build Zustand stores with localStorage persistence
7. Build bottom navigation bar

### Phase 2 — Core Features
8. Daily Tasks page: add/complete/skip tasks
9. Daily Progress Bar component
10. Heatmap Calendar (month view)
11. Streak badge and flame with calculation logic

### Phase 3 — Goals
12. Goals list page with cards
13. Add Goal modal with date picker
14. Goal detail page with sub-tasks checklist
15. Goal progress auto-calculation
16. Goal Timeline horizontal view

### Phase 4 — Roadmap (Main Event)
17. SVG Roadmap path component
18. Roadmap nodes from goals/tasks data
19. Avatar component with idle animation
20. Avatar motion along path on completion
21. Celebration confetti on milestone

### Phase 5 — Enhancements
22. Habits tracker module
23. Focus timer (Pomodoro)
24. Stats page with charts
25. Settings page
26. Dark/Light theme toggle
27. PWA install prompt

### Phase 6 — Polish
28. Page transition animations
29. Loading states and empty states
30. Error boundaries
31. Performance audit
32. Lighthouse PWA checklist

---

## 🤖 Prompt to Give Gemini CLI

> Copy this entire section and give it to Gemini CLI to start development:

---

```
You are an expert React developer. Build a mobile-first Progressive Web App called "DayForge" — a personal progress tracker. Follow this specification exactly.

TECH STACK:
- React 18 + Vite
- TailwindCSS with custom config (fonts: Syne display, DM Sans body, JetBrains Mono numbers)
- Framer Motion for all animations
- Zustand for state management with localStorage persistence
- React Router v6
- vite-plugin-pwa for PWA
- lucide-react for icons
- date-fns for date utilities
- canvas-confetti for celebrations

DESIGN SYSTEM:
- Dark theme primary (bg: #0f172a surface, #1e293b cards)
- Accent green: #22c55e for progress/completion
- Accent amber: #f59e0b for streaks
- Mobile-first: max-width 430px, bottom navigation bar (5 tabs: Home, Tasks, Goals, Habits, Stats)
- All modals slide up from bottom (sheet style)
- Cards have subtle border: border-surface-700, rounded-2xl, backdrop blur

DATA MODELS (TypeScript-style interfaces — implement in JS with Zustand):
[paste the data models section from above]

BUILD PHASE 1 NOW:
1. Create Vite React project structure
2. Install all dependencies listed
3. Configure tailwind.config.js with custom colors, fonts, animations
4. Configure vite.config.js with VitePWA plugin
5. Set up all Zustand stores with localStorage persistence using zustand/middleware persist
6. Set up React Router in App.jsx with all page routes
7. Build BottomNav.jsx with icons and active state indicator
8. Build the base layout with mobile-safe-area insets

After Phase 1, confirm completion and wait for Phase 2 instructions.
```

---

## 🔮 Future Features to Add Later

- **AI Smart Suggestions:** Based on your completion history, suggest optimal task load for today
- **Friend sharing:** Share your streak/goals via link (read-only view)
- **Custom roadmap themes:** Pixel art, space, jungle, city themes for the roadmap background
- **Weekly review:** Every Sunday, show a "Week in Review" summary screen
- **Voice add task:** Web Speech API to add tasks by voice
- **Widgets:** (when PWA widget support matures) lock screen streak widget
- **Offline sync:** When network returns, sync any changes

---

## ✅ PWA Checklist (Before Shipping)

- [ ] Web App Manifest with all icon sizes
- [ ] Service Worker registered and caching assets
- [ ] Works fully offline
- [ ] Install prompt handled gracefully
- [ ] `display: standalone` hides browser chrome
- [ ] Safe area insets for iPhone notch (`env(safe-area-inset-*)`)
- [ ] Lighthouse PWA score ≥ 90
- [ ] Lighthouse Performance ≥ 85 on mobile
- [ ] All interactive elements ≥ 44px touch target
- [ ] No layout shift on load (no FOUC)

---

*Generated by Claude — DayForge Progress Tracker Planning Document*
*Share the "Prompt to Give Gemini CLI" section directly with your CLI to start building.*