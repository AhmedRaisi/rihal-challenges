// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // Import the connection function

// Import routes
const classRoutes = require('./routes/classes');
const countryRoutes = require('./routes/countries');
const studentRoutes = require('./routes/students');

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Body parser middleware

// Database connection
connectDB(); // Call the function to connect to the database


// Use routes
app.use('/classes', classRoutes);
app.use('/countries', countryRoutes);
app.use('/students', studentRoutes);

// Root route for a simple health check
app.get('/', (req, res) => {
  res.send('Welcome to the Rihal Challenge API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
