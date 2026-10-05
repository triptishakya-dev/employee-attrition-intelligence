"use client";

import { useEffect, useState } from "react";
import type { RiskLevel } from "@/lib/types";
import { RISK_STYLES } from "./RiskBadge";

export default function RiskGauge({ percent, level }: { percent: number; level: RiskLevel }) {
  const size = 200;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percent));

  // Animate from empty on mount.
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(clamped));
    return () => cancelAnimationFrame(id);
  }, [clamped]);

  return (
    <div className="relative" style={{ width: size, height: size }} role="img" aria-label={`Attrition risk ${percent.toFixed(2)} percent`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={(RISK_STYLES[level] ?? RISK_STYLES.MEDIUM).stroke}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - shown / 100)}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tracking-tight text-slate-900">{percent.toFixed(2)}%</span>
        <span className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Attrition risk</span>
      </div>
    </div>
  );
}
