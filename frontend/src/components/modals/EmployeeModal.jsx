
// components/modals/EmployeeModal.js
import React, { useState, useEffect } from 'react';

const EmployeeModal = ({ employee, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});

  useEffect(() => {
    setEditedEmployee({ ...employee });
  }, [employee]);

  const handleChange = (e) => {
    setEditedEmployee({
      ...editedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    await onSave(editedEmployee);
    alert('Employee details saved successfully!');
    setIsEditing(false);
    onClose();
  };
  

  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-h-[85vh] w-full max-w-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <h2 className="text-2xl font-bold mb-4">Employee Details</h2>

        <div className="space-y-4">
          {/* EMPLOYEE ID */}
          <div>
            <label className="block font-medium">Employee ID:</label>
            <input
              type="text"
              name="empid"
              value={editedEmployee.empid}
              disabled
              className="w-full border p-2 rounded bg-gray-200 cursor-not-allowed"
            />
          </div>

          {/* NAME */}
          <div>
            <label className="block font-medium">Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedEmployee.name || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded">{employee.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block font-medium">Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedEmployee.email || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded">{employee.email}</p>
            )}
          </div>
          {/* CONTACT */}
          <div>
            <label className="block font-medium">Contact:</label>
            {isEditing ? (
              <input
                type="text"
                name="contact"
                value={editedEmployee.contact || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded">{employee.contact}</p>
            )}
          </div>
          {/* ADDRESS */}
          <div>
            <label className="block font-medium">Address:</label>
            {isEditing ? (
              <textarea
                name="address"
                value={editedEmployee.address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded">{employee.address}</p>
            )}
          </div>

          {/* DESIGNATION */}
          <div>
            <label className="block font-medium">Designation:</label>
            {isEditing ? (
              <input
                type="text"
                name="designation"
                value={editedEmployee.designation || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded">{employee.designation}</p>
            )}
          </div>

          {/* REPORTING MANAGER */}
          <div>
            <label className="block font-medium">Reporting Manager:</label>
            {isEditing ? (
              <input
                type="text"
                name="reporting_manager"
                value={editedEmployee.reporting_manager || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded">{employee.reporting_manager}</p>
            )}
          </div>

          {/* JOINING DATE */}
          <div>
            <label className="block font-medium">Joining Date:</label>
            {isEditing ? (
              <input
                type="date"
                name="joining_date"
                value={editedEmployee.joining_date || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded">{employee.joining_date}</p>
            )}
          </div>

          {/* EMERGENCY CONTACT */}
          <div>
            <label className="block font-medium">Emergency Contact:</label>
            {isEditing ? (
              <input
                type="text"
                name="emergency_contact"
                value={editedEmployee.emergency_contact || ""} 
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded">{employee.emergency_contact}</p>
            )}
          </div>

          {/* EMERGENCY RELATION */}
          <div>
            <label className="block font-medium">Emergency Relation:</label>
            {isEditing ? (
              <input
                type="text"
                name="emergency_relation"
                value={editedEmployee.emergency_relation || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded">{employee.emergency_relation}</p>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}

          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;

