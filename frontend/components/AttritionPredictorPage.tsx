"use client";

import { Activity, BarChart3 } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { AttritionApiError, predictAttrition } from "@/lib/attrition-api";
import { DEFAULT_EMPLOYEE, type EmployeeData, type PredictionResult } from "@/lib/types";
import { validateEmployeeJson } from "@/lib/validation";
import EmployeeDetailsCard from "./EmployeeDetailsCard";
import JsonInputCard from "./JsonInputCard";
import PredictionResultCard from "./PredictionResultCard";
import ResultSkeleton from "./ResultSkeleton";
import RiskFactorsCard from "./RiskFactorsCard";
import Toast, { type ToastData } from "./Toast";

const DEFAULT_JSON = JSON.stringify(DEFAULT_EMPLOYEE, null, 2);

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function AttritionPredictorPage() {
  const [json, setJson] = useState(DEFAULT_JSON);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [submitted, setSubmitted] = useState<EmployeeData | null>(null);
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [toast, setToast] = useState<ToastData | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const validation = useMemo(() => validateEmployeeJson(json), [json]);
  const errors = validation.valid ? apiErrors : validation.errors;

  const showToast = useCallback((title: string, message?: string) => setToast({ id: Date.now(), title, message }), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const handleChange = (v: string) => {
    setJson(v);
    setApiErrors([]);
  };

  const handleFormat = () => {
    try {
      setJson(JSON.stringify(JSON.parse(json), null, 2));
    } catch {
      /* button is disabled for invalid JSON */
    }
  };

  const handleReset = () => {
    abortRef.current?.abort();
    setJson(DEFAULT_JSON);
    setResult(null);
    setSubmitted(null);
    setApiErrors([]);
    setLoading(false);
    setToast(null);
  };

  const handleSubmit = async () => {
    if (!validation.valid || loading) return;
    const data = validation.data;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setApiErrors([]);
    setResult(null);
    try {
      const res = await predictAttrition(data, controller.signal);
      setResult({ ...res, risk_level: String(res.risk_level).toUpperCase() as PredictionResult["risk_level"] });
      setSubmitted(data);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      if (err instanceof AttritionApiError) {
        if (err.kind === "validation") {
          setApiErrors(err.details.length ? err.details : [err.message]);
          showToast("Validation error", err.details[0] ?? err.message);
        } else {
          showToast(err.kind === "network" ? "Network error" : "Server error", err.message);
        }
      } else {
        showToast("Something went wrong", "Unexpected error while requesting the prediction.");
      }
    } finally {
      if (abortRef.current === controller) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Toast toast={toast} onDismiss={dismissToast} />
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm ring-1 ring-indigo-100">
            <Activity className="h-3.5 w-3.5" aria-hidden />
            HR Analytics · AI Model
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Employee Attrition <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Risk Predictor</span>
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Enter employee information as JSON to predict the probability of the employee leaving within the next 3 months. The AI model analyzes performance, salary, tenure, ratings, and business-value trends to generate an attrition risk score.
          </p>
        </header>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
          <div className="lg:sticky lg:top-6">
            <JsonInputCard
              value={json}
              onChange={handleChange}
              errors={errors}
              loading={loading}
              onFormat={handleFormat}
              onReset={handleReset}
              onSubmit={handleSubmit}
              onCopy={() => copyText(json)}
            />
          </div>

          <div className="space-y-6" aria-live="polite">
            {loading ? (
              <ResultSkeleton />
            ) : result && submitted ? (
              <>
                <PredictionResultCard result={result} onCopy={() => copyText(JSON.stringify(result, null, 2))} />
                <EmployeeDetailsCard employee={submitted} />
                <RiskFactorsCard result={result} />
              </>
            ) : (
              <div className="flex min-h-[26rem] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 p-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600">
                  <BarChart3 className="h-8 w-8" aria-hidden />
                </span>
                <h2 className="mt-5 text-lg font-semibold text-slate-900">No analysis yet</h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Enter employee data and run the model to see the attrition analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
