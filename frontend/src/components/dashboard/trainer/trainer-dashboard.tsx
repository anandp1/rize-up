import ClientTable from "./client-table";

const TrainerDashboard = () => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
  };
  return (
    <div className="flex flex-col gap-y-5">
      <div className={classes.containers}>
        <div className="text-2xl font-bold">Welcome Back, Joe</div>
        <div className="text-sm text-gray-500">Trainer Dashboard</div>
      </div>

      <div className={classes.containers}>
        <div className="flex flex-row">
          <p className="font-semibold my-auto">Clients</p>
        </div>
        <ClientTable />
      </div>
    </div>
  );
};

export default TrainerDashboard;
