import { RxDashboard } from "react-icons/rx";
import {
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { AiOutlineSchedule } from "react-icons/ai";

import { SignInRole } from "../../../pages/sign-in";
import { useRouter } from "next/router";
import { useState } from "react";
import classNames from "classnames";
import Link from "next/link";

const SideNavBar = () => {
  const router = useRouter();
  const pageName = router.pathname.split("/")?.[1];
  const [selectedNavItem, setSelectedNavItem] = useState(
    !pageName || pageName === "" ? "Dashboard" : pageName
  );

  console.log(selectedNavItem);

  const classes = {
    icon: "absolute top-1.5 left-1.5",
  };

  const handleNavItemClicked = (name: string) => {
    setSelectedNavItem(name);
    if (name === "Dashboard") {
      router.push("/");
      return;
    }

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
            selectedNavItem === "clients" ? "text-white" : ""
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
            selectedNavItem === "trainer" ? "text-white" : ""
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
      name: "Schedule",
      icon: (
        <AiOutlineSchedule
          className={classNames(
            classes.icon,
            selectedNavItem === "schedule" ? "text-white" : ""
          )}
        />
      ),
      link: "/schedule",
      roles: [
        SignInRole.MANAGER,
        SignInRole.FRONT_DESK,
        SignInRole.TRAINER,
        SignInRole.MEMBER,
      ],
    },
    {
      name: "Settings",
      icon: (
        <IoSettingsOutline
          className={classNames(
            classes.icon,
            selectedNavItem === "settings" ? "text-white" : ""
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
            <Link passHref key={item.name} href={`${item.link}`}>
              <div
                className={classNames(
                  "mx-auto relative bg-slate-100 w-7 h-7 rounded-sm",
                  selectedNavItem.toLowerCase() === item.name.toLowerCase()
                    ? "bg-violet-900 shadow-2xl"
                    : ""
                )}
              >
                {item.icon}
              </div>
              <p
                className={classNames(
                  "text-xs text-center mt-1",
                  selectedNavItem.toLowerCase() === item.name.toLowerCase()
                    ? "font-medium"
                    : ""
                )}
              >
                {item.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavBar;
