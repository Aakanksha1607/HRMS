// controllers/employeeController.js
const supabase = require('../config/supabaseClient');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  const { data, error } = await supabase.from('employees').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('employees').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

// Create new employee
exports.createEmployee = async (req, res) => {
  const employee = req.body;
  const { data, error } = await supabase.from('employees').insert([employee]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
};

// Update employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { data, error } = await supabase.from('employees').update(updatedData).eq('id', id).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('employees').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Employee deleted successfully' });
};
