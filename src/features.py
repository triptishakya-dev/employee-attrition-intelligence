import pandas as pd


def create_features(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    # Convert date columns
    df["MMM-YY"] = pd.to_datetime(df["MMM-YY"])
    df["Dateofjoining"] = pd.to_datetime(df["Dateofjoining"])
    df["LastWorkingDate"] = pd.to_datetime(df["LastWorkingDate"])

    # Sort employee history
    df = df.sort_values(["Emp_ID", "MMM-YY"])

    # Tenure
    df["Tenure_Months"] = (
        (df["MMM-YY"].dt.year - df["Dateofjoining"].dt.year) * 12
        + (df["MMM-YY"].dt.month - df["Dateofjoining"].dt.month)
    )

    # Previous rating
    df["Previous_Rating"] = (
        df.groupby("Emp_ID")["Quarterly Rating"]
        .shift(1)
    )

    # Rating change
    df["Rating_Change"] = (
        df["Quarterly Rating"]
        - df["Previous_Rating"]
    )

    # Previous business value
    df["Previous_Business_Value"] = (
        df.groupby("Emp_ID")["Total Business Value"]
        .shift(1)
    )

    # Business value change
    df["Business_Value_Change"] = (
        df["Total Business Value"]
        - df["Previous_Business_Value"]
    )

    return df