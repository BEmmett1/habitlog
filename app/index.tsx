// app/index.tsx
import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import { getRecentUnion } from "../lib/queries";

export default function Home() {
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setRecent(await getRecentUnion(8));
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", textAlign: "center" }}>
        Habitlog Home
      </Text>

      <Link href="/add/mood" asChild>
        <Pressable style={{ padding: 12, borderWidth: 1, borderRadius: 10, alignItems: "center" }}>
          <Text>Log Mood</Text>
        </Pressable>
      </Link>

      <Text style={{ fontSize: 18, fontWeight: "600" }}>Recent</Text>
      {recent.length === 0 ? (
        <Text>No entries yet</Text>
      ) : (
        recent.map((r) => (
          <Text key={`${r.kind}-${r.id}`}>
            {r.date} {r.time} • {r.kind} • {r.text}
          </Text>
        ))
      )}
    </ScrollView>
  );
}
