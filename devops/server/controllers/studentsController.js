// controllers/studentsController.js
const Student = require('../models/Student');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('class_id country_id');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single student by id
exports.getStudentById = async (req, res) => {
  try {
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
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.name = req.body.name;
    student.date_of_birth = req.body.date_of_birth;
    student.class_id = req.body.class_id;
    student.country_id = req.body.country_id;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student by id
exports.deleteStudent = async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Student deleted' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Endpoint to get the average age of students
exports.getAverageAgeOfStudents = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const students = await Student.find();
    const totalAge = students.reduce((acc, student) => acc + (currentYear - student.date_of_birth.getFullYear()), 0);
    const averageAge = totalAge / students.length;
    res.json({ averageAge: averageAge });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


