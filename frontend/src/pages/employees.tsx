import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";

import EmployeeInfo from "../components/manager/employee-info";
import Layout from "../components/shared/layout";
import { EmployeeDetailsMap } from "../../interfaces/interface";

interface EmployeesProps {
  username: string;
  role: string;
  employeeDetails: EmployeeDetailsMap;
}

const Employees: React.FC<EmployeesProps> = ({
  username,
  role,
  employeeDetails,
}: EmployeesProps) => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };

  return (
    <Layout>
      <div className="flex flex-col gap-y-5">
        <div className={classes.containers}>
          <div className="text-2xl font-bold">All Employees</div>
        </div>
        <EmployeeInfo employeeDetails={employeeDetails} />
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

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_RIZE_API_URL}/manager/employee/all/${process.env.NEXT_PUBLIC_GYM_ID}`
  );

  return {
    props: {
      username: session.user.email,
      role: session.user.name,
      employeeDetails: response.data,
    },
  };
};

export { getServerSideProps };

export default Employees;
