import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer


NUMERICAL_FEATURES = [
    "Age",
    "Salary",
    "Joining Designation",
    "Designation",
    "Total Business Value",
    "Quarterly Rating",
    "Tenure_Months",
    "Previous_Rating",
    "Rating_Change",
    "Previous_Business_Value",
    "Business_Value_Change",
]

CATEGORICAL_FEATURES = [
    "Gender",
    "City",
    "Education_Level",
]


def build_preprocessor():

    numerical_pipeline = Pipeline(
        steps=[
            (
                "imputer",
                SimpleImputer(strategy="median")
            ),
            (
                "scaler",
                StandardScaler()
            ),
        ]
    )

    categorical_pipeline = Pipeline(
        steps=[
            (
                "imputer",
                SimpleImputer(strategy="most_frequent")
            ),
            (
                "encoder",
                OneHotEncoder(
                    handle_unknown="ignore"
                )
            ),
        ]
    )

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "num",
                numerical_pipeline,
                NUMERICAL_FEATURES
            ),
            (
                "cat",
                categorical_pipeline,
                CATEGORICAL_FEATURES
            ),
        ]
    )

    return preprocessor