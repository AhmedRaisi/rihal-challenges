// routes/students.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');


// Get students average age
router.get('/average-age', studentController.getAverageAgeOfStudents);


// Get all students
router.get('/', studentController.getAllStudents);

// Get a single student by id
router.get('/:id', studentController.getStudentById);

// Create a new student
router.post('/', studentController.createStudent);

// Update an existing student by id
router.put('/:id', studentController.updateStudent);

// Delete a student by id
router.delete('/:id', studentController.deleteStudent);



module.exports = router;
