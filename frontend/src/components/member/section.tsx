import classNames from "classnames";
import { Disclosure } from "@headlessui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SignInRole } from "../../pages/sign-in";

interface SectionProps {
  usedBy?: SignInRole;
}

const Section: React.FC<SectionProps> = ({ usedBy }: SectionProps) => {
  const classes = {
    container:
      usedBy === SignInRole.MEMBER
        ? "bg-white rounded-lg flex flex-col p-5 mx-6 group hover:cursor-pointer hover:opacity-50"
        : "bg-white rounded-lg flex flex-col p-5 mx-6",
    headerText: "text-lg font-bold",
    descriptionText: "text-sm text-gray-500 font-bold",
  };

  const addClass = () => {
    // API to add class for user
  };

  return (
    <div onClick={addClass} className={classNames(classes.container, "mx-10")}>
      <Disclosure.Panel>
        {usedBy === SignInRole.MEMBER && (
          <span className="hidden group-hover:block absolute right-1/2 top-1/2">
            <AiOutlinePlusCircle className="text-black w-6 h-6" />
          </span>
        )}
        <div>
          <p className={classes.headerText}>Section 1</p>
          <p className={classes.descriptionText}>Monday, 8:00PM-9:00PM</p>
          <p className={classes.descriptionText}>Section 11, Room 10</p>
          <p className={classes.descriptionText}>10 / 11</p>
        </div>
      </Disclosure.Panel>
    </div>
  );
};

export default Section;
