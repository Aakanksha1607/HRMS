import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Modal from "./Modal"; // Import the modal component

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/employees");
                setEmployees(res.data);
            } catch (err) {
                console.error("Error fetching employees:", err);
            }
        };
        fetchEmployees();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Employee Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                </button>
            </div>

            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Search by name or ID..."
                    className="border p-2 w-full rounded"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="ml-2 text-gray-500" />
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Emp ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Designation</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees
                        .filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.emp_id.includes(searchTerm))
                        .map(emp => (
                            <tr key={emp.emp_id} className="text-center">
                                <td className="border p-2">{emp.emp_id}</td>
                                <td className="border p-2">{emp.name}</td>
                                <td className="border p-2">{emp.email}</td>
                                <td className="border p-2">{emp.designation}</td>
                                <td className="border p-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                        onClick={() => setSelectedEmployee(emp)}
                                    >
                                        See More
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Modal */}
            {selectedEmployee && <Modal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />}
        </div>
    );
};

export default Dashboard;
