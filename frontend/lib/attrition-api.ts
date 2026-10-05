import type { EmployeeData, PredictionResult } from "./types";

// Same-origin route, proxied to the model API (http://127.0.0.1:8000/predict) by next.config.ts.
const PREDICT_ENDPOINT = "/api/predict";

export type ApiErrorKind = "network" | "validation" | "server";

export class AttritionApiError extends Error {
  constructor(
    message: string,
    public kind: ApiErrorKind,
    public status?: number,
    public details: string[] = [],
  ) {
    super(message);
    this.name = "AttritionApiError";
  }
}

/** FastAPI validation errors: { detail: [{ loc: [...], msg: "..." }] } */
function extractDetails(body: unknown): string[] {
  const detail = (body as { detail?: unknown } | null)?.detail;
  if (typeof detail === "string") return [detail];
  if (Array.isArray(detail)) {
    return detail.map((d) => {
      const loc = Array.isArray(d?.loc) ? d.loc.filter((p: unknown) => p !== "body").join(".") : "";
      return loc ? `${loc}: ${d?.msg ?? "invalid"}` : String(d?.msg ?? JSON.stringify(d));
    });
  }
  return [];
}

export async function predictAttrition(
  employee: EmployeeData,
  signal?: AbortSignal,
): Promise<PredictionResult> {
  let res: Response;
  try {
    res = await fetch(PREDICT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
      signal,
    });
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    throw new AttritionApiError("Cannot reach the prediction service. Make sure the API is running on http://127.0.0.1:8000.", "network");
  }

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    /* non-JSON body */
  }

  if (res.status === 422 || res.status === 400) {
    throw new AttritionApiError("The API rejected the employee data.", "validation", res.status, extractDetails(body));
  }
  if (!res.ok) {
    // Next's rewrite answers 500 when the upstream is unreachable.
    throw new AttritionApiError(`Prediction service error (${res.status}). Please try again.`, "server", res.status, extractDetails(body));
  }

  const r = body as Partial<PredictionResult> | null;
  if (!r || typeof r.risk_score !== "number" || typeof r.risk_percent !== "number" || !r.risk_level || !r.prediction) {
    throw new AttritionApiError("Unexpected response from the prediction service.", "server", res.status);
  }
  return r as PredictionResult;
}
