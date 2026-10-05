import { AlertCircle } from "lucide-react";

export default function ValidationMessage({ id, errors }: { id: string; errors: string[] }) {
  if (errors.length === 0) return null;
  return (
    <div
      id={id}
      role="alert"
      className="mt-3 flex gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <ul className="space-y-0.5">
        {errors.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
}
