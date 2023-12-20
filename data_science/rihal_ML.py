import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Load the data
train_df = pd.read_csv('data_train.csv')
test_df = pd.read_csv('data_test.csv')

# Explore the first few rows
print(train_df.head())

# Check for missing values
print(train_df.isnull().sum())

# Fill missing values
train_df.ffill(inplace=True)

# List of categorical columns to convert to dummies
categorical_columns = ['manufacturer_name', 'transmission', 'color', 
                       'engine_fuel', 'engine_type', 'body_type', 
                       'ownership', 'type_of_drive']

# Convert categorical variables to numeric
train_df = pd.get_dummies(train_df, columns=categorical_columns)

# Example: Create a car's age feature
train_df['car_age'] = 2023 - train_df['year_produced']

# Splitting the training set for validation
X = train_df.drop('price_usd', axis=1)
y = train_df['price_usd']
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the model
model = RandomForestRegressor(n_estimators=100, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Make predictions on the validation set
val_predictions = model.predict(X_val)

# Calculate MAE
val_mae = mean_absolute_error(y_val, val_predictions)
print(f"Validation MAE: {val_mae}")

# Preprocess the test set similarly to the training set
# Fill missing values in the test set
test_df.ffill(inplace=True)

# Convert categorical variables to numeric for the test set
test_df_processed = pd.get_dummies(test_df, columns=categorical_columns)

# Align the columns of test_df with train_df, adding missing columns filled with 0
test_df_processed = test_df_processed.reindex(columns=train_df.columns, fill_value=0)

# Drop the 'price_usd' column from test_df_processed if it's not needed for predictions
test_df_processed = test_df_processed.drop(columns=['price_usd'], errors='ignore')

# Make final predictions on the test set
test_predictions = model.predict(test_df_processed)

# Calculate MAE on the test set
# Assume 'original_test_df' is your original test dataset with the actual prices
# If the original test dataset contains the 'price_usd' column, use it for MAE calculation
test_mae = mean_absolute_error(test_df['price_usd'], test_predictions)
print(f"Test MAE: {test_mae}")
