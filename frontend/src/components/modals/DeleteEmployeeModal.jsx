import React, { useState, useEffect } from 'react';

const DeleteEmployeeModal = ({ isOpen, onClose, onConfirm, employee }) => {
  const [empIdInput, setEmpIdInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEmpIdInput('');
      setIsChecked(false);
      setError('');
    }
  }, [isOpen]);

  const handleDelete = () => {
    if (empIdInput !== employee.empid) {
      setError('Employee ID does not match.');
      return;
    }
    if (!isChecked) {
      setError('Please confirm by checking the box.');
      return;
    }

    onConfirm(employee.empid);
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Confirm Deletion</h2>

        <p className="mb-4">
          Are you sure you want to delete employee <strong>{employee.name}</strong> (ID: <strong>{employee.empid}</strong>)?
        </p>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Enter Employee ID to confirm:</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={empIdInput}
            onChange={(e) => setEmpIdInput(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="confirm-delete"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="confirm-delete" className="text-sm">I am sure I want to delete this employee.</label>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;
