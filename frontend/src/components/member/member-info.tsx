const MemberInfo = () => {
  return (
    <div className="flex">
      <div className="bg-white rounded-lg flex flex-col px-6 py-8 max-w-lg mx-auto">
        <div className="text-3xl font-bold mb-8 text-center">Your Account</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Name</p>
            <p className="text-gray-700">Joe Doe</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Date of Birth</p>
            <p className="text-gray-700">2001/01/01</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Age</p>
            <p className="text-gray-700">13</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Gender</p>
            <p className="text-gray-700">M</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Date Joined</p>
            <p className="text-gray-700">2022/01/01</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Membership Type</p>
            <p className="text-gray-700">Regular Membership</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
