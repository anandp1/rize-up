import { Disclosure, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { AiOutlineUp } from "react-icons/ai";
import useSWR from "swr";
import axios from "axios";

import { ClassSection, ClassSectionsMap } from "../../../interfaces/interface";
import { fetcher } from "../../../utils/fetcher";
import { SignInRole } from "../../pages/sign-in";
import Section from "./section";
import ManageClassOptions from "../manager/manage-class-options";

interface ClassProps {
  usedBy?: SignInRole;
  memberEmail?: string;
}

const groupClassesByClassName = (classes: ClassSection[]): ClassSectionsMap => {
  const result: ClassSectionsMap = {};

  classes.forEach((c) => {
    const className = c.name;

    if (!result[className]) {
      result[className] = [];
    }

    result[className].push(c);
  });

  return result;
};

const removeBySec = (x: ClassSection[], y: ClassSection[]): ClassSection[] => {
  return x.filter((cs) => {
    const isInY = y.find((yCs) => yCs.sec === cs.sec && yCs.name === cs.name);
    return !isInY;
  });
};

const Class: React.FC<ClassProps> = ({ usedBy, memberEmail }: ClassProps) => {
  const classes = {
    container: "bg-white rounded-lg flex flex-col p-5 mx-6",
    header: "flex justify-between items-center cursor-pointer",
    headerText: "text-lg font-bold text-left",
    descriptionText: "text-sm text-gray-500 font-bold",
  };

  const [allClassesByClassName, setAllClassesByClassName] =
    useState<ClassSectionsMap>({});

  const {
    data: allClasses,
    error: allClassesError,
    mutate: allClassesRevalidateData,
  } = useSWR<ClassSection[]>(
    `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/class/all/${process.env.NEXT_PUBLIC_GYM_ID}`,
    fetcher
  );

  const {
    data: memberSchedule,
    error: memberScheduleError,
    mutate: memberScheduleRevalidateData,
  } = useSWR<ClassSection[]>(
    usedBy === SignInRole.MEMBER
      ? `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/schedule/${memberEmail}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (allClasses && usedBy !== SignInRole.MEMBER) {
      setAllClassesByClassName(groupClassesByClassName(allClasses));
      return;
    }
    if (!allClasses || !memberSchedule) return;

    setAllClassesByClassName(
      groupClassesByClassName(removeBySec(allClasses, memberSchedule))
    );
  }, [allClasses, memberSchedule, usedBy]);

  if (
    allClassesError ||
    (memberScheduleError && usedBy === SignInRole.MEMBER)
  ) {
    return <div>Failed to load</div>;
  }

  if (!allClasses || (!memberSchedule && usedBy === SignInRole.MEMBER)) {
    return <div>Loading...</div>;
  }

  const removeClass = async (className: string) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/manager/class/delete/${className}`
      );

      allClassesRevalidateData();
    } catch {
      alert("Failed to remove class");
    }
  };

  return (
    <>
      {usedBy === SignInRole.MANAGER && (
        <ManageClassOptions
          allClassNames={Object.keys(groupClassesByClassName(allClasses))}
          allClassesRevalidateData={allClassesRevalidateData}
        />
      )}
      {Object.keys(allClassesByClassName).map((className) => (
        <Disclosure key={className}>
          {({ open }) => (
            <>
              <div className={classes.container}>
                <Disclosure.Button className={classes.header}>
                  <div>
                    <p className={classes.headerText}>{className} Class</p>
                    <p className={classes.descriptionText}>
                      {allClassesByClassName[className][0].length} minutes • $
                      {allClassesByClassName[className][0].cost}
                    </p>
                  </div>
                  <AiOutlineUp
                    className={`${open ? "transform rotate-180" : ""} w-5 h-5`}
                  />
                </Disclosure.Button>
                {SignInRole.MANAGER === usedBy && (
                  <button
                    onClick={async () => await removeClass(className)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md mt-3 mb-1 ml-auto w-full sm:w-fit"
                  >
                    Remove Class
                  </button>
                )}
              </div>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <div className="flex flex-col gap-y-2">
                  <Section
                    usedBy={usedBy}
                    sections={allClassesByClassName[className]}
                    memberScheduleRevalidateData={memberScheduleRevalidateData}
                    memberEmail={memberEmail}
                  />
                </div>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );
};

export default Class;
