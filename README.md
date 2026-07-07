# ⏳ DeadlineZero — The Last-Minute Life Saver

An intelligent, AI-powered productivity companion designed to schedule, prioritise, and recover tasks before they are missed. It integrates smart calendar management, real-time warning indicators, and Vertex AI analysis to save you from last-minute crunches.

🌐 **Live Demo:** [https://deadlinezero-cfaeb.web.app/](https://deadlinezero-cfaeb.web.app/)

---

## ✨ Key Features

1. **Dynamic Smart Scheduling (`src/engine/scheduler.ts`)**
   - **Priority Score System**: Calculates urgency using task deadlines, user/AI-assessed importance, and current completion percentage.
   - **Smart Slots**: Automatically scans and schedules tasks into contiguous work hour slots, respecting existing calendar events and avoiding overlaps.

2. **Simulated Time Engine & Warnings (`src/engine/countdown.ts`)**
   - **Fast-Forward & Simulation**: Perfect for testing and evaluation—users can speed up time or trigger deadlines instantly to see the application's warning systems in action.
   - **Proactive Escalation**: Fires warning toasts at **24h, 6h, and 1h** thresholds.
   - **Lockout Modal**: Full-screen overlay modal that triggers once a deadline passes, prompting the user to perform a check-in or request an extension.

3. **Gemini 2.0 Flash Integration (`src/firebase/aiLogic.ts`)**
   - Powered by the native Firebase Vertex AI (`firebase/ai`) Client SDK.
   - **Task Breakdown & Analysis**: Automatically evaluates tasks, suggests subtasks, and assigns AI importance levels.
   - **Blocker Resolution**: Generates step-by-step mitigation plans and drafts emails to stakeholders when you flag a blocker.
   - **Deadline Miss Recovery**: Proposes recovery plans and communication drafts if a deadline is missed.
   - **Weekly Performance Review**: Aggregates completion rates and streaks to generate personalized, motivating reviews.

4. **Habit & Long-Term Goal Tracking**
   - Monitor daily habits, track streaks, and view progress graphs to keep long-term aspirations aligned with daily tasks.

5. **Cloud Backend & Offline Sync**
   - **Firebase Authentication**: Integrated Google Sign-In and an **Instant Guest/Judge login** for seamless evaluation.
   - **Cloud Firestore**: Real-time storage and updates with full offline sync banner support.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend / Cloud**: Firebase Auth, Firestore Database, Firebase Hosting, Firebase Vertex AI (`firebase/ai`).

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI Components
│   ├── addtask/        # Slide-over panel for task creation & AI analysis
│   ├── checkin/        # Interstitial modal & deadline failure screens
│   ├── dashboard/      # Daily feed, calendars, and tasks list
│   ├── goals/          # Habit tracker and goal progress
│   ├── insights/       # Weekly review and completion charts
│   ├── layout/         # Navigation, fab buttons, and toast notifications
│   ├── schedule/       # Calendar timelines and schedule views
│   └── settings/       # Profile configuration & simulated clock controls
├── engine/              # Core business logic
│   ├── countdown.ts    # Time-ticking warning logic
│   ├── scheduler.ts    # Priority math and calendar gap-finding
│   └── patterns.ts     # Task analytics helper functions
├── firebase/            # Database and AI configuration
│   ├── config.ts       # Firebase client initialization
│   ├── auth.ts         # User auth handlers
│   ├── firestore.ts    # DB read/write actions
│   └── aiLogic.ts      # Client-side Vertex AI prompts and mock fallbacks
├── hooks/               # Custom React hooks (useTasks, useSchedule, etc.)
└── pages/               # Main application view layouts
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### 2. Installation
Clone or download the repository, then install the dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Firebase project configuration credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Running the Development Server
Start the local Vite dev server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Build & Deployment

### Build the Project
Build the optimized static assets to the `dist` directory:
```bash
npm run build
```

### Deploy to Firebase
If you have the Firebase CLI installed and logged in, you can deploy using:
```bash
firebase deploy
```
This builds and uploads the files in the `dist` directory directly to Firebase Hosting.
