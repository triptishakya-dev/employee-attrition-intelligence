import { Brain, Info } from "lucide-react";
import type { PredictionResult } from "@/lib/types";

const SUMMARY: Record<string, string> = {
  HIGH: "This employee has a high predicted attrition risk. Review recent rating, tenure, salary and business-performance trends before taking any HR action.",
  MEDIUM: "This employee has a moderate predicted attrition risk. Keep an eye on rating, tenure, salary and business-performance trends and consider a check-in.",
  LOW: "This employee has a low predicted attrition risk. Continue monitoring rating, tenure, salary and business-performance trends as part of regular reviews.",
};

export default function RiskFactorsCard({ result }: { result: PredictionResult }) {
  const factors = result.top_factors ?? [];
  return (
    <section aria-labelledby="ai-analysis-title" className="animate-rise rounded-3xl border border-white bg-white/80 p-5 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <Brain className="h-5 w-5" aria-hidden />
        </span>
        <h2 id="ai-analysis-title" className="text-lg font-semibold text-slate-900">AI Risk Analysis</h2>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{SUMMARY[result.risk_level] ?? SUMMARY.MEDIUM}</p>

      {factors.length > 0 && (
        <>
          <h3 className="mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500">Top Contributing Factors</h3>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {factors.map((f, i) => (
              <li key={f} className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 px-3.5 py-3 text-sm font-medium text-slate-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">{i + 1}</span>
                {f}
              </li>
            ))}
          </ol>
        </>
      )}

      <p className="mt-5 flex gap-2 text-xs leading-5 text-slate-500">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        These are factors contributing to the model prediction and should not be interpreted as causal reasons or used as the sole basis for employment decisions.
      </p>
    </section>
  );
}
