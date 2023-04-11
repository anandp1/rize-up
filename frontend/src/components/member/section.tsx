import classNames from "classnames";
import { Disclosure } from "@headlessui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";

import { SignInRole } from "../../pages/sign-in";
import { ClassSection } from "../../../interfaces/interface";
import { daysMap, getEndTime } from "../../../utils/helper";
import { KeyedMutator } from "swr";

interface SectionProps {
  usedBy?: SignInRole;
  sections: ClassSection[];
  memberEmail?: string;
  memberScheduleRevalidateData?: KeyedMutator<ClassSection[]>;
}

const Section: React.FC<SectionProps> = ({
  usedBy,
  sections,
  memberScheduleRevalidateData,
  memberEmail,
}: SectionProps) => {
  const classes = {
    container:
      usedBy === SignInRole.MEMBER
        ? "bg-white rounded-lg flex flex-col p-5 mx-6 group hover:cursor-pointer hover:opacity-50"
        : "bg-white rounded-lg flex flex-col p-5 mx-6",
    headerText: "text-lg font-bold",
    descriptionText: "text-sm text-gray-500 font-bold",
  };

  const addClass = async (className: string, sectionId: number) => {
    if (usedBy !== SignInRole.MEMBER) return;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/class/add/${className}/${memberEmail}/${sectionId}`
      );

      memberScheduleRevalidateData?.();
      alert("Class added successfully");
    } catch {
      alert("Failed to add class");
    }
  };

  return (
    <>
      {sections.map((section) => (
        <div
          key={section.sec}
          onClick={async () => await addClass(section.name, section.sec)}
          className={classNames(classes.container, "mx-10")}
        >
          <Disclosure.Panel>
            <div>
              <p className={classes.headerText}>Section {section.sec}</p>
              <p className={classes.descriptionText}>
                {daysMap[section.day]}, {section.time} to{" "}
                {getEndTime(section.time, section.length)}
              </p>
              <p className={classes.descriptionText}>
                {section.trainer}, Room {section.room}
              </p>
              <p className={classes.descriptionText}>Max {section.capacity}</p>
            </div>
          </Disclosure.Panel>
        </div>
      ))}
    </>
  );
};

export default Section;
