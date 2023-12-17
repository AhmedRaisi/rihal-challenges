import pandas as pd

# Load the data
train_df = pd.read_csv('path_to_train_dataset.csv')
test_df = pd.read_csv('path_to_test_dataset.csv')

# Explore the first few rows
train_df.head()

# Check for missing values
train_df.isnull().sum()

# Fill or drop missing values (example)
train_df.fillna(method='ffill', inplace=True)

# Convert categorical variables to numeric
train_df = pd.get_dummies(train_df, columns=['manufacturer_name', 'transmission', 'color', ...])

# Example: Create a car's age feature
train_df['car_age'] = 2023 - train_df['year_produced']

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

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
test_df_processed = pd.get_dummies(test_df, columns=['manufacturer_name', 'transmission', 'color', ...])
# Note: Ensure the test set has the same feature columns as the training set

# Make final predictions on the test set
test_predictions = model.predict(test_df_processed.drop('price_usd', axis=1))

# Calculate MAE on the test set
test_mae = mean_absolute_error(test_df_processed['price_usd'], test_predictions)
print(f"Test MAE: {test_mae}")
