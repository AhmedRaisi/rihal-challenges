const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  class_name: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Enable timestamps

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
