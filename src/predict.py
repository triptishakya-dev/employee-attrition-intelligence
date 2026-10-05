import joblib
import pandas as pd
from pathlib import Path


MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "attrition_pipeline.pkl"

pipeline = joblib.load(MODEL_PATH)


def predict_attrition(employee_data: dict) -> dict:
    df = pd.DataFrame([employee_data])

    probability = pipeline.predict_proba(df)[0][1]
    prediction = int(probability >= 0.5)

    if probability >= 0.70:
        risk_level = "HIGH"
    elif probability >= 0.40:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "risk_score": round(float(probability), 4),
        "risk_percent": round(float(probability) * 100, 2),
        "risk_level": risk_level,
        "prediction": (
            "Potential Attrition"
            if prediction == 1
            else "Likely to Stay"
        ),
    }


if __name__ == "__main__":
    sample_employee = {
        "Age": 29,
        "Gender": "Male",
        "City": "C13",
        "Education_Level": "Bachelor",
        "Salary": 35000,
        "Joining Designation": 1,
        "Designation": 1,
        "Total Business Value": 100000,
        "Quarterly Rating": 1,
        "Tenure_Months": 5,
        "Previous_Rating": 2,
        "Rating_Change": -1,
        "Previous_Business_Value": 150000,
        "Business_Value_Change": -50000,
    }

    result = predict_attrition(sample_employee)

    print(result)