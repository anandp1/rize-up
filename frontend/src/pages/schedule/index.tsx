import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
import { ClassSection, ClassSectionsMap } from "../../../interfaces/interface";
import useSWR from "swr";

import ScheduleInfo from "../../components/member/schedule-info";
import Layout from "../../components/shared/layout";
import ScheduleInfoTrainer from "../../components/trainer/schedule-info";
import { SignInRole } from "../sign-in";
import { fetcher } from "../../../utils/fetcher";

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

  const router = useRouter();
  const trainerEmail = decodeURIComponent(router.query.trainerEmail as string);
  console.log(trainerEmail);
  if (
    (SignInRole.FRONT_DESK === role && !trainerEmail) ||
    SignInRole.MANAGER === role
  ) {
    router.push("/404");
  }

  const {
    data: schedule,
    error,
    mutate: revalidateData,
  } = useSWR<ClassSection[]>(
    role === SignInRole.MEMBER
      ? `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/schedule/${username}`
      : `${process.env.NEXT_PUBLIC_RIZE_API_URL}/trainer/schedule/${
          trainerEmail ?? username
        }`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!schedule) return <div>Loading...</div>;

  const groupClassesByDay = (classes: ClassSection[]): ClassSectionsMap => {
    const result: ClassSectionsMap = {};

    classes.forEach((c) => {
      const day = c.day.toString();

      if (!result[day]) {
        result[day] = [];
      }

      result[day].push(c);
    });

    return result;
  };

  const scheduleByDay = groupClassesByDay(schedule);

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
        {role === SignInRole.MEMBER && (
          <ScheduleInfo scheduleByDay={scheduleByDay} />
        )}
        {(role === SignInRole.TRAINER || role === SignInRole.FRONT_DESK) && (
          <ScheduleInfoTrainer scheduleByDay={scheduleByDay} />
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

  return {
    props: {
      username: session.user.email,
      role: session.user.name,
    },
  };
};

export { getServerSideProps };

export default Schedule;
