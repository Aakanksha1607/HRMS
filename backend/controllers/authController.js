const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// User Signup
exports.signup = async (req, res) => {
  const { name, emp_id, mobile, email, designation, password } = req.body;

  // Validate input fields
  if (!name || !emp_id || !mobile || !email || !designation || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if employee already exists
    db.query(
      "SELECT * FROM employees WHERE emp_id = ? OR email = ?",
      [emp_id, email],
      async (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Database error", error: err });

        if (results.length > 0) {
          return res
            .status(400)
            .json({ message: "Employee ID or Email already exists" });
        }

        // Ensure password is a valid string before hashing
        if (typeof password !== "string" || password.trim() === "") {
          return res.status(400).json({ message: "Invalid password format" });
        }

        // Hash the password safely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into MySQL database
        db.query(
          "INSERT INTO employees (name, emp_id, mobile, email, designation, password) VALUES (?, ?, ?, ?, ?, ?)",
          [name, emp_id, mobile, email, designation, hashedPassword],
          (err, result) => {
            if (err)
              return res
                .status(500)
                .json({ message: "Database error", error: err });

            res.status(201).json({ message: "User registered successfully" });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// User Login
exports.login = (req, res) => {
  const { emp_id, password } = req.body;

  db.query(
    "SELECT * FROM employees WHERE emp_id = ?",
    [emp_id],
    async (err, results) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid Employee ID or Password" });
      }

      const user = results[0];

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid Employee ID or Password" });
      }

      // Generate Token
      const token = jwt.sign(
        { id: user.id, emp_id: user.emp_id },
        process.env.SECRET_KEY,
        { expiresIn: "5h" }
      );

      res.status(200).json({ message: "Login successful", token, user });
    }
  );
};
