import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Class from "../../components/member/class";
import Layout from "../../components/shared/layout";
import { SignInRole } from "../sign-in";

interface AddClassProps {
  username: string;
  role: string;
}

const AddClass: React.FC<AddClassProps> = ({
  username,
  role,
}: AddClassProps) => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };

  // pass in class all classes this user is enrolled in
  return (
    <Layout>
      <div className="flex flex-col gap-y-5">
        <div className={classes.containers}>
          <div className="text-2xl font-bold">Our Classes</div>
        </div>
        <Class usedBy={role as SignInRole} memberEmail={username} />
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

export default AddClass;
