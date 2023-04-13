import axios from "axios";
import classNames from "classnames";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { TrainerInformation } from "../../interfaces/interface";
import Model from "../components/model/model";

import Layout from "../components/shared/layout";
import TrainerProfile from "../components/trainer/trainer-profile";
import { SignInRole } from "./sign-in";

interface SettingsProps {
  username: string;
  role: string;
  trainerProfile: TrainerInformation;
}

const Settings: React.FC<SettingsProps> = ({
  username,
  role,
  trainerProfile,
}: SettingsProps) => {
  const [updateProfileModel, setUpdateProfileModel] = useState(false);
  const [interests, setInterests] = useState<string[]>(
    trainerProfile.interests
  );
  const [aboutMe, setAboutMe] = useState<string>(trainerProfile.about_me);
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(
    trainerProfile.experience[0].years
  );
  const [description, setDescription] = useState<string>(
    trainerProfile.experience[0].description
  );
  const [education, setEducation] = useState<string>(
    trainerProfile.experience[0].education
  );

  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };

  const trainerDetailsMap = {
    username: trainerProfile,
  };

  const handleInterestChange = (event: any) => {
    const selectedOption = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setInterests((prevInterests) => [...prevInterests, selectedOption]);
    } else {
      setInterests((prevInterests) =>
        prevInterests.filter((interest) => interest !== selectedOption)
      );
    }
  };

  const saveChanges = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/trainer/profile/update`,
        {
          email: username,
          interests,
          about_me: aboutMe,
          years: yearsOfExperience,
          description,
          education,
        }
      );
      alert("Changes saved successfully!");
    } catch {
      alert("Error saving changes!");
    }
    setUpdateProfileModel(false);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-y-5">
        {updateProfileModel && (
          <Model
            setOpen={setUpdateProfileModel}
            open={updateProfileModel}
            ignoreHeight={true}
          >
            <div className="flex flex-col gap-y-5 bg-white rounded-lg p-5">
              <div className="text-2xl font-bold mb-4">Update Profile</div>
              <div className="overflow-y-auto max-h-[18rem] p-2">
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-col gap-y-2">
                    <p className="text-lg font-semibold mb-2">
                      General Information
                    </p>
                    <div className="flex flex-col gap-y-1">
                      <label className="text-sm font-bold">About Me</label>
                      <textarea
                        value={aboutMe}
                        onChange={(event) => setAboutMe(event.target.value)}
                        className={classNames(
                          "border border-slate-100 rounded-md px-2 py-1",
                          "focus:outline-none focus:ring-2 focus:ring-slate-200"
                        )}
                      />
                      <label className="text-sm font-bold">Interests</label>
                      <div className="flex flex-col gap-y-1">
                        {trainerProfile.interests.map((interest) => (
                          <label key={interest} className="flex items-center">
                            <input
                              type="checkbox"
                              value={interest}
                              checked={interests.includes(interest)}
                              onChange={handleInterestChange}
                              className="mr-2"
                            />
                            {interest}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <p className="text-lg font-semibold mb-2">Experience</p>
                      <div className="flex flex-col gap-y-1">
                        <label className="text-sm font-bold">
                          Years of experience
                        </label>
                        <input
                          type="number"
                          value={yearsOfExperience}
                          onChange={(event) =>
                            setYearsOfExperience(
                              parseInt(event.target.value, 10)
                            )
                          }
                          className={classNames(
                            "border border-gray-300 rounded-md px-3 py-2",
                            "focus:outline-none focus:ring-2 focus:ring-gray-400"
                          )}
                        />
                        <label className="text-sm font-bold">Description</label>
                        <textarea
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                          className={classNames(
                            "border border-gray-300 rounded-md px-3 py-2",
                            "focus:outline-none focus:ring-2 focus:ring-gray-400",
                            "h-24"
                          )}
                        />
                        <label className="text-sm font-bold">Education</label>
                        <textarea
                          value={education}
                          onChange={(event) => setEducation(event.target.value)}
                          className={classNames(
                            "border border-gray-300 rounded-md px-3 py-2",
                            "focus:outline-none focus:ring-2 focus:ring-gray-400",
                            "h-24"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={saveChanges}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md mt-4 self-end"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Model>
        )}
        <div className={classes.containers}>
          <div className="text-2xl font-bold">Your Profile</div>
        </div>

        <TrainerProfile trainerDetails={trainerDetailsMap} />
        <div className="mt-6 flex justify-center gap-x-4">
          <button
            onClick={() => setUpdateProfileModel(true)}
            className="px-4 py-2 bg-slate-200 rounded-md border border-slate-100 w-full sm:w-1/2"
          >
            Update Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  let response;
  if (session.user.name === SignInRole.TRAINER) {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_RIZE_API_URL}/trainer/profile/${session.user.email}`
    );
  }

  if (!response) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      username: session.user.email,
      role: session.user.name,
      trainerProfile: response.data,
    },
  };
};

export { getServerSideProps };

export default Settings;
