// routes/employees.js
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();
const employeeController = require('../controllers/employeeController');

// search
router.get('/search', employeeController.searchEmployee);

// CRUD endpoints
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.createEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
// Bulk upload route
router.post('/bulk-upload', upload.single('file'), employeeController.bulkUploadEmployees);


module.exports = router;
