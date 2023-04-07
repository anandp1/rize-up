import { RxDashboard } from "react-icons/rx";
import {
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { SignInRole } from "../../../pages/sign-in";
import { useRouter } from "next/router";
import { useState } from "react";
import classNames from "classnames";
import Link from "next/link";

const SideNavBar = () => {
  const router = useRouter();

  const [selectedNavItem, setSelectedNavItem] = useState("Dashboard");

  const classes = {
    icon: "absolute top-1.5 left-1.5",
  };

  const handleNavItemClicked = (name: string) => {
    setSelectedNavItem(name);
    router.push(`/${name.toLowerCase()}`);
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: (
        <RxDashboard
          className={classNames(
            classes.icon,
            selectedNavItem === "Dashboard" ? "text-white" : ""
          )}
        />
      ),
      link: "/",
      roles: [
        SignInRole.MANAGER,
        SignInRole.MEMBER,
        SignInRole.FRONT_DESK,
        SignInRole.TRAINER,
      ],
    },
    {
      name: "Clients",
      icon: (
        <IoPeopleOutline
          className={classNames(
            classes.icon,
            selectedNavItem === "Clients" ? "text-white" : ""
          )}
        />
      ),
      link: "/clients",
      roles: [SignInRole.MANAGER, SignInRole.FRONT_DESK, SignInRole.TRAINER],
    },
    {
      name: "Trainer",
      icon: (
        <IoPersonOutline
          className={classNames(
            classes.icon,
            selectedNavItem === "Trainer" ? "text-white" : ""
          )}
        />
      ),
      link: "/trainer",
      roles: [
        SignInRole.MANAGER,
        SignInRole.FRONT_DESK,
        SignInRole.TRAINER,
        SignInRole.MEMBER,
      ],
    },
    {
      name: "Setting",
      icon: (
        <IoSettingsOutline
          className={classNames(
            classes.icon,
            selectedNavItem === "Setting" ? "text-white" : ""
          )}
        />
      ),
      link: "/settings",
      roles: [
        SignInRole.MANAGER,
        SignInRole.FRONT_DESK,
        SignInRole.TRAINER,
        SignInRole.MEMBER,
      ],
    },
  ];
  return (
    <div className="flex flex-col px-5">
      <p className="mt-6 mb-16 text-violet-900 font-semibold">Rize Up</p>
      <div className="flex flex-col gap-y-7">
        {navItems.map((item) => {
          return (
            <button
              key={item.name}
              onClick={() => handleNavItemClicked(item.name)}
            >
              <div
                className={classNames(
                  "mx-auto relative bg-slate-100 w-7 h-7 rounded-sm",
                  selectedNavItem === item.name
                    ? "bg-violet-900 shadow-2xl"
                    : ""
                )}
              >
                {item.icon}
              </div>
              <p
                className={classNames(
                  "text-xs text-center mt-1",
                  selectedNavItem === item.name ? "font-medium" : ""
                )}
              >
                {item.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavBar;
