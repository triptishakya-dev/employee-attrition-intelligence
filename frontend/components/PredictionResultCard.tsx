"use client";

import { Check, ClipboardCopy, TriangleAlert, UserCheck } from "lucide-react";
import { useState } from "react";
import type { PredictionResult } from "@/lib/types";
import RiskBadge, { RISK_STYLES } from "./RiskBadge";
import RiskGauge from "./RiskGauge";

export default function PredictionResultCard({
  result,
  onCopy,
}: {
  result: PredictionResult;
  onCopy: () => Promise<boolean>;
}) {
  const [copied, setCopied] = useState(false);
  const style = RISK_STYLES[result.risk_level] ?? RISK_STYLES.MEDIUM;
  const Icon = result.risk_level === "LOW" ? UserCheck : TriangleAlert;
  const width = Math.max(0, Math.min(100, result.risk_percent));

  const metrics = [
    { label: "Risk Score", value: result.risk_score.toFixed(4) },
    { label: "Risk Percentage", value: `${result.risk_percent.toFixed(2)}%` },
    { label: "Risk Level", value: result.risk_level },
    { label: "Prediction", value: result.prediction },
  ];

  return (
    <section aria-labelledby="result-title" className="animate-rise rounded-3xl border border-white bg-white/80 p-5 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <h2 id="result-title" className="text-lg font-semibold text-slate-900">Prediction Result</h2>
        <button
          type="button"
          onClick={async () => {
            setCopied(await onCopy());
            setTimeout(() => setCopied(false), 1800);
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-600" aria-hidden /> : <ClipboardCopy className="h-4 w-4" aria-hidden />}
          {copied ? "Copied" : "Copy Result"}
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white p-6 ring-1 ring-slate-100">
        <RiskGauge percent={result.risk_percent} level={result.risk_level} />
        <RiskBadge level={result.risk_level} />
        <p className="flex items-center gap-2 text-base font-semibold text-slate-800">
          <Icon className="h-5 w-5 text-slate-500" aria-hidden />
          Prediction: {result.prediction}
        </p>
        <div className="w-full">
          <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-500">
            <span>0%</span>
            <span>100%</span>
          </div>
          <div
            className="h-3 w-full overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(width)}
            aria-label="Risk percentage"
          >
            <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${width}%`, animation: "bar-grow 1s ease-out both" }} />
          </div>
        </div>
      </div>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-500">Prediction Details</h3>
      <dl className="mt-3 grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <dt className="text-xs font-medium text-slate-500">{m.label}</dt>
            <dd className="mt-1 text-base font-semibold text-slate-900">{m.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
