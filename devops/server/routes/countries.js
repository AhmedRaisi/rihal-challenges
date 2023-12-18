// routes/countries.js
const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countriesController');

// Get students per country
router.get('/student-country-count', countryController.getStudentCountPerCountry);

// Get all countries
router.get('/', countryController.getAllCountries);

// Get a single country by id
router.get('/:id', countryController.getCountryById);

// Create a new country
router.post('/', countryController.createCountry);

// Update an existing country by id
router.put('/:id', countryController.updateCountry);

// Delete a country by id
router.delete('/:id', countryController.deleteCountry);



module.exports = router;
