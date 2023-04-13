import axios from "axios";
import classNames from "classnames";
import { useState } from "react";

import { EmployeeDetailsMap } from "../../../interfaces/interface";
import { SignInRole } from "../../pages/sign-in";

interface EmployeeInfoProps {
  employeeDetails: EmployeeDetailsMap;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({
  employeeDetails,
}: EmployeeInfoProps) => {
  const [selectedMenu, setSelectedMenu] = useState(SignInRole.TRAINER);
  const deleteAccount = async (employeeEmail: string, employeeType: string) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/manager/employee/delete/${employeeEmail}/${employeeType}`
      );

      alert("Deleted account successfully");
    } catch {
      alert("Error deleting account");
    }
  };

  const trainerDetails = employeeDetails["trainer"];
  const frontDeskDetails = employeeDetails["frontDesk"];
  return (
    <>
      <div className="flex flex-row gap-x-5">
        <button
          onClick={() => setSelectedMenu(SignInRole.TRAINER)}
          className={classNames(
            "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-slate-200 hover:opacity-50 w-full",
            selectedMenu === SignInRole.TRAINER && "opacity-50"
          )}
        >
          Trainer
        </button>
        <button
          onClick={() => setSelectedMenu(SignInRole.FRONT_DESK)}
          className={classNames(
            "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-slate-200 hover:opacity-50 w-full",
            selectedMenu === SignInRole.FRONT_DESK && "opacity-50"
          )}
        >
          Front Desk
        </button>
      </div>
      {selectedMenu === SignInRole.TRAINER
        ? trainerDetails.map((trainer) => (
            <div
              key={trainer.email}
              className="bg-white rounded-lg flex flex-col p-5 shadow-md"
            >
              <div className="text-xl font-bold mb-4">
                {trainer.firstName} {trainer.lastName}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                {trainer.email} • {trainer.birthDate} • {trainer.gender}
              </div>
              <button
                onClick={async () =>
                  await deleteAccount(trainer.email, "trainer")
                }
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ml-auto w-full md:w-1/4 bg-red-500"
              >
                Delete Account
              </button>
            </div>
          ))
        : frontDeskDetails.map((frontDesk) => (
            <div
              key={frontDesk.email}
              className="bg-white rounded-lg flex flex-col p-5 shadow-md"
            >
              <div className="text-xl font-bold mb-4">
                {frontDesk.firstName} {frontDesk.lastName}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                {frontDesk.email} • {frontDesk.birthDate} • {frontDesk.gender}
              </div>
              <button
                onClick={async () =>
                  await deleteAccount(frontDesk.email, "frontdesk")
                }
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ml-auto w-full sm:w-1/4 bg-red-500"
              >
                Delete Account
              </button>
            </div>
          ))}
    </>
  );
};

export default EmployeeInfo;
