import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error
import matplotlib.pyplot as plt
from sklearn.impute import KNNImputer
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

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

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)

# Initialize and train the RandomForest model
model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
model_rf.fit(X_train_scaled, y_train)

# Perform cross-validation
scores = cross_val_score(model_rf, X_train_scaled, y_train, cv=5, scoring='neg_mean_absolute_error')
cross_val_mae = -scores.mean()
print(f"Random Forest Cross-Validation MAE: {cross_val_mae}")

# Make predictions on the validation set
val_predictions_rf = model_rf.predict(X_val_scaled)

# Calculate MAE on the validation set
val_mae_rf = mean_absolute_error(y_val, val_predictions_rf)
print(f"Random Forest Validation MAE: {val_mae_rf}")

# Feature importance analysis
importances = model_rf.feature_importances_
feature_importances = pd.Series(importances, index=X_train.columns)
feature_importances_plot = feature_importances.nlargest(10).plot(kind='barh')
plt.savefig('rf_feature_importances.png')

# Preprocess the test set
test_df_processed = test_df.ffill().pipe(pd.get_dummies, columns=categorical_columns)
test_df_processed = test_df_processed.reindex(columns=train_df.columns, fill_value=0).drop(columns=['price_usd'])

# Scale test set
test_df_scaled = scaler.transform(test_df_processed)

# Make final predictions on the test set using Random Forest
test_predictions_rf = model_rf.predict(test_df_scaled)

# Calculate MAE on the test set
test_mae_rf = mean_absolute_error(test_df['price_usd'], test_predictions_rf)
print(f"Random Forest Test MAE: {test_mae_rf}")

# Trying Gradient Boosting for comparison
gb_model = GradientBoostingRegressor()

# Define the parameters for GridSearchCV
parameters = {'n_estimators': [100, 200], 'learning_rate': [0.01, 0.1]}

# Perform Grid Search
grid_search = GridSearchCV(gb_model, parameters, cv=3, scoring='neg_mean_absolute_error')
grid_search.fit(X_train_scaled, y_train)

# Extract the best parameters
best_params = grid_search.best_params_
print("Best parameters for Gradient Boosting:", best_params)

# Train and evaluate Gradient Boosting with the best parameters
model_gb = GradientBoostingRegressor(n_estimators=best_params['n_estimators'], 
                                     learning_rate=best_params['learning_rate'])
model_gb.fit(X_train_scaled, y_train)

# Make predictions on the validation set using Gradient Boosting
val_predictions_gb = model_gb.predict(X_val_scaled)

# Calculate MAE on the validation set
val_mae_gb = mean_absolute_error(y_val, val_predictions_gb)
print(f"Gradient Boosting Validation MAE: {val_mae_gb}")

# Linear Regression Model
model_lr = LinearRegression()
model_lr.fit(X_train_scaled, y_train)

# Make predictions on the validation set using Linear Regression
val_predictions_lr = model_lr.predict(X_val_scaled)

# Calculate MAE on the validation set
val_mae_lr = mean_absolute_error(y_val, val_predictions_lr)
print(f"Linear Regression Validation MAE: {val_mae_lr}")

# Compare performance
print("Comparing model performance to check for overfitting:")
print(f"Random Forest - Validation MAE: {val_mae_rf}, Test MAE: {test_mae_rf}")
print(f"Gradient Boosting - Validation MAE: {val_mae_gb}")
print(f"Linear Regression - Validation MAE: {val_mae_lr}")
