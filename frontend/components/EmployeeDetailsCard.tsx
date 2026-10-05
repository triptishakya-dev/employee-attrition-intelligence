import { UserRound } from "lucide-react";
import type { EmployeeData } from "@/lib/types";

const num = new Intl.NumberFormat("en-IN");
const signed = (n: number) => (n > 0 ? `+${num.format(n)}` : num.format(n));
const tone = (n: number) => (n < 0 ? "neg" : n > 0 ? "pos" : undefined);

export default function EmployeeDetailsCard({ employee }: { employee: EmployeeData }) {
  const items: { label: string; value: string; tone?: "neg" | "pos" }[] = [
    { label: "Age", value: String(employee.Age) },
    { label: "Gender", value: employee.Gender },
    { label: "City", value: employee.City },
    { label: "Education", value: employee.Education_Level },
    { label: "Salary", value: `₹${num.format(employee.Salary)}` },
    { label: "Current Designation", value: String(employee.Designation) },
    { label: "Joining Designation", value: String(employee.Joining_Designation) },
    { label: "Quarterly Rating", value: `${employee.Quarterly_Rating} / 4` },
    { label: "Tenure", value: `${employee.Tenure_Months} months` },
    { label: "Total Business Value", value: `₹${num.format(employee.Total_Business_Value)}` },
    { label: "Previous Rating", value: String(employee.Previous_Rating) },
    { label: "Rating Change", value: signed(employee.Rating_Change), tone: tone(employee.Rating_Change) },
    { label: "Previous Business Value", value: `₹${num.format(employee.Previous_Business_Value)}` },
    { label: "Business Value Change", value: signed(employee.Business_Value_Change), tone: tone(employee.Business_Value_Change) },
  ];

  return (
    <section aria-labelledby="employee-details-title" className="animate-rise rounded-3xl border border-white bg-white/80 p-5 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          <UserRound className="h-5 w-5" aria-hidden />
        </span>
        <h2 id="employee-details-title" className="text-lg font-semibold text-slate-900">Employee Details</h2>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.label} className="rounded-2xl bg-slate-50 p-3.5">
            <dt className="text-xs font-medium text-slate-500">{i.label}</dt>
            <dd className={`mt-1 break-words text-sm font-semibold ${i.tone === "neg" ? "text-red-600" : i.tone === "pos" ? "text-emerald-600" : "text-slate-900"}`}>
              {i.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
