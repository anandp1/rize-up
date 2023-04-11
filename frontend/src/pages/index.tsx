import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";

import FrontDeskDashboard from "../components/dashboard/front-desk/front-desk-dashboard";
import MemberDashboard from "../components/dashboard/member/member-dashboard";
import TrainerDashboard from "../components/dashboard/trainer/trainer-dashboard";
import Layout from "../components/shared/layout";
import { SignInRole } from "./sign-in";
import {
  Customer,
  Gym,
  Membership,
  TrainerInformation,
} from "../../interfaces/interface";

interface HomeProps {
  username: string;
  role: string;
  userDetails: Customer | TrainerInformation;
  gymInfo: Gym;
  gymMembership: Membership[];
}

const Home: React.FC<HomeProps> = ({
  username,
  role,
  userDetails,
  gymInfo,
  gymMembership,
}: HomeProps) => {
  return (
    <Layout>
      {role === SignInRole.MANAGER && <p> Hello Manager</p>}
      {role === SignInRole.MEMBER && (
        <MemberDashboard memberDetails={userDetails as Customer} />
      )}
      {role === SignInRole.FRONT_DESK && (
        <FrontDeskDashboard gymInfo={gymInfo} gymMembership={gymMembership} />
      )}
      {role === SignInRole.TRAINER && (
        <TrainerDashboard trainerDetails={userDetails as TrainerInformation} />
      )}
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
  if (session.user.name === SignInRole.MEMBER) {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/account/${session.user.email}`
    );
  }

  if (session.user.name === SignInRole.TRAINER) {
    response = await axios.get(
      `${process.env.NEXT_PUBLIC_RIZE_API_URL}/trainer/profile/${session.user.email}`
    );
  }

  let gymInfoResponse;
  let gymMembershipResponse;
  if (session.user.name === SignInRole.FRONT_DESK) {
    gymInfoResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_RIZE_API_URL}/frontdesk/gyminfo/${process.env.NEXT_PUBLIC_GYM_ID}`
    );
    gymMembershipResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_RIZE_API_URL}/frontdesk/memberships/${process.env.NEXT_PUBLIC_GYM_ID}`
    );
  }

  return {
    props: {
      username: session.user.email,
      role: session.user.name,
      userDetails: response?.data ?? [],
      gymInfo: gymInfoResponse?.data ?? [],
      gymMembership: gymMembershipResponse?.data ?? [],
    },
  };
};

export { getServerSideProps };

export default Home;
