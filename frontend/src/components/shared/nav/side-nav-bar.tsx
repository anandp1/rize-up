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
import { signOut, useSession } from "next-auth/react";

const SideNavBar = () => {
  const router = useRouter();
  const pageName = router.pathname.split("/")?.[1];
  const [selectedNavItem, setSelectedNavItem] = useState(
    !pageName || pageName === "" ? "Dashboard" : pageName
  );
  const session = useSession();
  const { data: sessionData } = session;
  const role = sessionData?.user?.name;

  if (!role) return <p>loading</p>;

  const classes = {
    icon: "absolute top-1.5 left-1.5",
  };
  const signOutClicked = () => {
    signOut();
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
      roles: [SignInRole.MANAGER, SignInRole.FRONT_DESK],
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
      roles: [SignInRole.MEMBER, SignInRole.FRONT_DESK],
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
      link:
        role === SignInRole.FRONT_DESK || role === SignInRole.MANAGER
          ? "schedule/classes"
          : "/schedule",
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
      roles: [SignInRole.MEMBER as string],
    },
    {
      name: "Profile",
      icon: (
        <IoPersonOutline
          className={classNames(
            classes.icon,
            selectedNavItem === "profile" ? "text-white" : ""
          )}
        />
      ),
      link: "/profile",
      roles: [SignInRole.TRAINER as string],
    },
    {
      name: "Employees",
      icon: (
        <IoPersonOutline
          className={classNames(
            classes.icon,
            selectedNavItem === "employees" ? "text-white" : ""
          )}
        />
      ),
      link: "/employees",
      roles: [SignInRole.MANAGER as string],
    },
  ];
  return (
    <div className="flex flex-col px-5 mx-auto">
      <div className="mt-6 mb-14">
        <p className="text-violet-900 font-semibold">Rize Up</p>
        <button
          onClick={signOutClicked}
          className="text-xs ml-1 text-gray-500 hover:underline"
        >
          Sign out
        </button>
      </div>
      <div className="flex flex-col gap-y-7">
        {navItems.map((item) => {
          return (
            item.roles.includes(role) && (
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
            )
          );
        })}
      </div>
    </div>
  );
};

export default SideNavBar;
