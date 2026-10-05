export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface EmployeeData {
  Age: number;
  Gender: string;
  City: string;
  Education_Level: string;
  Salary: number;
  Joining_Designation: number;
  Designation: number;
  Total_Business_Value: number;
  Quarterly_Rating: number;
  Tenure_Months: number;
  Previous_Rating: number;
  Rating_Change: number;
  Previous_Business_Value: number;
  Business_Value_Change: number;
}

export interface PredictionResult {
  risk_score: number;
  risk_percent: number;
  risk_level: RiskLevel;
  prediction: string;
  top_factors?: string[];
}

export const DEFAULT_EMPLOYEE: EmployeeData = {
  Age: 29,
  Gender: "Male",
  City: "C13",
  Education_Level: "Bachelor",
  Salary: 35000,
  Joining_Designation: 1,
  Designation: 1,
  Total_Business_Value: 100000,
  Quarterly_Rating: 1,
  Tenure_Months: 5,
  Previous_Rating: 2,
  Rating_Change: -1,
  Previous_Business_Value: 150000,
  Business_Value_Change: -50000,
};
