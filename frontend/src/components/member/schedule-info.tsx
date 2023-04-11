import { ClassSection, ClassSectionsMap } from "../../../interfaces/interface";
import { getEndTime } from "../../../utils/add-time";

interface ScheduleProps {
  scheduleByDay: ClassSectionsMap;
}

const ScheduleInfo: React.FC<ScheduleProps> = ({
  scheduleByDay,
}: ScheduleProps) => {
  const daysMap: { [key: string]: string } = {
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:mx-8">
      <div className="flex flex-wrap justify-center mt-8 gap-3">
        {Object.keys(scheduleByDay).map((day: string) => (
          <div
            key={day}
            className="w-full md:w-1/2 lg:w-1/3 p-4 bg-slate-100 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-4">{daysMap[day]}</h2>
            <div className="flex flex-col">
              {scheduleByDay[day].map((classSection: ClassSection) => (
                <div key={classSection.sec}>
                  <span className="font-bold">{classSection.name} Class: </span>
                  {classSection.time} to{" "}
                  {getEndTime(classSection.time, classSection.length)}
                  <br />
                  <span className="text-sm font-bold text-gray-500">
                    Section {classSection.sec}, Room {classSection.room}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleInfo;
