// lib/queries.ts
import { requireDb } from "./db";

// insert one mood row
export async function insertMood(
  date: string,
  time: string,
  score: number,
  note?: string | null
) {
  const db = requireDb();
  await db.runAsync(
    "INSERT INTO mood_entries (date, time, score, note) VALUES (?,?,?,?)",
    date,
    time,
    score,
    note ?? null
  );
}

// recent feed across all tables, limited
export async function getRecentUnion(limit = 12) {
  const db = requireDb();
  return db.getAllAsync(
    `SELECT 'mood' AS kind, id, date, time, COALESCE(note, '') AS text FROM mood_entries
     UNION ALL
     SELECT 'food', id, date, time, name || ' ' || IFNULL(quantity,'') FROM food_entries
     UNION ALL
     SELECT 'exercise', id, date, time, type || ' ' || IFNULL(duration_min,0) || 'm' FROM exercise_entries
     UNION ALL
     SELECT 'note', id, date, time, text FROM notes
     ORDER BY date DESC, time DESC
     LIMIT ?`,
    limit
  );
}
