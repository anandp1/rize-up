import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ClientInfo from "../components/front-desk/client-info";
import EmployeeInfo from "../components/manager/employee-info";

import Layout from "../components/shared/layout";

interface EmployeesProps {
  username: string;
  role: string;
}

const Employees: React.FC<EmployeesProps> = ({
  username,
  role,
}: EmployeesProps) => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };
  // api to get all employees
  return (
    <Layout>
      <div className="flex flex-col gap-y-5">
        <div className={classes.containers}>
          <div className="text-2xl font-bold">All Employees</div>
        </div>
        <EmployeeInfo />
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

export default Employees;
