import { Disclosure, Transition } from "@headlessui/react";
import { AiOutlineUp } from "react-icons/ai";
import { SignInRole } from "../../pages/sign-in";

import Section from "./section";

interface ClassProps {
  usedBy?: SignInRole;
}

const Class: React.FC<ClassProps> = ({ usedBy }: ClassProps) => {
  const classes = {
    container: "bg-white rounded-lg flex flex-col p-5 mx-6",
    header: "flex justify-between items-center cursor-pointer",
    headerText: "text-lg font-bold",
    descriptionText: "text-sm text-gray-500 font-bold",
  };

  const removeClass = () => {
    // api to remove class
  };

  // api to get all classes but then exclude the ones that the user is already in (this should be passed as a prop)
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className={classes.container}>
            <Disclosure.Button className={classes.header}>
              <div>
                <p className={classes.headerText}>Yoga Class</p>
                <p className={classes.descriptionText}>1 Hour • $40</p>
              </div>
              <AiOutlineUp
                className={`${open ? "transform rotate-180" : ""} w-5 h-5`}
              />
            </Disclosure.Button>
            {SignInRole.MANAGER && (
              <button
                onClick={removeClass}
                className="px-4 py-2 bg-red-500 text-white rounded-md mt-3 mb-1 ml-auto w-1/3"
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
              <Section usedBy={usedBy} />
            </div>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Class;
