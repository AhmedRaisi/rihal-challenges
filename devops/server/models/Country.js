const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Enable timestamps

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
