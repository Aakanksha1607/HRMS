const Modal = ({ employee, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Employee Details</h2>
                <p><strong>Emp ID:</strong> {employee.emp_id}</p>
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Mobile:</strong> {employee.mobile}</p>
                <p><strong>Designation:</strong> {employee.designation}</p>

                <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
