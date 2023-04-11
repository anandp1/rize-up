import classNames from "classnames";
import { Gym, Membership } from "../../../../interfaces/interface";

interface FrontDeskDashboardProps {
  gymInfo: Gym;
  gymMembership: Membership[];
}

const FrontDeskDashboard: React.FC<FrontDeskDashboardProps> = ({
  gymInfo,
  gymMembership,
}: FrontDeskDashboardProps) => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };

  return (
    <div className="flex flex-col gap-y-5">
      <div className={classes.containers}>
        <div className="text-2xl font-bold">Welcome Back</div>
        <div className="text-sm text-gray-500">Front Desk Dashboard</div>
      </div>

      <div className={classNames(classes.containers, "mx-8")}>
        <p className="text-lg font-semibold mb-4">Gym Information</p>
        <p className="mb-2">
          <span className="font-semibold mr-2">Phone number:</span>
          {gymInfo.phone}
        </p>
        <p className="mb-2">
          <span className="font-semibold mr-2">Hours:</span>
          {gymInfo.hours}
        </p>
        <p className="mb-2">
          <span className="font-semibold mr-2">Address:</span>
          {gymInfo.address}
        </p>
        <p className="mb-2">
          <span className="font-semibold mr-2">Name:</span>
          {gymInfo.name}
        </p>
      </div>

      <div className={classNames(classes.containers, "mx-8")}>
        <p className="text-lg font-semibold mb-4">Memberships</p>
        <div className="grid grid-cols-3 gap-4">
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

export default FrontDeskDashboard;
