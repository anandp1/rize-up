import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";

import FrontDeskDashboard from "../components/dashboard/front-desk/front-desk-dashboard";
import MemberDashboard from "../components/dashboard/member/member-dashboard";
import TrainerDashboard from "../components/dashboard/trainer/trainer-dashboard";
import Layout from "../components/shared/layout";
import { SignInRole } from "./sign-in";
import { Customer } from "../../interfaces/interface";

interface HomeProps {
  username: string;
  role: string;
  memberDetails: Customer;
}

const Home: React.FC<HomeProps> = ({
  username,
  role,
  memberDetails,
}: HomeProps) => {
  return (
    <Layout>
      {role === SignInRole.MANAGER && <p> Hello Manager</p>}
      {role === SignInRole.MEMBER && (
        <MemberDashboard memberDetails={memberDetails} />
      )}
      {role === SignInRole.FRONT_DESK && <FrontDeskDashboard />}
      {role === SignInRole.TRAINER && <TrainerDashboard />}
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

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/account/${session.user.email}`
  );

  return {
    props: {
      username: session.user.email,
      role: session.user.name,
      memberDetails: response.data,
    },
  };
};

export { getServerSideProps };

export default Home;
