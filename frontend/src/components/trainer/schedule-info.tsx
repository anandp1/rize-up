import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";

import { ClassSection, ClassSectionsMap } from "../../../interfaces/interface";
import { daysMap, getEndTime } from "../../../utils/helper";
import Model from "../model/model";

interface ScheduleInfoTrainerProps {
  scheduleByDay: ClassSectionsMap;
}

const ScheduleInfoTrainer: React.FC<ScheduleInfoTrainerProps> = ({
  scheduleByDay,
}: ScheduleInfoTrainerProps) => {
  const [showModel, setShowModel] = useState(false);
  const [classList, setClassList] = useState<String[]>([]);
  const viewClassListClicked = async (
    sectionNumber: number,
    className: string
  ) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/trainer/classlist/${sectionNumber}/${className}`
      );
      setClassList(res.data);
      setShowModel(true);
    } catch {
      alert("Failed to load class list");
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:mx-8">
      {showModel && (
        <Model open={showModel} setOpen={setShowModel}>
          <div className="flex flex-col gap-y-2">
            <div className="text-xl font-bold">Class List</div>
            <div className="flex flex-col gap-y-1">
              {classList.map((member, index) => (
                <div key={index}>{member}</div>
              ))}
            </div>
          </div>
        </Model>
      )}
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
                  <div className="flex flex-row gap-x-1">
                    <span className="text-sm font-bold text-gray-500">
                      Section {classSection.sec}, Room {classSection.room}
                    </span>
                    <AiOutlineEye
                      onClick={async () =>
                        await viewClassListClicked(
                          classSection.sec,
                          classSection.name
                        )
                      }
                      className="my-auto hover:cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleInfoTrainer;
