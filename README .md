# Employee Attrition Intelligence — Machine Learning Prediction System

> An end-to-end **Employee Attrition Prediction Machine Learning project** that analyzes historical employee data, predicts whether an employee is likely to leave within the next 3 months, and explains the prediction using **SHAP explainability**.

This project is designed as a practical, portfolio-ready Machine Learning system covering the complete workflow from **EDA, feature engineering, preprocessing, model training, hyperparameter tuning, explainability, model persistence, prediction engine, and FastAPI deployment**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Business Use Case](#business-use-case)
- [Key Features](#key-features)
- [Machine Learning Workflow](#machine-learning-workflow)
- [Dataset](#dataset)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Exploratory Data Analysis](#exploratory-data-analysis)
- [Feature Engineering](#feature-engineering)
- [Target Definition](#target-definition)
- [Data Preprocessing](#data-preprocessing)
- [Train-Test Strategy](#train-test-strategy)
- [Models Trained](#models-trained)
- [Model Evaluation](#model-evaluation)
- [Hyperparameter Tuning](#hyperparameter-tuning)
- [Final Model](#final-model)
- [Feature Importance](#feature-importance)
- [SHAP Explainability](#shap-explainability)
- [Prediction Engine](#prediction-engine)
- [FastAPI](#fastapi)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [API Usage](#api-usage)
- [Example Prediction](#example-prediction)
- [Future Improvements](#future-improvements)
- [Tech Stack](#tech-stack)
- [SEO Keywords](#seo-keywords)

---

## Project Overview

The goal of this project is to build a production-style **Employee Attrition Prediction System** using Machine Learning.

Instead of only predicting whether an employee has already left, this system is designed to answer a more useful business question:

> **Will this employee leave the company within the next 3 months?**

The application uses monthly employee history such as:

- Age
- Gender
- City
- Education Level
- Salary
- Joining Designation
- Current Designation
- Quarterly Rating
- Total Business Value
- Tenure
- Previous Rating
- Rating Change
- Previous Business Value
- Business Value Change

The final model returns:

- Attrition probability
- Risk percentage
- Risk level
- Prediction
- Explainable risk factors

---

## Business Use Case

Employee attrition can create significant operational and financial impact for organizations.

Replacing an employee may involve:

- Recruitment cost
- Training cost
- Productivity loss
- Knowledge loss
- Project delays
- Team disruption

This project helps HR and management teams identify employees who may be at higher risk of leaving.

### Example Business Workflow

```text
Employee Data
    ↓
Machine Learning Model
    ↓
Attrition Risk Score
    ↓
LOW / MEDIUM / HIGH Risk
    ↓
Explainable Risk Factors
    ↓
HR Review / Retention Action
```

### Potential Business Applications

- Employee retention analytics
- HR risk monitoring
- Workforce planning
- Employee engagement strategy
- Performance trend analysis
- Early attrition warning systems
- Talent management dashboards
- People analytics platforms

> Important: Predictions should support HR decision-making, not replace human judgment. Model outputs indicate patterns and associations, not causal explanations.

---

## Key Features

- End-to-end Machine Learning workflow
- Exploratory Data Analysis
- Employee-level and monthly historical analysis
- Future attrition prediction
- 3-month prediction horizon
- Feature engineering
- Employee-based train/test split
- Missing value handling
- Numerical scaling
- Categorical encoding
- Logistic Regression
- Decision Tree
- Random Forest
- XGBoost
- Hyperparameter tuning
- Precision / Recall / F1 / ROC-AUC evaluation
- Feature importance analysis
- SHAP global explainability
- SHAP individual prediction explanation
- Saved ML pipeline
- Reusable prediction engine
- FastAPI prediction endpoint
- Risk score and risk level output

---

## Machine Learning Workflow

```text
1. Raw Employee Dataset
        ↓
2. Data Understanding & EDA
        ↓
3. Feature Engineering
        ↓
4. Future Attrition Target Creation
        ↓
5. Employee-Based Train/Test Split
        ↓
6. Preprocessing Pipeline
        ↓
7. Train Multiple ML Models
        ↓
8. Model Evaluation
        ↓
9. Model Comparison
        ↓
10. Hyperparameter Tuning
        ↓
11. Final Model Selection
        ↓
12. Feature Importance
        ↓
13. SHAP Explainability
        ↓
14. Save ML Pipeline
        ↓
15. Prediction Engine
        ↓
16. FastAPI
        ↓
17. Dashboard / Production Application
```

---

## Dataset

The project uses an employee attrition dataset downloaded from Kaggle.

The raw dataset contains approximately:

```text
19,104 monthly records
2,381 unique employees
13 original columns
```

Example columns:

```text
MMM-YY
Emp_ID
Age
Gender
City
Education_Level
Salary
Dateofjoining
LastWorkingDate
Joining Designation
Designation
Total Business Value
Quarterly Rating
```

The dataset is longitudinal, meaning the same employee can appear multiple times across different months.

Example:

```text
Emp_ID   Month       Rating
25       2016-01     3
25       2016-02     3
25       2016-03     4
...
```

This makes the project more realistic because the model can learn from employee behavior over time.

---

## Project Architecture

```text
                    ┌────────────────────┐
                    │ Employee Dataset   │
                    └──────────┬─────────┘
                               ↓
                    ┌────────────────────┐
                    │ Feature Engineering│
                    └──────────┬─────────┘
                               ↓
                    ┌────────────────────┐
                    │ Preprocessing      │
                    │ Pipeline           │
                    └──────────┬─────────┘
                               ↓
              ┌────────────────────────────────┐
              │ Machine Learning Models        │
              │                                │
              │ Logistic Regression            │
              │ Decision Tree                  │
              │ Random Forest                  │
              │ XGBoost                        │
              └───────────────┬────────────────┘
                              ↓
                    ┌────────────────────┐
                    │ Model Evaluation   │
                    └──────────┬─────────┘
                               ↓
                    ┌────────────────────┐
                    │ Tuned Random Forest│
                    └──────────┬─────────┘
                               ↓
                    ┌────────────────────┐
                    │ SHAP Explainability│
                    └──────────┬─────────┘
                               ↓
                    ┌────────────────────┐
                    │ Saved ML Pipeline  │
                    └──────────┬─────────┘
                               ↓
                    ┌────────────────────┐
                    │ FastAPI /predict   │
                    └──────────┬─────────┘
                               ↓
                    ┌────────────────────┐
                    │ Risk Prediction    │
                    └────────────────────┘
```

---

## Folder Structure

```text
employee-attrition/
│
├── api/
│   └── main.py
│
├── dashboard/
│
├── data/
│   ├── raw/
│   │   ├── train_data.csv
│   │   ├── test_data.csv
│   │   └── sample_submission.csv
│   │
│   └── processed/
│
├── models/
│   ├── preprocessor.pkl
│   ├── attrition_model.pkl
│   └── attrition_pipeline.pkl
│
├── notebooks/
│   └── 01_eda.ipynb
│
├── src/
│   ├── __init__.py
│   ├── evaluate.py
│   ├── features.py
│   ├── predict.py
│   ├── preprocessing.py
│   └── train.py
│
├── tests/
│
├── .gitignore
├── README.md
└── requirements.txt
```

---

## Exploratory Data Analysis

The EDA phase was used to understand:

- Dataset dimensions
- Unique employees
- Missing values
- Duplicate values
- Attrition distribution
- Quarterly Rating vs attrition
- Salary vs attrition
- Tenure vs attrition
- Rating Change vs attrition
- Business Value vs attrition

### Key Findings

The model development process found several strong associations with future attrition.

#### Quarterly Rating

Employees with lower ratings showed significantly higher future attrition.

Observed attrition percentages:

```text
Quarterly Rating 1 → ~44.94%
Quarterly Rating 2 → ~12.70%
Quarterly Rating 3 → ~5.03%
Quarterly Rating 4 → ~2.73%
```

#### Salary

Employees predicted to leave had lower average and median salary.

```text
Stayed:
Mean salary   ≈ 68,535
Median salary ≈ 63,918

Future Leavers:
Mean salary   ≈ 56,036
Median salary ≈ 52,196
```

#### Tenure

Short-tenure employees showed higher attrition.

```text
Stayed:
Mean tenure   ≈ 22.44 months
Median tenure ≈ 13 months

Future Leavers:
Mean tenure   ≈ 11.50 months
Median tenure ≈ 5 months
```

#### Rating Change

Declining ratings were associated with increasing attrition risk.

```text
Rating Change -3 → ~40.38%
Rating Change -2 → ~31.02%
Rating Change -1 → ~27.45%
Rating Change  0 → ~23.90%
Rating Change +1 → ~6.47%
Rating Change +2 → ~4.17%
Rating Change +3 → ~5.26%
```

#### Business Value

Employees likely to leave had much lower business value and a negative business value trend.

```text
Will Stay:
Average Total Business Value  ≈ 696,727
Average Business Value Change ≈ +17,351

Will Leave:
Average Total Business Value  ≈ 154,459
Average Business Value Change ≈ -71,606
```

---

## Feature Engineering

The project creates additional behavioral and historical features.

### Tenure

```text
Tenure_Months
```

Represents how long the employee has been with the company at each monthly observation.

### Previous Rating

```text
Previous_Rating
```

Previous month's employee rating.

### Rating Change

```text
Rating_Change = Quarterly Rating - Previous Rating
```

Interpretation:

```text
< 0 → rating decreased
= 0 → rating unchanged
> 0 → rating improved
```

### Previous Business Value

```text
Previous_Business_Value
```

Previous month's business value.

### Business Value Change

```text
Business_Value_Change =
Total Business Value - Previous Business Value
```

This captures employee performance trends over time.

---

## Target Definition

The final target is:

```text
Will_Leave_Next_3_Months
```

Meaning:

```text
0 → employee is not expected to leave within the next 3 months
1 → employee leaves within the next 3 months
```

The target distribution was approximately:

```text
0 → 14,698 records → 76.94%
1 →  4,406 records → 23.06%
```

This creates a realistic binary classification problem with moderate class imbalance.

### Data Leakage Prevention

The following fields are not used as prediction features:

```text
LastWorkingDate
Employee_Leaving_Date
Three_Months_Later
Will_Leave_Next_3_Months
```

They contain direct or indirect information about the prediction target.

---

## Data Preprocessing

The preprocessing pipeline uses Scikit-learn.

### Numerical Features

Numerical fields are processed using:

```text
Median Imputation
        ↓
StandardScaler
```

### Categorical Features

Categorical fields are processed using:

```text
Most Frequent Imputation
        ↓
OneHotEncoder
```

The preprocessing and model are saved together inside one reusable ML pipeline.

---

## Train-Test Strategy

A normal random row split would create data leakage because one employee appears in multiple monthly records.

For example:

```text
Employee 25
Jan → Training
Feb → Training
Mar → Testing
```

This would allow the model to indirectly learn information about the same employee during training.

Therefore the project performs an **employee-based train/test split**.

```text
Training employees
        ≠
Testing employees
```

This provides a more realistic evaluation.

---

## Models Trained

Four Machine Learning classification models were trained:

### Logistic Regression

Used as a simple interpretable baseline.

### Decision Tree

Used to model non-linear decision boundaries.

### Random Forest

Used for stronger ensemble-based prediction and feature importance.

### XGBoost

Used as a gradient boosting model for higher predictive performance.

---

## Model Evaluation

The following metrics were used:

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC
- Confusion Matrix

### Initial Model Results

| Model | Accuracy | Precision | Recall | F1 | ROC-AUC |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 0.7090 | 0.4414 | **0.8087** | 0.5711 | 0.8099 |
| Decision Tree | 0.7334 | 0.4655 | 0.7629 | 0.5782 | 0.8173 |
| Random Forest | 0.7532 | 0.4902 | 0.7562 | **0.5948** | **0.8270** |
| XGBoost | **0.8068** | **0.6289** | 0.4720 | 0.5393 | 0.8201 |

### Important Observation

XGBoost achieved the highest accuracy and precision, but its recall was significantly lower.

For attrition prediction, recall is important because a false negative means:

> An employee actually leaves, but the system fails to identify them as high risk.

Therefore the final model should not be selected using accuracy alone.

---

## Hyperparameter Tuning

RandomizedSearchCV was used to optimize the strongest models.

### Tuned Random Forest

```text
Accuracy  : 77.38%
Precision : 52.00%
Recall    : 72.71%
F1 Score  : 60.63%
ROC-AUC   : 83.11%
```

### Tuned XGBoost

```text
Accuracy  : 78.99%
Precision : 55.34%
Recall    : 63.76%
F1 Score  : 59.25%
ROC-AUC   : 82.59%
```

---

## Final Model

The **Tuned Random Forest** was selected as the final model candidate.

Why?

- Better Recall than tuned XGBoost
- Better F1 Score
- Better ROC-AUC
- Strong balance between identifying high-risk employees and controlling false alerts

Final tuned Random Forest metrics:

```text
Accuracy  : 0.7738
Precision : 0.5200
Recall    : 0.7271
F1 Score  : 0.6063
ROC-AUC   : 0.8311
```

---

## Feature Importance

The most important model features included:

```text
1. Quarterly Rating
2. Total Business Value
3. Previous Rating
4. Tenure Months
5. Salary
6. Previous Business Value
7. Business Value Change
8. Age
9. Designation
10. Rating Change
```

Feature importance tells us which variables the Random Forest uses most heavily during predictions.

It does not prove causation.

---

## SHAP Explainability

SHAP is used to explain both:

### Global Model Behavior

Global SHAP analysis shows which variables influence the overall model.

For example:

```text
Low Quarterly Rating       → higher attrition risk
Low Total Business Value   → higher attrition risk
Low Previous Rating        → higher attrition risk
Shorter Tenure             → higher attrition risk
Lower Salary               → higher attrition risk
Declining Rating           → higher attrition risk
```

### Individual Prediction Explanation

For a specific employee, SHAP can explain how each feature pushed the prediction toward:

```text
Leave
```

or:

```text
Stay
```

Example:

```text
Risk Score: 92.9%

Major model contributors:
- Quarterly Rating
- Total Business Value
- Previous Rating
- Tenure
- Previous Business Value
- Salary
```

The correct wording is:

> **Factors contributing to this model prediction**

rather than:

> Reasons why the employee will leave

because SHAP explains model behavior, not causation.

---

## Prediction Engine

The reusable prediction engine is implemented in:

```text
src/predict.py
```

Example input:

```python
employee = {
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
```

Example output:

```json
{
  "risk_score": 0.8332,
  "risk_percent": 83.32,
  "risk_level": "HIGH",
  "prediction": "Potential Attrition"
}
```

---

## FastAPI

The Machine Learning pipeline is exposed through FastAPI.

### Start API

```bash
uvicorn api.main:app --reload
```

API runs at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Installation

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd employee-attrition
```

### 2. Create Virtual Environment

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

macOS / Linux:

```bash
python -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

Recommended packages include:

```text
pandas
numpy
matplotlib
scikit-learn
xgboost
shap
joblib
fastapi
uvicorn
jupyter
```

---

## How to Run

### Run EDA

```bash
jupyter notebook
```

Open:

```text
notebooks/01_eda.ipynb
```

### Train Model

```bash
python -m src.train
```

Example output:

```text
Loading dataset...
Dataset ready: (19104, 21)
Training model...
Test accuracy: 0.7669
Model saved:
models/attrition_pipeline.pkl
```

### Test Prediction Engine

```bash
python -m src.predict
```

### Start FastAPI

```bash
uvicorn api.main:app --reload
```

---

## API Usage

### Endpoint

```http
POST /predict
```

### Request

```json
{
  "Age": 29,
  "Gender": "Male",
  "City": "C13",
  "Education_Level": "Bachelor",
  "Salary": 35000,
  "Joining_Designation": 1,
  "Designation": 1,
  "Total_Business_Value": 100000,
  "Quarterly_Rating": 1,
  "Tenure_Months": 5,
  "Previous_Rating": 2,
  "Rating_Change": -1,
  "Previous_Business_Value": 150000,
  "Business_Value_Change": -50000
}
```

---

## Example Prediction

Example API response:

```json
{
  "risk_score": 0.8482,
  "risk_percent": 84.82,
  "risk_level": "HIGH",
  "prediction": "Potential Attrition"
}
```

Risk levels are currently interpreted as:

```text
LOW     → probability below 40%
MEDIUM  → probability between 40% and 70%
HIGH    → probability 70% or above
```

These thresholds can later be calibrated according to business requirements.

---

## Future Improvements

Planned improvements for the Employee Attrition Intelligence platform:

### Explainable API

Return SHAP factors directly from `/predict`.

Example:

```json
{
  "risk_percent": 84.82,
  "risk_level": "HIGH",
  "prediction": "Potential Attrition",
  "top_factors": [
    "Low quarterly rating",
    "Low business value",
    "Short tenure",
    "Lower salary"
  ]
}
```

### Dashboard

Build a Streamlit or web dashboard containing:

- Total employees
- High-risk employees
- Medium-risk employees
- Low-risk employees
- Attrition trend charts
- Feature importance
- Employee prediction form
- Individual SHAP explanation
- Employee risk history

### Database

PostgreSQL can store:

```text
employees
predictions
prediction_history
model_versions
```

### Production ML Improvements

- Threshold optimization
- Probability calibration
- Cross-validation by employee
- Time-based validation
- Model versioning
- MLflow experiment tracking
- Automated retraining
- Drift detection
- Data validation
- Docker deployment
- CI/CD
- Cloud deployment

---

## Tech Stack

### Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- XGBoost
- SHAP

### API

- FastAPI
- Uvicorn
- Pydantic

### Visualization

- Matplotlib

### Model Persistence

- Joblib

### Development

- Jupyter Notebook
- VS Code
- Git
- GitHub

### Future Stack

- Streamlit
- PostgreSQL
- Docker
- MLflow
- AWS / GCP / Azure

---

## SEO Keywords

This repository is relevant for developers, students, recruiters, and researchers searching for:

- Employee Attrition Prediction Machine Learning Project
- Employee Attrition Prediction using Python
- HR Analytics Machine Learning Project
- Employee Turnover Prediction
- Employee Retention Prediction
- Machine Learning HR Analytics
- Random Forest Employee Attrition
- XGBoost Employee Attrition
- SHAP Explainable AI Project
- Explainable Machine Learning Project
- FastAPI Machine Learning Deployment
- End-to-End Machine Learning Project
- Intermediate Machine Learning Project
- Python Machine Learning Portfolio Project
- Employee Attrition Data Science Project
- Predict Employee Churn
- Workforce Analytics Machine Learning
- People Analytics Machine Learning Project

---

## Project Goal

The final goal of this project is to create an explainable Employee Attrition Intelligence system that can:

```text
Understand employee behavior
        ↓
Detect patterns
        ↓
Predict future attrition
        ↓
Calculate employee risk
        ↓
Explain model predictions
        ↓
Support better HR decisions
```

---

## Disclaimer

This project is intended for learning, experimentation, and decision-support use cases.

Employee-related Machine Learning systems should be reviewed for:

- Data quality
- Bias
- Fairness
- Privacy
- Explainability
- Appropriate human oversight

Predictions should not be used as the sole basis for employment-related decisions.

---

## License

Add the license appropriate for your repository, for example MIT License.

---

## Author

Add your name, GitHub profile, portfolio website, or contact information here.

