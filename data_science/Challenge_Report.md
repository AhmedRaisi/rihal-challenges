
# Challenge Report: Predicting Used Car Prices

## Introduction
In this project, we aim to build a machine learning model to predict the prices of used cars. The data provided includes various features like manufacturer name, transmission type, color, odometer reading, and more. 

## Initial Data Exploration
The training dataset (`data_train.csv`) has been loaded and explored to gain an understanding of its structure and contents. Here are the first few rows of the dataset:

```plaintext
manufacturer_name transmission  color  odometer_value  ...  number_of_photos number_of_maintenance duration_listed  price_usd
0        Volkswagen    automatic  black          130000  ...                17                    38              67    13150.0
1           Renault       manual  brown          149000  ...                 9                     3             100     7500.0
2               Kia    automatic  brown          110000  ...                 5                    10              91    12200.0
3              Opel    automatic  other          255100  ...                10                     4              91     4950.0
4             Mazda       manual   blue          650000  ...                 5                     7              62     3000.0
```

## Missing Values Analysis
An essential step in data preprocessing is handling missing values. The initial check for missing values reveals the following:

```plaintext
manufacturer_name         0
transmission              0
color                     0
odometer_value            0
year_produced             0
engine_fuel               0
engine_type               0
engine_capacity          15
body_type                 0
has_warranty              0
ownership                 0
type_of_drive             0
is_exchangeable           0
number_of_photos          0
number_of_maintenance     0
duration_listed           0
price_usd                 0
```

We observed that the `engine_capacity` column has 15 missing values. Addressing these missing values is crucial for the accuracy of the predictive model.

## Model Training and Evaluation

### Model Selection
A RandomForestRegressor model with 100 trees was chosen for this task, considering its efficacy in handling non-linear data and its robustness to overfitting compared to other algorithms.

### Model Performance
The model's performance was evaluated using the Mean Absolute Error (MAE) metric. The results are as follows:

- **Validation MAE**: 759.53
- **Test MAE**: 3757.10

### Observations
- The validation MAE indicates that, on average, the model's predictions on the validation set are off by approximately $759.53.
- The test MAE is significantly higher, suggesting that the model may not generalize well to unseen data, indicating potential overfitting or differences in the data distribution between training and test datasets.

## Extended Findings and Exploration

### Data Preprocessing
- Implemented KNN imputation for missing values in the `engine_capacity` column to preserve data integrity.
- Conducted one-hot encoding for categorical variables, transforming them into a format suitable for machine learning models.
- Created a new feature, `car_age`, derived from the `year_produced` column, to capture the potential impact of a car's age on its price.

### Advanced Model Evaluation
- Introduced standard scaling to normalize feature values, enhancing model performance, especially for algorithms sensitive to variable scales.
- Employed cross-validation for the RandomForest model, obtaining a more robust estimate of the model's performance.

### Additional Model Testing
- Explored Gradient Boosting as an alternative model, tuning its parameters using GridSearchCV to find the optimal settings.
- Tested a simpler Linear Regression model as a baseline to understand the problem's complexity.

### Feature Importance Analysis
- Analyzed and visualized the feature importances in the RandomForest model, gaining insights into which features most significantly impact car price predictions.

### Overfitting Investigation
- Noted a significant difference in performance between the training/validation sets and the test set for the RandomForest model, indicating overfitting.
- Compared the RandomForest model's performance against the simpler Linear Regression and the tuned Gradient Boosting model to understand model complexities and overfitting tendencies.

## Conclusion and Next Steps
The initial model has shown a discrepancy in performance between the validation and test sets, which warrants further investigation and model refinement. Potential next steps include:

- **Overfitting Check**: Investigating the model for overfitting and trying techniques like cross-validation for more robust evaluation.
- **Feature Engineering**: Exploring advanced feature engineering techniques to improve model performance.
- **Hyperparameter Tuning**: Experimenting with different hyperparameters of the RandomForestRegressor to optimize the model.
- **Model Comparison**: Testing other regression models to find a better fit for this data.

This challenge has been an invaluable experience in applying comprehensive data science techniques, from advanced preprocessing and feature engineering to complex model evaluation and tuning.
