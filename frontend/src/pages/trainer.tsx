import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Layout from "../components/shared/layout";
import TrainerInfo from "../components/trainer/trainer-info";

interface TrainerProps {
  username: string;
  role: string;
}

const Trainer: React.FC<TrainerProps> = ({ username, role }: TrainerProps) => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };
  return (
    <Layout>
      <div className="flex flex-col gap-y-5">
        <div className={classes.containers}>
          <div className="text-2xl font-bold">Our Trainers</div>
        </div>
        <TrainerInfo />
      </div>
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);
  const session = await getSession(context);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      username: session.user.email,
      role: session.user.name,
    },
  };
};

export { getServerSideProps };

export default Trainer;