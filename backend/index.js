const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

app.get("/api/employees", async (req, res) => {
    try {
        const employees = await Employee.findAll(); // Fetch employees from database
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// Start Server
const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
