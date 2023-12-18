// routes/classes.js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classesController');


// Get students per class
router.get('/student-class-count', classController.getStudentCountPerClass);

// Get all classes
router.get('/', classController.getAllClasses);

// Get a single class by id
router.get('/:id', classController.getClassById);

// Create a new class
router.post('/', classController.createClass);

// Update an existing class by id
router.put('/:id', classController.updateClass);

// Delete a class by id
router.delete('/:id', classController.deleteClass);


module.exports = router;
