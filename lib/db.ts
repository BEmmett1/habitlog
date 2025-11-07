// lib/db.ts
import * as SQLite from "expo-sqlite";

export let db: SQLite.SQLiteDatabase | null = null;

const SCHEMA = `
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS mood_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  score INTEGER NOT NULL,
  note TEXT
);

CREATE TABLE IF NOT EXISTS food_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  name TEXT NOT NULL,
  quantity TEXT,
  kcal INTEGER,
  tags TEXT
);

CREATE TABLE IF NOT EXISTS exercise_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  type TEXT NOT NULL,
  duration_min INTEGER,
  intensity TEXT,
  note TEXT
);

CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  text TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_mood_date ON mood_entries(date);
CREATE INDEX IF NOT EXISTS idx_food_date ON food_entries(date);
CREATE INDEX IF NOT EXISTS idx_ex_date ON exercise_entries(date);
`;

export async function initDb() {
  db = await SQLite.openDatabaseAsync("habits.db");   // <-- async
  await db.execAsync(SCHEMA);                          // <-- async
}

// Small helper so other modules can safely grab the db
export function requireDb() {
  if (!db) throw new Error("DB not initialized yet");
  return db;
}
