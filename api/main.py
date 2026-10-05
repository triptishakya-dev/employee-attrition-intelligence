from fastapi import FastAPI
from pydantic import BaseModel

from src.predict import predict_attrition


app = FastAPI(
    title="Employee Attrition Intelligence API",
    version="1.0.0"
)


class EmployeeInput(BaseModel):
    Age: int
    Gender: str
    City: str
    Education_Level: str
    Salary: float

    Joining_Designation: int
    Designation: int

    Total_Business_Value: float
    Quarterly_Rating: int

    Tenure_Months: int
    Previous_Rating: float | None = None
    Rating_Change: float | None = None

    Previous_Business_Value: float | None = None
    Business_Value_Change: float | None = None


@app.get("/")
def home():
    return {
        "message": "Employee Attrition Intelligence API is running"
    }


@app.post("/predict")
def predict(employee: EmployeeInput):

    employee_data = {
        "Age": employee.Age,
        "Gender": employee.Gender,
        "City": employee.City,
        "Education_Level": employee.Education_Level,
        "Salary": employee.Salary,

        "Joining Designation": employee.Joining_Designation,
        "Designation": employee.Designation,

        "Total Business Value": employee.Total_Business_Value,
        "Quarterly Rating": employee.Quarterly_Rating,

        "Tenure_Months": employee.Tenure_Months,
        "Previous_Rating": employee.Previous_Rating,
        "Rating_Change": employee.Rating_Change,

        "Previous_Business_Value": employee.Previous_Business_Value,
        "Business_Value_Change": employee.Business_Value_Change,
    }

    result = predict_attrition(employee_data)

    return result