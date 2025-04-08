
import React, { useState } from 'react';
import axios from 'axios';
import EmployeeModal from './modals/EmployeeModal';
import DeleteEmployeeModal from './modals/DeleteEmployeeModal';
import AddEmployeeModal from './modals/AddEmployeeModal';


const SearchEmployee = () => {
  const [searchBy, setSearchBy] = useState('empid');
  const [searchInput, setSearchInput] = useState('');
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);


  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setSearchInput('');
    setEmployees([]);
    setError('');
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setError('Please enter a value to search.');
      setEmployees([]);
      return;
    }

    if (searchBy === 'empid' && isNaN(searchInput)) {
      setError('Employee ID must be a number.');
      setEmployees([]);
      return;
    }

    setError('');
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employees/search?${searchBy}=${searchInput}`
      );

      if (response.data && response.data.length > 0) {
        setEmployees(response.data);
      } else {
        setError('No matching employee found.');
        setEmployees([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Something went wrong while searching.');
      setEmployees([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSaveEmployee = async (updatedEmployee) => {
    try {
      await axios.put(`http://localhost:5000/api/employees/${updatedEmployee.empid}`, updatedEmployee);
      alert('Employee updated!');
    } catch (error) {
      alert('Failed to update employee!');
      console.error(error);
    }
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedEmployee(null);
  };

  const handleConfirmDelete = async (empid) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${empid}`);
      alert('Employee deleted successfully!');
      setShowDeleteModal(false);
      setSelectedEmployee(null);
      handleSearch();
    } catch (err) {
      console.error(err);
      alert('Failed to delete employee.');
    }
  };

  <div className="flex justify-end mb-4">
  <button
    onClick={() => setShowAddModal(true)}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    + Add Employee
  </button>
</div>


  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef4ed, #eef1fa)', // light orange to light blue
        backgroundAttachment: 'fixed',
        paddingTop: '40px'
      }}
    >
      <div className="p-6 max-w-3xl mx-auto bg-white bg-opacity-90 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-[#000053]">ADMIN DASHBOARD</h2>

        <div className="flex gap-3 items-center mb-6">
          <select
            value={searchBy}
            onChange={handleSearchByChange}
            className="border border-[#d1d5db] px-3 py-2 rounded-md"
          >
            <option value="empid">Search by ID</option>
            <option value="name">Search by Name</option>
            <option value="contact">Search by Contact</option>
            <option value="designation">Search by Designation</option>
          </select>

          <input
            type="text"
            placeholder={`Enter ${searchBy}`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="border border-[#d1d5db] px-4 py-2 rounded-md flex-1"
          />

          <button
            onClick={handleSearch}
            className="bg-[#ee751d] text-white px-4 py-2 rounded-md hover:bg-[#d46211]"
          >
            Search
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Employee
          </button>
        </div>


        {error && <p className="text-[#e11d48] mb-4">{error}</p>}

  

{employees.length > 0 && (
  <div className="overflow-x-auto rounded-lg shadow-md">
    <table className="w-full text-sm border border-[#d1d5db] rounded-md bg-white">
      <thead>
        <tr className="bg-[#000053] text-white">
          <th className="p-3 text-left">Emp ID</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Contact</th>
          <th className="p-3 text-left">Designation</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, idx) => (
          <tr
            key={emp.empid}
            className={`border-b border-[#e5e7eb] ${
              idx % 2 === 0 ? 'bg-[#f9fafb]' : 'bg-[#fff]'
            } hover:bg-[#fef4ed] transition duration-150`}
          >
            <td className="p-3">{emp.empid}</td>
            <td className="p-3">{emp.name}</td>
            <td className="p-3">{emp.contact}</td>
            <td className="p-3">{emp.designation}</td>
            <td className="p-3 space-x-2">
              <button
                className="bg-[#000053] text-white px-3 py-1 text-xs rounded hover:bg-[#1a1a73] transition"
                onClick={() => setSelectedEmployee(emp)}
              >
                See More
              </button>
              <button
                className="bg-[#e11d48] text-white px-3 py-1 text-xs rounded hover:bg-[#b91c39] transition"
                onClick={() => handleDeleteClick(emp)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
        {selectedEmployee && (
          <EmployeeModal
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
            onSave={handleSaveEmployee}
          />
        )}

        <DeleteEmployeeModal
          isOpen={showDeleteModal}
          employee={selectedEmployee}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
        <AddEmployeeModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchEmployee;
