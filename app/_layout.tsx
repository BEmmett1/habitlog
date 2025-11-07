// app/_layout.tsx
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import { initDb } from "../lib/db";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [err, setErr] = useState<null | string>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await initDb();
        if (mounted) setReady(true);
      } catch (e: any) {
        console.error("DB init failed:", e);
        if (mounted) setErr(String(e?.message ?? e));
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (err) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
          <Text style={{ color: "#fff", fontSize: 18, marginBottom: 8 }}>Startup error</Text>
          <Text style={{ color: "#bbb", textAlign: "center" }}>{err}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!ready) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0a84ff" }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" />
          <Text style={{ color: "white", marginTop: 12 }}>Setting up local database…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Slot />
    </SafeAreaView>
  );
}
