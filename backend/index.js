
const express = require('express');
const app = express();
const employeeRoutes = require('./routes/employees');
require('dotenv').config();

app.use(express.json());

// Route prefix
app.use('/api/employees', employeeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
