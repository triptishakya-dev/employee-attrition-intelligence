"use client";

import { useRef } from "react";

interface Props {
  id: string;
  value: string;
  onChange: (v: string) => void;
  invalid: boolean;
  describedBy?: string;
}

export default function JsonEditor({ id, value, onChange, invalid, describedBy }: Props) {
  const gutterRef = useRef<HTMLDivElement>(null);
  const lines = value.split("\n").length;

  return (
    <div
      className={`flex overflow-hidden rounded-xl border bg-slate-950 transition focus-within:ring-4 ${
        invalid
          ? "border-red-500 focus-within:ring-red-500/20"
          : "border-slate-700 focus-within:border-indigo-400 focus-within:ring-indigo-500/20"
      }`}
    >
      <div
        ref={gutterRef}
        aria-hidden
        className="select-none overflow-hidden border-r border-slate-800 bg-slate-900/60 px-3 py-4 text-right font-mono text-xs leading-6 text-slate-500"
      >
        {Array.from({ length: lines }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={(e) => {
          if (gutterRef.current) gutterRef.current.scrollTop = e.currentTarget.scrollTop;
        }}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-invalid={invalid}
        aria-describedby={describedBy}
        wrap="off"
        className="h-[26rem] min-w-0 flex-1 resize-y bg-transparent p-4 font-mono text-sm leading-6 text-emerald-200 caret-white outline-none placeholder:text-slate-600"
        placeholder='{ "Age": 29, ... }'
      />
    </div>
  );
}
