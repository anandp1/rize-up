import axios from "axios";
import classNames from "classnames";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { TrainerInformation } from "../../interfaces/interface";

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
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };

  const trainerDetailsMap = {
    username: trainerProfile,
  };

  return (
    <Layout>
      <div className="flex flex-col gap-y-5">
        <div className={classes.containers}>
          <div className="text-2xl font-bold">Your Profile</div>
        </div>

        <TrainerProfile trainerDetails={trainerDetailsMap} />
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

  console.log(response.data);
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
