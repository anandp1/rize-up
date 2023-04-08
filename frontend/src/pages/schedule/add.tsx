import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Class from "../../components/member/class";

import ScheduleInfo from "../../components/member/schedule-info";
import Layout from "../../components/shared/layout";

interface ScheduleProps {
  username: string;
  role: string;
}

const Schedule: React.FC<ScheduleProps> = ({
  username,
  role,
}: ScheduleProps) => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };
  return (
    <Layout>
      <div className="flex flex-col gap-y-5">
        <div className={classes.containers}>
          <div className="text-2xl font-bold">Our Classes</div>
        </div>
        <Class />
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

export default Schedule;
