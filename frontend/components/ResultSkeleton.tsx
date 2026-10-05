export default function ResultSkeleton() {
  return (
    <div role="status" aria-label="Analyzing employee data" className="animate-pulse rounded-3xl border border-white bg-white/80 p-6 shadow-xl shadow-slate-200/60">
      <div className="mx-auto h-[200px] w-[200px] rounded-full border-[16px] border-slate-200" />
      <div className="mx-auto mt-6 h-6 w-28 rounded-full bg-slate-200" />
      <div className="mt-6 h-3 rounded-full bg-slate-200" />
      <div className="mt-6 grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-2xl bg-slate-100" />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
