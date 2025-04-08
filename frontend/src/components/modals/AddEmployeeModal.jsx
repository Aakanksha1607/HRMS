// import React, { useState } from 'react';
// import axios from 'axios';

// const AddEmployeeModal = ({ isOpen, onClose, onSuccess }) => {
//   const [activeTab, setActiveTab] = useState('manual');

//   // Manual form
//   const [formData, setFormData] = useState({
//     empid: '',
//     name: '',
//     contact: '',
//     designation: ''
//   });

//   const handleManualSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/employees', formData);
//       alert('Employee added!');
//       onSuccess();
//       onClose();
//     } catch (error) {
//       console.error(error);
//       alert('Failed to add employee.');
//     }
//   };

//   // Bulk upload
//   const [file, setFile] = useState(null);

//   const handleBulkSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please select a file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       await axios.post('http://localhost:5000/api/employees/bulk-upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Employees uploaded successfully!');
//       onSuccess();
//       onClose();
//     } catch (error) {
//       console.error(error);
//       alert('Failed to upload file.');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-40">
//       <div className="bg-white rounded-md shadow-lg w-full max-w-lg p-6">
//         <h2 className="text-xl font-semibold mb-4 text-[#000053]">Add Employee</h2>

//         <div className="flex space-x-4 mb-4">
//           <button
//             className={`px-4 py-2 rounded ${activeTab === 'manual' ? 'bg-[#000053] text-white' : 'bg-gray-200'}`}
//             onClick={() => setActiveTab('manual')}
//           >
//             Manual Entry
//           </button>
//           <button
//             className={`px-4 py-2 rounded ${activeTab === 'bulk' ? 'bg-[#000053] text-white' : 'bg-gray-200'}`}
//             onClick={() => setActiveTab('bulk')}
//           >
//             Bulk Upload
//           </button>
//         </div>

//         {/* Manual Form */}
//         {activeTab === 'manual' && (
//           <form onSubmit={handleManualSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Employee ID"
//               value={formData.empid}
//               onChange={(e) => setFormData({ ...formData, empid: e.target.value })}
//               className="w-full px-4 py-1 border rounded"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full px-4 py-1 border rounded"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Contact"
//               value={formData.contact}
//               onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
//               className="w-full px-4 py-1 border rounded"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Designation"
//               value={formData.designation}
//               onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//               className="w-full px-4 py-1 border rounded"
//               required
//             />
//              <input
//               type="text"
//               placeholder="Designation"
//               value={formData.designation}
//               onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//               className="w-full px-4 py-1 border rounded"
//               required
//             />
//              <input
//               type="text"
//               placeholder="Designation"
//               value={formData.designation}
//               onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//               className="w-full px-4 py-1 border rounded"
//               required
//             />
//              <input
//               type="text"
//               placeholder="Designation"
//               value={formData.designation}
//               onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//               className="w-full px-4 py-1 border rounded"
//               required
//             />
//              <input
//               type="text"
//               placeholder="Designation"
//               value={formData.designation}
//               onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//               className="w-full px-4 py-1 border rounded"
//               required
//             />
//              <input
//               type="text"
//               placeholder="Designation"
//               value={formData.designation}
//               onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//               className="w-full px-4 py-1 border rounded"
//               required
//             />



//             <div className="flex justify-end">
//               <button type="submit" className="bg-[#000053] text-white px-4 py-2 rounded">
//                 Add
//               </button>
//             </div>
//           </form>
//         )}

//         {/* Bulk Upload Form */}
//         {activeTab === 'bulk' && (
//           <form onSubmit={handleBulkSubmit} className="space-y-4">
//             <input
//               type="file"
//               accept=".xlsx,.xls,.csv"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="w-full border p-2 rounded"
//               required
//             />
//             <div className="text-sm text-gray-500">
//               Accepts Excel (.xlsx, .xls) and CSV files. 
//             </div>

//             <div className="flex justify-end">
//               <button type="submit" className="bg-[#000053] text-white px-4 py-2 rounded">
//                 Upload
//               </button>
//             </div>
//           </form>
//         )}

//         <div className="flex justify-end mt-4">
//           <button onClick={onClose} className="text-sm text-red-500 hover:underline">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployeeModal;


import React, { useState } from 'react';
import axios from 'axios';

const AddEmployeeModal = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('manual');

  const [formData, setFormData] = useState({
    empid: "",
    name: "",
    email: "",
    address: "",
    contact: "",
    designation: "",
    reporting_manager: "",
    joining_date: "",
    emergency_contact: "",
    emergency_relation : "",
    role: "",
  });

  const [file, setFile] = useState(null);

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employees', formData);
      alert('Employee added!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to add employee.');
    }
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/employees/bulk-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Employees uploaded successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to upload file.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-sm font-semibold mb-4 text-[#000053]" >Add Employee</h2>

        {/* Tab Buttons */}
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-1 rounded ${activeTab === 'manual' ? 'bg-[#000053] text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('manual')}
          >
            Manual Entry
          </button>
          <button
            className={`px-4 py-1 rounded ${activeTab === 'bulk' ? 'bg-[#000053] text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('bulk')}
          >
            Bulk Upload
          </button>
        </div>

        {/* Manual Entry Form */}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Employee ID"
              value={formData.empid}
              onChange={(e) => setFormData({ ...formData, empid: e.target.value })}
              className="w-full px-4 py-1 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-1 border rounded"
              required
            />
              <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-1 border rounded"
              required
            />
              <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-1 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-1 border rounded"
              required
            /> 
              <input
              type="text"
              placeholder="Reporting Manager"
              value={formData.reporting_manager}
              onChange={(e) => setFormData({ ...formData, reporting_manager: e.target.value })}
              className="w-full px-4 py-1 border rounded"
              required
            />
              <input
              type="text"
              placeholder="Designation"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className="w-full px-4 py-1 border rounded"
              required
            />
              <input
              type="Date"
              placeholder="Joining Date"
              value={formData.joining_date}
              onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
              className="w-full px-4 py-1 border rounded"
              required
            />
              <input
              type="text"
              placeholder="Emergency Contact"
              value={formData.emergency_contact}
              onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
              className="w-full px-4 py-1 border rounded"
              required
            />
              <input
              type="text"
              placeholder="Emergency Relation"
              value={formData.emergency_relation}
              onChange={(e) => setFormData({ ...formData,emergency_relation: e.target.value })}
              className="w-full px-4 py-1 border rounded"
              required
            />
             <input
              type="text"
              placeholder="Admin / User"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-1 border rounded"
              required
            />

            


            {/* Add more fields here if needed */}

            <div className="flex justify-end">
              <button type="submit" className="bg-[#000053] text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
          </form>
        )}

        {/* Bulk Upload Form */}
        {activeTab === 'bulk' && (
          <form onSubmit={handleBulkSubmit} className="space-y-4">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border p-2 rounded"
              required
            />
            <p className="text-sm text-gray-500">
              Accepts Excel (.xlsx, .xls) and CSV files with headers: <br />
              <code>empid, name, contact, designation</code>
            </p>
            <div className="flex justify-end">
              <button type="submit" className="bg-[#000053] text-white px-4 py-2 rounded">
                Upload
              </button>
            </div>
          </form>
        )}

        {/* Close */}
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="text-sm text-red-500 hover:underline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
