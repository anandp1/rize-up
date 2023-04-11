import Link from "next/link";

import { TrainersInformationMap } from "../../../interfaces/interface";
import { SignInRole } from "../../pages/sign-in";

interface TrainerProfileProps {
  usedBy?: SignInRole;
  trainerDetails: TrainersInformationMap;
}

const TrainerProfile: React.FC<TrainerProfileProps> = ({
  usedBy,
  trainerDetails,
}: TrainerProfileProps) => {
  const classes = {
    containers: "bg-white rounded-lg shadow-lg p-6 mx-8",
  };

  // API to get trainer by trainer email or id or whatever
  // replace testfornow in the mail to a actual email returned from the API

  return (
    <>
      {Object.keys(trainerDetails).map((email) => (
        <div key={email} className={classes.containers}>
          <div className="flex items-center mb-4">
            <div className="w-full">
              <span className="flex flex-row">
                <h2 className="text-xl font-bold mb-1">
                  {trainerDetails[email].trainerInfo.firstName}{" "}
                  {trainerDetails[email].trainerInfo.lastName}
                </h2>
                {usedBy === SignInRole.FRONT_DESK && (
                  <Link
                    passHref
                    className="ml-auto"
                    href={`/schedule?trainerEmail=${encodeURIComponent(email)}`}
                  >
                    <button className="text-sm bg-orange-500 rounded-md flex flex-row px-4 py-2">
                      <p className="text-white">View Schedule</p>
                    </button>
                  </Link>
                )}
              </span>
              <p className="text-gray-500 text-sm">
                Personal Trainer • {trainerDetails[email].trainerInfo.email} •{" "}
                {trainerDetails[email].trainerInfo.age} •{" "}
                {trainerDetails[email].trainerInfo.gender}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <h3 className="text-lg font-bold mb-2">General Information</h3>
              <ul className="list-disc list-inside">
                <li>{trainerDetails[email].about_me}</li>
                <li>I like {trainerDetails[email].interests.join(", ")}</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <h3 className="text-lg font-bold mb-2">Experience</h3>
              <ul className="list-disc list-inside">
                <li>
                  Trainer Experience:{" "}
                  {trainerDetails[email].experience[0].years} years
                </li>
                <li>
                  Description: {trainerDetails[email].experience[0].description}
                </li>
                <li>
                  Education: {trainerDetails[email].experience[0].education}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TrainerProfile;
