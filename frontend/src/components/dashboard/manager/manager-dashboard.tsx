import classNames from "classnames";
import { ClassSection, Report } from "../../../../interfaces/interface";

interface ManagerDashboardProps {
  report: Report;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  report,
}: ManagerDashboardProps) => {
  const classes = {
    containers: "bg-white rounded-lg flex flex-col p-5",
    section: "mb-4",
    title: "text-lg font-bold mb-2",
    subtitle: "text-sm text-gray-500",
    data: "text-2xl font-bold",

    heading: "text-xl font-bold mb-3",
    subheading: "text-lg font-semibold mb-1",
    classSection: "flex flex-row justify-between items-center mb-1",
    sectionName: "font-semibold mr-3",
    sectionCount: "bg-gray-200 rounded-lg py-1 px-2",
  };

  const groupedClassSections: { [className: string]: ClassSection[] } = {};

  // group the class sections by class name
  for (const classSection of report["classAttendance"]) {
    if (!groupedClassSections[classSection.name]) {
      groupedClassSections[classSection.name] = [];
    }
    groupedClassSections[classSection.name].push(classSection);
  }

  return (
    <div className="flex flex-col gap-y-5">
      <div className={classes.containers}>
        <div className="text-2xl font-bold">Welcome Back</div>
        <div className="text-sm text-gray-500">Manager Dashboard</div>
      </div>
      <div className="text-lg font-bold mt-5 ml-1">Daily Report</div>
      <div className={classes.containers}>
        <div className={classes.section}>
          <div className={classes.title}>Active Members</div>
          <div className={classes.subtitle}>
            Number of members registered in the gym
          </div>
          <div className={classes.data}>{report.activeMembers}</div>
        </div>
        <div className={classes.section}>
          <div className={classes.title}>New Members</div>
          <div className={classes.subtitle}>
            Number of members who joined in the last 30 days
          </div>
          <div className={classes.data}>{report.newMembers}</div>
        </div>
      </div>
      <div
        className={classNames(classes.containers, "overflow-y-auto max-h-96")}
      >
        <div className={classes.heading}>Class Attendance</div>

        {Object.keys(groupedClassSections).map((className) => (
          <div key={className} className="mb-3">
            <div className={classes.subheading}>{className}</div>
            {groupedClassSections[className].map((section) => (
              <div key={section.sec} className={classes.classSection}>
                <div className={classes.sectionName}>Section {section.sec}</div>
                <div className={classes.sectionCount}>{section.joined}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;
