"use client";

import { Braces, Check, ClipboardCopy, RotateCcw, WandSparkles } from "lucide-react";
import { useState } from "react";
import JsonEditor from "./JsonEditor";
import PredictButton from "./PredictButton";
import ValidationMessage from "./ValidationMessage";

interface Props {
  value: string;
  onChange: (v: string) => void;
  errors: string[];
  loading: boolean;
  onFormat: () => void;
  onReset: () => void;
  onSubmit: () => void;
  onCopy: () => Promise<boolean>;
}

const secondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50";

export default function JsonInputCard({ value, onChange, errors, loading, onFormat, onReset, onSubmit, onCopy }: Props) {
  const [copied, setCopied] = useState(false);
  const invalid = errors.length > 0;
  const canFormat = !errors.some((e) => e.startsWith("Invalid JSON")) && value.trim() !== "";

  return (
    <section aria-labelledby="employee-data-title" className="rounded-3xl border border-white bg-white/80 p-5 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Braces className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 id="employee-data-title" className="text-lg font-semibold text-slate-900">Employee Data</h2>
            <p className="text-sm text-slate-500">Paste employee details as JSON</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            className={secondary}
            onClick={async () => {
              setCopied(await onCopy());
              setTimeout(() => setCopied(false), 1800);
            }}
            aria-label="Copy JSON"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" aria-hidden /> : <ClipboardCopy className="h-4 w-4" aria-hidden />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy JSON"}</span>
          </button>
          <button type="button" className={secondary} onClick={onReset} aria-label="Reset to default example">
            <RotateCcw className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <label htmlFor="employee-json" className="sr-only">Employee data as JSON</label>
      <JsonEditor id="employee-json" value={value} onChange={onChange} invalid={invalid} describedBy={invalid ? "json-errors" : undefined} />
      <ValidationMessage id="json-errors" errors={errors} />

      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" className={secondary} onClick={onFormat} disabled={!canFormat}>
          <WandSparkles className="h-4 w-4" aria-hidden />
          Format JSON
        </button>
        <PredictButton loading={loading} disabled={invalid || value.trim() === ""} onClick={onSubmit} />
      </div>
    </section>
  );
}
