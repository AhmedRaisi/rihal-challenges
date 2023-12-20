import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error
import matplotlib.pyplot as plt
from sklearn.impute import KNNImputer

# Load the data
train_df = pd.read_csv('data_train.csv')
test_df = pd.read_csv('data_test.csv')

# Explore the first few rows
print(train_df.head())

# Check for missing values
print(train_df.isnull().sum())

# Fill missing values using KNN imputer for 'engine_capacity'
imputer = KNNImputer(n_neighbors=5)
train_df['engine_capacity'] = imputer.fit_transform(train_df[['engine_capacity']])

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

# Initialize the RandomForest model
model = RandomForestRegressor(n_estimators=100, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Perform cross-validation
scores = cross_val_score(model, X_train, y_train, cv=5, scoring='neg_mean_absolute_error')
cross_val_mae = -scores.mean()
print(f"Cross-Validation MAE: {cross_val_mae}")

# Make predictions on the validation set
val_predictions = model.predict(X_val)

# Calculate MAE on the validation set
val_mae = mean_absolute_error(y_val, val_predictions)
print(f"Validation MAE: {val_mae}")

# Feature importance analysis
importances = model.feature_importances_
feature_importances = pd.Series(importances, index=X_train.columns)
feature_importances_plot = feature_importances.nlargest(10).plot(kind='barh')
plt.savefig('feature_importances.png')

# Preprocess the test set
test_df.ffill(inplace=True)
test_df_processed = pd.get_dummies(test_df, columns=categorical_columns)
test_df_processed = test_df_processed.reindex(columns=train_df.columns, fill_value=0)
test_df_processed = test_df_processed.drop(columns=['price_usd'], errors='ignore')

# Make final predictions on the test set
test_predictions = model.predict(test_df_processed)

# Calculate MAE on the test set
test_mae = mean_absolute_error(test_df['price_usd'], test_predictions)
print(f"Test MAE: {test_mae}")

# Trying Gradient Boosting for comparison
gb_model = GradientBoostingRegressor()
parameters = {'n_estimators': [100, 200], 'learning_rate': [0.01, 0.1]}
grid_search = GridSearchCV(gb_model, parameters, cv=3, scoring='neg_mean_absolute_error')
grid_search.fit(X_train, y_train)
best_params = grid_search.best_params_
print("Best parameters for Gradient Boosting:", best_params)

# Train and evaluate Gradient Boosting with the best parameters
best_gb_model = GradientBoostingRegressor(n_estimators=best_params['n_estimators'], 
                                          learning_rate=best_params['learning_rate'])
best_gb_model.fit(X_train, y_train)
gb_val_predictions = best_gb_model.predict(X_val)
gb_val_mae = mean_absolute_error(y_val, gb_val_predictions)
print(f"Gradient Boosting Validation MAE: {gb_val_mae}")
