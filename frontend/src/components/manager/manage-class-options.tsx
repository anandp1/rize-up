import { Listbox } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { ClassSection } from "../../../interfaces/interface";
import { daysMap } from "../../../utils/helper";
import Model from "../model/model";

interface ManageClassOptionsProps {
  allClassNames: string[];
  allClassesRevalidateData: KeyedMutator<ClassSection[]>;
}

const convertTimeFormat = (timeString: string): string => {
  const timeArray = timeString.split(":");
  let hour = parseInt(timeArray[0]);
  const minute = timeArray[1];
  let amPM = "AM";

  if (hour > 12) {
    hour -= 12;
    amPM = "PM";
  } else if (hour === 0) {
    hour = 12;
  } else if (hour === 12) {
    amPM = "PM";
  }

  return `${hour.toString().padStart(2, "0")}:${minute} ${amPM}`;
};

const ManageClassOptions: React.FC<ManageClassOptionsProps> = ({
  allClassNames,
  allClassesRevalidateData,
}: ManageClassOptionsProps) => {
  const [addClassModel, setAddClassModel] = useState(false);
  const [addSectionModel, setAddSectionModel] = useState(false);
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [length, setLength] = useState(0);
  const [cost, setCost] = useState(0);
  const [sectionClass, setSectionClass] = useState(allClassNames[0]);
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [room, setRoom] = useState(0);
  const [section, setSection] = useState(0);

  const addClassClicked = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/manager/class/add/${className}/${length}/${cost}`
      );
      allClassesRevalidateData();
      alert("Class added successfully");
    } catch {
      alert("Error adding class");
    }
    setAddClassModel(false);
  };

  const addSectionClicked = async () => {
    try {
      const formattedTime = convertTimeFormat(time);

      await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/manager/class/add/${sectionClass}/${formattedTime}/${day}/${capacity}/${room}/${section}`
      );
      allClassesRevalidateData();
      alert("Section added successfully");
    } catch {
      alert("Error adding section");
    }
    setAddSectionModel(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-x-2 gap-y-2 ml-auto mx-6 w-full sm:w-fit">
      {addClassModel && (
        <Model open={addClassModel} setOpen={setAddClassModel}>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Class Name
              </label>
              <input
                onChange={(event) => {
                  setClassName(event.target.value);
                }}
                value={className}
                type="text"
                placeholder="Enter class name"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Length (in minutes)
              </label>
              <input
                onChange={(event) => {
                  setLength(parseInt(event.target.value));
                }}
                value={length}
                type="number"
                placeholder="Enter class length"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Cost</label>
              <input
                onChange={(event) => {
                  setCost(parseInt(event.target.value));
                }}
                value={cost}
                type="number"
                placeholder="Enter class cost"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={addClassClicked}
              className="px-4 py-2 bg-slate-100 text-black rounded-md"
            >
              Add Class
            </button>
          </div>
        </Model>
      )}
      {addSectionModel && (
        <Model
          open={addSectionModel}
          setOpen={setAddSectionModel}
          ignoreHeight={true}
        >
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-bold">Select Class</label>
              <Listbox value={sectionClass} onChange={setSectionClass}>
                <div className="relative">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{sectionClass}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 8a1 1 0 011.707 0L10 11.586 13.293 8A1 1 0 1115 9.707l-4 4a1 1 0 01-1.414 0l-4-4A1 1 0 015 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {allClassNames.map((className) => (
                      <Listbox.Option
                        key={className}
                        className={({ active }) =>
                          `cursor-default select-none relative py-2 pl-10 pr-4 ${
                            active
                              ? "text-white bg-indigo-600"
                              : "text-gray-900"
                          }`
                        }
                        value={className}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {className}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-indigo-600"
                                }`}
                              ></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="myTime" className="text-sm font-bold">
                Select Time
              </label>
              <input
                type="time"
                min="00:00"
                max="23:59"
                step="1"
                value={time}
                onChange={(event) => {
                  setTime(event.target.value);
                }}
                required
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <input
              type="number"
              value={capacity || ""}
              placeholder="Enter capacity"
              required
              onChange={(event) => {
                setCapacity(parseInt(event.target.value));
              }}
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <input
              type="number"
              placeholder="Enter room"
              required
              value={room || ""}
              onChange={(event) => {
                setRoom(parseInt(event.target.value));
              }}
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <input
              type="number"
              placeholder="Enter section"
              required
              value={section || ""}
              onChange={(event) => {
                setSection(parseInt(event.target.value));
              }}
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium">Select a Day:</label>
              <select
                required
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onChange={(event) => {
                  setDay(event.target.value);
                }}
              >
                <option value="" disabled selected>
                  Select a Day
                </option>
                {Object.keys(daysMap).map((day) => (
                  <option key={day} value={day}>
                    {daysMap[day]}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={addSectionClicked}
              className="px-4 py-2 bg-slate-100 text-black rounded-md"
            >
              Add Section
            </button>
          </div>
        </Model>
      )}
      <button
        onClick={() => setAddClassModel(true)}
        className="px-4 py-2 bg-slate-200 text-black rounded-md sm:ml-auto"
      >
        Add Class
      </button>
      <button
        onClick={() => setAddSectionModel(true)}
        className="px-4 py-2 bg-slate-200 text-black rounded-md"
      >
        Add Section
      </button>
    </div>
  );
};

export default ManageClassOptions;
