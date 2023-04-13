import classNames from "classnames";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

import { Customer, Membership } from "../../../../interfaces/interface";
import TrainerTable from "./trainer-table";

interface MemberDashboardProps {
  memberDetails: Customer;
  gymMembership: Membership[];
}

const MemberDashboard: React.FC<MemberDashboardProps> = ({
  memberDetails,
  gymMembership,
}: MemberDashboardProps) => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };

  return (
    <div className="flex flex-col gap-y-5">
      <div className={classes.containers}>
        <div className="text-2xl font-bold">
          Welcome Back, {memberDetails.firstName} {memberDetails.lastName}
        </div>
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
        <TrainerTable memberDetails={memberDetails} />
      </div>

      <div className={classNames(classes.containers, "mx-8")}>
        <p className="text-lg font-semibold mb-4">Membership Plans</p>
        <div className="flex flex-wrap gap-x-2 gap-y-2 justify-center">
          {gymMembership.map((membership) => (
            <div
              key={membership.name}
              className="border rounded-lg px-4 py-3 text-center"
            >
              <div className="text-lg font-semibold mb-2">
                {membership.name}
              </div>
              <div className="text-3xl font-bold mb-2">{membership.price}</div>
              <div className="text-sm text-gray-500">
                {membership.perks.map((perk) => (
                  <div key={perk}>{perk}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
