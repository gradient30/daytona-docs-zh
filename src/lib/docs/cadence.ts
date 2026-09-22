import raw from "./cadence.json" with { type: "json" };

export type Cadence = {
  title: string;
  timezone: string;
  timeOfDay: string;
  fingerprint: string;
  translate: string;
  lastCheckAt: string;
  lastChangeAt: string;
  llmsHash: string;
  status: "current" | "stale" | "translating";
};

export const CADENCE = raw as Cadence;

export function formatStamp(iso: string): string {
  if (!iso) return "—";
  return iso.replace("T", " ").slice(0, 16);
}
