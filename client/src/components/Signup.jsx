// import { useState } from "react";
// import { signup } from "../api";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         emp_id: "",
//         mobile: "",
//         email: "",
//         designation: "",
//         password: "",
//         confirmPassword: "",
//     });

//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (formData.password !== formData.confirmPassword) {
//             setError("Passwords do not match!");
//             return;
//         }
//         try {
//             await signup(formData);
//             alert("Signup successful! Redirecting to login...");
//             navigate("/login"); // Redirect to login page
//         } catch (err) {
//             setError(err.response?.data?.message || "Signup failed");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center h-screen">
//             <form className="bg-white shadow-lg p-6 rounded-lg" onSubmit={handleSubmit}>
//                 <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//                 <input type="text" name="name" placeholder="Full Name" className="input" onChange={handleChange} required />
//                 <input type="text" name="emp_id" placeholder="Employee ID" className="input" onChange={handleChange} required />
//                 <input type="text" name="mobile" placeholder="Mobile" className="input" onChange={handleChange} required />
//                 <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} required />
//                 <input type="text" name="designation" placeholder="Designation" className="input" onChange={handleChange} required />
//                 <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} required />
//                 <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input" onChange={handleChange} required />
//                 {error && <p className="text-red-500">{error}</p>}
//                 <button type="submit" className="btn">Sign Up</button>
//             </form>
//         </div>
//     );
// };

// export default Signup;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api";

const Signup = () => {
  const [formData, setFormData] = useState({
    emp_id: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="emp_id"
            placeholder="User ID"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
            required
          />
           <input
            type="text"
            name="name"
            placeholder="mobile"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
            required
          />
         
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
            required
          />
           <input
            type="text"
            name="name"
            placeholder="Designation"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
            required
          />
           <input
            type="password"
            name="confirm password"
            placeholder="Confirm Password"
            className="w-full p-2 mb-3 border rounded"
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
