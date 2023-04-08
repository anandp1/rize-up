const ScheduleInfo = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:mx-8">
      <div className="flex flex-wrap justify-center mt-8 gap-3">
        {days.map((day) => (
          <div
            key={day}
            className="w-full md:w-1/2 lg:w-1/3 p-4 bg-slate-100 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-4">{day}</h2>
            <div className="flex flex-col">
              <div>
                <span className="font-bold">Yoga Class:</span> 8:00am to 9:00am
                <br />
                <span className="text-sm font-bold text-gray-500">
                  Section A, Room 101
                </span>
              </div>
              <div>
                <span className="font-bold">Pilates Class:</span> 10:00am to
                11:00am
                <br />
                <span className="text-sm font-bold text-gray-500">
                  Section B, Room 201
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleInfo;