#!/bin/bash

# Run the seed script
echo "Creating seed data..."
node seed.js

# Then start the application
echo "Starting the app..."
node app.js
