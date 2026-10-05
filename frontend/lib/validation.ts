import type { EmployeeData } from "./types";

const STRING_FIELDS = ["Gender", "City", "Education_Level"] as const;
const NUMBER_FIELDS = [
  "Age",
  "Salary",
  "Joining_Designation",
  "Designation",
  "Total_Business_Value",
  "Quarterly_Rating",
  "Tenure_Months",
  "Previous_Rating",
  "Rating_Change",
  "Previous_Business_Value",
  "Business_Value_Change",
] as const;

export type ValidationResult =
  | { valid: true; data: EmployeeData; errors: [] }
  | { valid: false; data: null; errors: string[] };

export function validateEmployeeJson(text: string): ValidationResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { valid: false, data: null, errors: ["Invalid JSON format"] };
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return { valid: false, data: null, errors: ["Invalid JSON format: expected an object"] };
  }

  const obj = parsed as Record<string, unknown>;
  const errors: string[] = [];

  for (const key of STRING_FIELDS) {
    if (obj[key] === undefined || obj[key] === null) errors.push(`${key} is required`);
    else if (typeof obj[key] !== "string" || obj[key] === "") errors.push(`${key} must be a non-empty string`);
  }
  for (const key of NUMBER_FIELDS) {
    const v = obj[key];
    if (v === undefined || v === null) errors.push(`${key} is required`);
    else if (typeof v !== "number" || !Number.isFinite(v)) errors.push(`${key} must be a number`);
  }

  if (typeof obj.Quarterly_Rating === "number" && (obj.Quarterly_Rating < 1 || obj.Quarterly_Rating > 4)) {
    errors.push("Quarterly_Rating must be between 1 and 4");
  }
  if (typeof obj.Age === "number" && (obj.Age < 16 || obj.Age > 100)) {
    errors.push("Age must be between 16 and 100");
  }
  for (const key of ["Salary", "Tenure_Months", "Total_Business_Value"] as const) {
    if (typeof obj[key] === "number" && (obj[key] as number) < 0) errors.push(`${key} must not be negative`);
  }

  if (errors.length) return { valid: false, data: null, errors };
  return { valid: true, data: obj as unknown as EmployeeData, errors: [] };
}
