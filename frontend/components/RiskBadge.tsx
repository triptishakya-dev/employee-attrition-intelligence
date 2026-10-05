import type { RiskLevel } from "@/lib/types";

export const RISK_STYLES: Record<RiskLevel, { badge: string; stroke: string; bar: string; label: string }> = {
  LOW: { badge: "bg-emerald-50 text-emerald-700 ring-emerald-200", stroke: "#10b981", bar: "bg-emerald-500", label: "Low Risk" },
  MEDIUM: { badge: "bg-amber-50 text-amber-700 ring-amber-200", stroke: "#f59e0b", bar: "bg-amber-500", label: "Medium Risk" },
  HIGH: { badge: "bg-red-50 text-red-700 ring-red-200", stroke: "#ef4444", bar: "bg-red-500", label: "High Risk" },
};

export default function RiskBadge({ level }: { level: RiskLevel }) {
  const s = RISK_STYLES[level] ?? RISK_STYLES.MEDIUM;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${s.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.bar}`} aria-hidden />
      {s.label}
    </span>
  );
}
