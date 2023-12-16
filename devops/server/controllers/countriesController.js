// controllers/countriesController.js
const Country = require('../models/Country');

// Get all countries
exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single country by id
exports.getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new country
exports.createCountry = async (req, res) => {
  const country = new Country({
    name: req.body.name
  });

  try {
    const newCountry = await country.save();
    res.status(201).json(newCountry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing country by id
exports.updateCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (country) {
      country.name = req.body.name;
      const updatedCountry = await country.save();
      res.json(updatedCountry);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a country by id
exports.deleteCountry = async (req, res) => {
  try {
    const result = await Country.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Country deleted' });
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
