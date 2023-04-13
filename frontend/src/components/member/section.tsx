import classNames from "classnames";
import { Disclosure } from "@headlessui/react";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";

import { SignInRole } from "../../pages/sign-in";
import { ClassSection } from "../../../interfaces/interface";
import { daysMap, getEndTime } from "../../../utils/helper";
import { KeyedMutator } from "swr";
import { useState } from "react";
import Model from "../model/model";
import Trainer from "../../pages/trainer";

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
  const [showModel, setShowModel] = useState(false);
  const [classList, setClassList] = useState<String[]>([]);

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

  const viewClassListClicked = async (
    sectionNumber: number,
    className: string
  ) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/trainer/classlist/${sectionNumber}/${className}`
      );
      setClassList(res.data);
      setShowModel(true);
    } catch {
      alert("Failed to load class list");
    }
  };

  return (
    <>
      {showModel && (
        <Model open={showModel} setOpen={setShowModel}>
          <div className="flex flex-col gap-y-2">
            <div className="text-xl font-bold">Class List</div>
            <div className="flex flex-col gap-y-1">
              {classList.length > 0 ? (
                classList.map((member, index) => (
                  <div key={index}>{member}</div>
                ))
              ) : (
                <div>No members in this class</div>
              )}
            </div>
          </div>
        </Model>
      )}
      {sections.map((section) =>
        section.sec ? (
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
                <div className="flex flex-row gap-x-1">
                  <p className={classes.descriptionText}>
                    {section.trainer}, Room {section.room}
                  </p>
                  {(usedBy === SignInRole.MANAGER ||
                    usedBy === SignInRole.FRONT_DESK) && (
                    <AiOutlineEye
                      onClick={async () =>
                        await viewClassListClicked(section.sec, section.name)
                      }
                      className="my-auto hover:cursor-pointer"
                    />
                  )}
                </div>
                <p className={classes.descriptionText}>
                  Max {section.capacity}
                </p>
              </div>
            </Disclosure.Panel>
          </div>
        ) : (
          <div
            key={section.name}
            className={classNames(classes.container, "mx-10")}
          >
            <p>No sections</p>
          </div>
        )
      )}
    </>
  );
};

export default Section;
