import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

import TrainerTable from "./trainer-table";

const MemberDashboard = () => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };
  return (
    <div className="flex flex-col gap-y-5">
      <div className={classes.containers}>
        <div className="text-2xl font-bold">Welcome Back, Joe</div>
        <div className="text-sm text-gray-500">Member Dashboard</div>
      </div>

      <div className={classes.containers}>
        <div className="flex flex-row">
          <p className="font-semibold my-auto">Personal Trainer</p>
          <Link className="ml-auto" href={"/trainer"}>
            <button className="text-sm bg-orange-500 rounded-md flex flex-row px-4 py-2">
              <AiOutlinePlus className="text-white my-auto ml-1 mr-2" />
              <p className="text-white">Add Trainer</p>
            </button>
          </Link>
        </div>
        <TrainerTable />
      </div>
    </div>
  );
};

export default MemberDashboard;