const EmployeeInfo = () => {
  const deleteAccount = () => {
    // api to fire employee
  };

  return (
    <div className="bg-white rounded-lg flex flex-col p-5 shadow-md">
      <div className="text-xl font-bold mb-4">John Doe</div>
      <div className="text-sm text-gray-500 mb-4">Front Desk</div>
      <button
        onClick={deleteAccount}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-auto"
      >
        Delete Account
      </button>
    </div>
  );
};

export default EmployeeInfo;
