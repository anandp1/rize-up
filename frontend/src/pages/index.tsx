import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import MemberDashboard from "../components/dashboard/member/member-dashboard";
import TrainerDashboard from "../components/dashboard/trainer/trainer-dashboard";

import Layout from "../components/shared/layout";
import { SignInRole } from "./sign-in";

interface HomeProps {
  username: string;
  role: string;
}

const Home: React.FC<HomeProps> = ({ username, role }: HomeProps) => {
  return (
    <Layout>
      {role === SignInRole.MANAGER && <p> Hello Manager</p>}
      {role === SignInRole.MEMBER && <MemberDashboard />}
      {role === SignInRole.FRONT_DESK && <p> Hello Front Desk</p>}
      {role === SignInRole.TRAINER && <TrainerDashboard />}
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

export default Home;
