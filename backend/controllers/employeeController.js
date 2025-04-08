// controllers/employeeController.js
const supabase = require('../config/supabaseClient');

const xlsx = require('xlsx');
const fs = require('fs');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  const { data, error } = await supabase.from('employees').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('employees').select('*').eq('empid', id).single();
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
  const { data, error } = await supabase.from('employees').update(updatedData).eq('empid', id).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('employees').delete().eq('empid', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Employee deleted successfully' });
};

exports.searchEmployee = async (req, res) => {
  const { empid, name, contact, designation } = req.query;

  let query = supabase.from('employees').select('*');

  if (empid) {
    query = query.ilike('empid', `%${empid}%`);
  } else if (name) {
    query = query.ilike('name', `%${name}%`);
  } else if (contact) {
    query = query.ilike('contact', `%${contact}%`);
  } else if (designation) {
    query = query.ilike('designation', `%${designation}%`);
  } else {
    return res.status(400).json({ message: 'No valid search parameter provided' });
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ message: 'Search failed', error });
  }

  res.status(200).json(data);
};



// // Assuming in-memory storage for now
// let employees = []; // You can replace with DB logic

exports.bulkUploadEmployees = (req, res) => {
  const filePath = req.file?.path;

  if (!filePath) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);

    rows.forEach(row => {
      const emp = {
        empid: row.empid || row.EmpID,
        name: row.name || row.Name,
        contact: row.contact || row.Contact,
        designation: row.designation || row.Designation,
      };

      // Optional: prevent duplicates
      const exists = employees.some(e => e.empid === emp.empid);
      if (emp.empid && !exists) {
        employees.push(emp);
      }
    });

    fs.unlinkSync(filePath); // delete file after processing
    res.status(200).json({ message: 'Employees uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing file.' });
  }
};
