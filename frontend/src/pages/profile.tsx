import classNames from "classnames";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Layout from "../components/shared/layout";
import TrainerProfile from "../components/trainer/trainer-profile";

interface SettingsProps {
  username: string;
  role: string;
}

const Settings: React.FC<SettingsProps> = ({
  username,
  role,
}: SettingsProps) => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };
  return (
    <Layout>
      <div className="flex flex-col gap-y-5">
        <div className={classes.containers}>
          <div className="text-2xl font-bold">Your Profile</div>
        </div>

        <TrainerProfile />
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

  return {
    props: {
      username: session.user.email,
      role: session.user.name,
    },
  };
};

export { getServerSideProps };

export default Settings;
