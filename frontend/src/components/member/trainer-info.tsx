import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import useSWR from "swr";

import { Trainer, TrainersInformationMap } from "../../../interfaces/interface";
import { fetcher } from "../../../utils/fetcher";

interface TrainerInfoProps {
  memberEmail: string;
}

const filterTrainersInformationMap = (
  trainers: Trainer[],
  trainersInformationMap: TrainersInformationMap
): TrainersInformationMap => {
  const filteredTrainersInformationMap: TrainersInformationMap = {};

  // Create a Set of trainer emails from the Trainer[] variable for faster lookup
  const trainerEmailsSet = new Set(trainers.map((trainer) => trainer.email));

  // Loop through each trainer in the trainersInformationMap
  for (const [trainerEmail, trainerInfo] of Object.entries(
    trainersInformationMap
  )) {
    // If the trainer email is not in the trainerEmailsSet, add it to the filteredTrainersInformationMap
    if (!trainerEmailsSet.has(trainerEmail)) {
      filteredTrainersInformationMap[trainerEmail] = trainerInfo;
    }
  }

  return filteredTrainersInformationMap;
};

const TrainerInfo: React.FC<TrainerInfoProps> = ({
  memberEmail,
}: TrainerInfoProps) => {
  const classes = {
    containers: "bg-white rounded-lg shadow-lg p-6 mx-8",
  };
  const [filteredTrainersInformationMap, setFilteredTrainersInformationMap] =
    useState<TrainersInformationMap>();

  const {
    data: assignedTrainers,
    error: allTrainersError,
    mutate: revalidateAssignedTrainers,
  } = useSWR<Trainer[]>(
    `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/trainer/assigned/${memberEmail}`,
    fetcher
  );

  const { data: allTrainers, error: assignedTrainersError } =
    useSWR<TrainersInformationMap>(
      `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/trainer/all/${process.env.NEXT_PUBLIC_GYM_ID}`,
      fetcher
    );

  useEffect(() => {
    if (!allTrainers || !assignedTrainers) return;

    setFilteredTrainersInformationMap(
      filterTrainersInformationMap(assignedTrainers, allTrainers)
    );
  }, [allTrainers, assignedTrainers]);

  if (allTrainersError || assignedTrainersError) {
    return <div>Failed to load</div>;
  }

  if (!allTrainers || !assignedTrainers || !filteredTrainersInformationMap) {
    return <div>Loading...</div>;
  }

  const addTrainer = async (trainerEmail: string) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/trainer/add/${trainerEmail}/${memberEmail}`
      );
      revalidateAssignedTrainers();
      alert("Trainer added successfully");
    } catch {
      alert("Failed to add trainer");
    }
  };

  return (
    <>
      {Object.keys(filteredTrainersInformationMap).map(
        (trainerEmail: string) => (
          <div key={trainerEmail} className={classes.containers}>
            <div className="flex items-center mb-4">
              <div className="w-full">
                <span className="flex flex-row">
                  <h2 className="text-xl font-bold mb-1">
                    {`${filteredTrainersInformationMap[trainerEmail].trainerInfo.email} ${filteredTrainersInformationMap[trainerEmail].trainerInfo.lastName}`}
                  </h2>
                  <button
                    onClick={async () => await addTrainer(trainerEmail)}
                    className="ml-auto text-sm bg-orange-500 rounded-md flex flex-row px-4 py-2"
                  >
                    <AiOutlinePlus className="text-white my-auto ml-1 mr-2" />
                    <p className="text-white">Add Trainer</p>
                  </button>
                </span>
                <p className="text-gray-500 text-sm">
                  Personal Trainer •{" "}
                  {
                    filteredTrainersInformationMap[trainerEmail].trainerInfo
                      .email
                  }
                  •{" "}
                  {filteredTrainersInformationMap[trainerEmail].trainerInfo.age}{" "}
                  •{" "}
                  {
                    filteredTrainersInformationMap[trainerEmail].trainerInfo
                      .gender
                  }
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <h3 className="text-lg font-bold mb-2">General Information</h3>
                <ul className="list-disc list-inside">
                  <li>
                    {filteredTrainersInformationMap[trainerEmail].about_me}
                  </li>
                  <li>
                    I like{" "}
                    {filteredTrainersInformationMap[
                      trainerEmail
                    ].interests.join(", ")}
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <h3 className="text-lg font-bold mb-2">Experience</h3>
                <ul className="list-disc list-inside">
                  <li>
                    Trainer Experience:{" "}
                    {
                      filteredTrainersInformationMap[trainerEmail].experience[0]
                        .years_of_experience
                    }{" "}
                    years
                  </li>
                  <li>
                    Description:{" "}
                    {
                      filteredTrainersInformationMap[trainerEmail].experience[0]
                        .description
                    }
                  </li>
                  <li>
                    Education:{" "}
                    {
                      filteredTrainersInformationMap[trainerEmail].experience[0]
                        .education
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
      )}
      ;
    </>
  );
};

export default TrainerInfo;
