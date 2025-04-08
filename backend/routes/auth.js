const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const supabase = require('../config/supabaseClient');

// 🔐 Signup Route
router.post('/signup', async (req, res) => {
  const { empid, name, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('signup')
    .insert([{ empid, name, password: hashedPassword }]);

  if (error) {
    return res.status(500).json({ message: 'Signup failed', error });
  }

  res.status(201).json({ message: 'Signup successful', data });
});

// 🔑 Login Route
router.post('/login', async (req, res) => {
  const { empid, password } = req.body;

  const { data: signupUser, error: signupError } = await supabase
    .from('signup')
    .select('*')
    .eq('empid', empid)
    .single();

  if (signupError || !signupUser) {
    return res.status(401).json({ message: 'Invalid empid' });
  }

  const isMatch = await bcrypt.compare(password, signupUser.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  const { data: employeeDetails, error: employeeError } = await supabase
    .from('employees')
    .select('*')
    .eq('empid', empid)
    .single();

  if (employeeError || !employeeDetails) {
    return res.status(500).json({ message: 'Employee details not found' });
  }

  res.status(200).json({
    message: 'Login successful',
    employee: employeeDetails
  });
});

module.exports = router;
