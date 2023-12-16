// controllers/studentsController.js
const Student = require('../models/Student');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    // If you want to populate the class and country details, use .populate('class_id country_id')
    const students = await Student.find().populate('class_id country_id');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single student by id
exports.getStudentById = async (req, res) => {
  try {
    // Populate to get the class and country documents instead of just the ObjectId
    const student = await Student.findById(req.params.id).populate('class_id country_id');
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  const student = new Student({
    name: req.body.name,
    date_of_birth: req.body.date_of_birth,
    class_id: req.body.class_id,
    country_id: req.body.country_id
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing student by id
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.name = req.body.name;
      student.date_of_birth = req.body.date_of_birth;
      student.class_id = req.body.class_id;
      student.country_id = req.body.country_id;

      const updatedStudent = await student.save();
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student by id
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      await student.remove();
      res.json({ message: 'Student deleted' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
