// controllers/classesController.js
const Class = require('../models/Class');

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single class by id
exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (classItem) {
      res.json(classItem);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new class
exports.createClass = async (req, res) => {
  const classItem = new Class({
    class_name: req.body.class_name
  });

  try {
    const newClass = await classItem.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing class by id
exports.updateClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (classItem) {
      classItem.class_name = req.body.class_name;
      const updatedClass = await classItem.save();
      res.json(updatedClass);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a class by id
exports.deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (classItem) {
      await classItem.remove();
      res.json({ message: 'Class deleted' });
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
