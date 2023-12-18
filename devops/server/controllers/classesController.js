// controllers/classesController.js
const Class = require('../models/Class');
const Student = require('../models/Student');


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
    const result = await Class.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Class deleted' });
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Endpoint to get student count per class
exports.getStudentCountPerClass = async (req, res) => {
  try {
    const studentCount = await Student.aggregate([
      { $group: { _id: "$class_id", count: { $sum: 1 } } },
      { $lookup: { from: "classes", localField: "_id", foreignField: "_id", as: "class" } },
      { $unwind: "$class" },
      { $project: { _id: 0, class: "$class.class_name", count: 1 } }
    ]);
    res.json(studentCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
