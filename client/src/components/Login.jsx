// // import { useState } from "react";
// // import { login } from "../api";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //     const [formData, setFormData] = useState({ emp_id: "", password: "" });
// //     const [error, setError] = useState("");
// //     const navigate = useNavigate();

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const res = await login(formData);
// //             alert("Login successful! Redirecting to dashboard...");
// //             navigate("/dashboard");
// //         } catch (err) {
// //             setError(err.response?.data?.message || "Login failed");
// //         }
// //     };

// //     return (
// //         <div className="flex items-center justify-center h-screen">
// //             <form className="bg-white shadow-lg p-6 rounded-lg" onSubmit={handleSubmit}>
// //                 <h2 className="text-2xl font-bold mb-4">Login</h2>
// //                 <input type="text" name="emp_id" placeholder="Employee ID" className="input" onChange={handleChange} required />
// //                 <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} required />
// //                 {error && <p className="text-red-500">{error}</p>}
// //                 <button type="submit" className="btn">Login</button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default Login;

// import { useState } from "react";
// import { login } from "../api";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [formData, setFormData] = useState({ emp_id: "", password: "" });
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await login(formData);
//             localStorage.setItem("token", res.data.token);
//             alert("Login successful! Redirecting to dashboard...");
//             navigate("/dashboard");
//         } catch (err) {
//             setError(err.response?.data?.message || "Login failed");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center h-screen">
//             <form className="bg-white shadow-lg p-6 rounded-lg" onSubmit={handleSubmit}>
//                 <h2 className="text-2xl font-bold mb-4">Login</h2>
//                 <input type="text" name="emp_id" placeholder="Employee ID" className="input" onChange={handleChange} required />
//                 <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} required />
//                 {error && <p className="text-red-500">{error}</p>}
//                 <button type="submit" className="btn">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";

const Login = () => {
  const [formData, setFormData] = useState({ emp_id: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="emp_id" placeholder="Employee ID" className="w-full p-2 mb-3 border rounded" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-3 border rounded" onChange={handleChange} required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
        <p className="mt-4 text-center">Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
