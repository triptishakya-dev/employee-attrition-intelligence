"use client";

import { CircleAlert, X } from "lucide-react";
import { useEffect } from "react";

export interface ToastData {
  id: number;
  title: string;
  message?: string;
}

export default function Toast({ toast, onDismiss }: { toast: ToastData | null; onDismiss: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 7000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed inset-x-4 top-4 z-50 flex justify-end sm:inset-x-6">
      <div role="alert" className="pointer-events-auto flex w-full max-w-sm animate-toast-in gap-3 rounded-2xl border border-red-200 bg-white p-4 shadow-2xl shadow-red-900/10">
        <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-500" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
          {toast.message && <p className="mt-0.5 break-words text-sm text-slate-600">{toast.message}</p>}
        </div>
        <button type="button" onClick={onDismiss} aria-label="Dismiss notification" className="h-6 w-6 shrink-0 rounded-md text-slate-400 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
