
const express = require('express');
const cors = require('cors');
const app = express();
const employeeRoutes = require('./routes/employees');
const authRoutes = require('./routes/auth');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Route prefix
app.use('/api/employees', employeeRoutes);

// auth Routes

app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

