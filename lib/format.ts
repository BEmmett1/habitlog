// lib/format.ts
export const todayISO = () => new Date().toISOString().slice(0, 10);
export const nowHM = () => new Date().toTimeString().slice(0, 5);
