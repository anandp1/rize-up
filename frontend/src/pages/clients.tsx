import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ClientInfo from "../components/front-desk/client-info";

import Layout from "../components/shared/layout";

interface ClientProps {
  username: string;
  role: string;
}

const Client: React.FC<ClientProps> = ({ username, role }: ClientProps) => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };
  // api to get all clients
  return (
    <Layout>
      <div className="flex flex-col gap-y-5">
        <div className={classes.containers}>
          <div className="text-2xl font-bold">All Clients</div>
        </div>
        <ClientInfo />
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

export default Client;
