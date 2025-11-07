import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { router } from "expo-router";

async function insertMood(date: string, time: string, score: number, note?: string | null) {
  const { requireDb } = await import("../../lib/db");
  const db = requireDb();
  await db.runAsync(
    "INSERT INTO mood_entries (date, time, score, note) VALUES (?,?,?,?)",
    date,
    time,
    score,
    note ?? null
  );
}

const todayISO = () => new Date().toISOString().slice(0, 10);
const nowHM = () => new Date().toTimeString().slice(0, 5);

export default function AddMood() {
  const [score, setScore] = useState("3");
  const [note, setNote] = useState("");

  async function save() {
    const n = Number(score);
    if (!Number.isInteger(n) || n < 1 || n > 5) {
      Alert.alert("Score must be a number from 1 to 5");
      return;
    }
    await insertMood(todayISO(), nowHM(), n, note.trim() || null);
    router.back();
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Log mood</Text>
      <Text>Score 1 to 5</Text>
      <TextInput
        value={score}
        onChangeText={setScore}
        keyboardType="number-pad"
        maxLength={1}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
      />
      <Text>Note</Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        multiline
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, minHeight: 80 }}
      />
      <Button title="Save" onPress={save} />
    </View>
  );
}
