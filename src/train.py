import joblib
import pandas as pd

from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

from src.features import create_features
from src.preprocessing import build_preprocessor


BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = BASE_DIR / "data" / "raw" / "train_data.csv"
MODEL_PATH = BASE_DIR / "models" / "attrition_pipeline.pkl"


FEATURE_COLUMNS = [
    "Age",
    "Gender",
    "City",
    "Education_Level",
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


def create_target(df):
    df = df.copy()

    df["Employee_Leaving_Date"] = (
        df.groupby("Emp_ID")["LastWorkingDate"]
        .transform("max")
    )

    df["Three_Months_Later"] = (
        df["MMM-YY"] + pd.DateOffset(months=3)
    )

    df["Will_Leave_Next_3_Months"] = (
        df["Employee_Leaving_Date"].notna()
        & (df["Employee_Leaving_Date"] > df["MMM-YY"])
        & (
            df["Employee_Leaving_Date"]
            <= df["Three_Months_Later"]
        )
    ).astype(int)

    return df


def train():
    print("Loading dataset...")

    df = pd.read_csv(DATA_PATH)

    df = create_features(df)
    df = create_target(df)

    print("Dataset ready:", df.shape)

    # Employee-based split
    employee_ids = df["Emp_ID"].unique()

    train_ids, test_ids = train_test_split(
        employee_ids,
        test_size=0.2,
        random_state=42,
    )

    train_df = df[df["Emp_ID"].isin(train_ids)].copy()
    test_df = df[df["Emp_ID"].isin(test_ids)].copy()

    X_train = train_df[FEATURE_COLUMNS]
    y_train = train_df["Will_Leave_Next_3_Months"]

    X_test = test_df[FEATURE_COLUMNS]
    y_test = test_df["Will_Leave_Next_3_Months"]

    preprocessor = build_preprocessor()

    model = RandomForestClassifier(
        n_estimators=500,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        max_features="sqrt",
        class_weight="balanced",
        random_state=42,
        n_jobs=-1,
    )

    pipeline = Pipeline([
        ("preprocessor", preprocessor),
        ("model", model),
    ])

    print("Training model...")

    pipeline.fit(X_train, y_train)

    score = pipeline.score(X_test, y_test)

    print("Test accuracy:", round(score, 4))

    MODEL_PATH.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    joblib.dump(
        pipeline,
        MODEL_PATH
    )

    print("Model saved:")
    print(MODEL_PATH)


if __name__ == "__main__":
    train()