import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";

import Layout from "../components/shared/layout";
import TrainerInfo from "../components/member/trainer-info";
import { SignInRole } from "./sign-in";
import TrainerProfile from "../components/trainer/trainer-profile";
import { TrainersInformationMap } from "../../interfaces/interface";

interface TrainerProps {
  username: string;
  role: string;
  trainerDetails: TrainersInformationMap;
}

const Trainer: React.FC<TrainerProps> = ({
  username,
  role,
  trainerDetails,
}: TrainerProps) => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };
  return (
    <Layout>
      <div className="flex flex-col gap-y-5">
        <div className={classes.containers}>
          <div className="text-2xl font-bold">Our Trainers</div>
        </div>
        {role === SignInRole.MEMBER && <TrainerInfo memberEmail={username} />}
        {role === SignInRole.FRONT_DESK && (
          <TrainerProfile
            trainerDetails={trainerDetails}
            usedBy={SignInRole.FRONT_DESK}
          />
        )}
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
  if (session.user.name === SignInRole.FRONT_DESK) {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/trainer/all/${process.env.NEXT_PUBLIC_GYM_ID}`
    );
  }

  return {
    props: {
      username: session.user.email,
      role: session.user.name,
      trainerDetails: response?.data,
    },
  };
};

export { getServerSideProps };

export default Trainer;
