# Habitlog

A lightweight, **offline-first habit tracker** built with [Expo](https://expo.dev), [React Native](https://reactnative.dev/), and [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/).  
Tracks daily habits such as mood, food, exercise, and notes — all stored locally on the device for privacy.

---

## 🚀 Features (Current MVP)
- Add and view daily mood logs  
- Local data storage using `expo-sqlite`  
- Offline-first design (no internet required)  
- Expo Router for clean navigation  
- Auto-initialized database with schema versioning  
- Works on iOS, Android, and (later) web

---

## 🧠 Tech Stack
| Layer | Tool | Purpose |
|-------|------|----------|
| UI | React Native + Expo | Cross-platform interface |
| Navigation | Expo Router | File-based routes |
| Database | expo-sqlite | On-device SQLite database |
| State | React hooks (Zustand optional) | Lightweight UI state |
| Styling | Inline styles (to start) | Easy prototyping |
| Platform | Expo Go / Expo CLI | Build, debug, and deploy |

---

## 📁 Project Structure
```
habitlog/
│
├─ app/                    # Screens and routes
│   ├─ _layout.tsx         # Root layout and DB initialization
│   ├─ index.tsx           # Home screen
│   └─ add/
│       └─ mood.tsx        # Log Mood screen
│
├─ lib/
│   ├─ db.ts               # SQLite initialization and schema
│   ├─ format.ts           # Date/time helpers
│   └─ queries.ts          # Common SQL queries
│
├─ store/                  # (Future) UI state stores
├─ types/                  # Shared TypeScript types
├─ package.json
├─ app.json
└─ README.md
```

---

## ⚙️ Setup Instructions

1. **Clone the project**
   ```bash
   git clone https://github.com/YOUR_USERNAME/habitlog.git
   cd habitlog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run it**
   - Scan the QR code with **Expo Go** on your phone, or  
   - Press `i` (iOS simulator) or `a` (Android emulator)

---

## 🧩 How it Works

1. On startup, the `initDb()` function in `lib/db.ts` creates tables for:
   - `mood_entries`
   - `food_entries`
   - `exercise_entries`
   - `notes`

2. The user can navigate via **Expo Router** (e.g., `/add/mood`).

3. Each entry form calls a helper from `lib/queries.ts` to insert data.

4. The Home screen (`index.tsx`) queries and displays recent entries.

---

## 🛣️ Roadmap
- [x] Basic mood tracking  
- [ ] Add food logging  
- [ ] Add exercise logging  
- [ ] Add daily notes/journal  
- [ ] Weekly summaries and charts  
- [ ] CSV data export  
- [ ] Simple reminder notifications  
- [ ] Optional encrypted cloud backup

---

## 🧑‍💻 Development Notes
- Database is initialized once inside `_layout.tsx`
- `app/_layout.tsx` displays a loading screen until DB is ready
- All SQL commands are run asynchronously for stability
- No network permissions are required

---

## 📜 License
MIT License — feel free to fork and customize.

---

*Built by Benny Thompson (PixelMeta) — documenting each step to understand every layer of the stack.*
