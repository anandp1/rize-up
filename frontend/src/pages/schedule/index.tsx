import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

import ScheduleInfo from "../../components/member/schedule-info";
import Layout from "../../components/shared/layout";
import ScheduleInfoTrainer from "../../components/trainer/schedule-info";
import { SignInRole } from "../sign-in";

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
          <div className="flex flex-row">
            <div className="text-2xl font-bold">Your Schedule</div>
            {role === SignInRole.MEMBER && (
              <Link passHref className="ml-auto" href="/schedule/add">
                <button className="text-sm bg-orange-500 rounded-md flex flex-row px-4 py-2">
                  <AiOutlinePlus className="text-white my-auto ml-1 mr-2" />
                  <p className="text-white">Add Class</p>
                </button>
              </Link>
            )}
          </div>
        </div>
        {role === SignInRole.MEMBER && <ScheduleInfo />}
        {role === SignInRole.TRAINER && <ScheduleInfoTrainer />}
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
