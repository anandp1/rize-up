import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { Listbox } from "@headlessui/react";

import MemberInfo from "../components/member/member-info";
import Layout from "../components/shared/layout";
import Model from "../components/model/model";

interface SettingsProps {
  username: string;
  role: string;
}

const Settings: React.FC<SettingsProps> = ({
  username,
  role,
}: SettingsProps) => {
  const memberships = ["Regular", "Premium", "Gold"];

  const [updateInfoModel, setUpdateInfoModel] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(memberships[0]);
  const [email, setEmail] = useState("johndoe@mail.com");
  const deleteAccount = () => {
    // API to delete account
  };

  const updateInformation = () => {
    // API to update information
    setUpdateInfoModel(false);
  };

  return (
    <Layout>
      {updateInfoModel && (
        <Model open={updateInfoModel} setOpen={setUpdateInfoModel}>
          <div className="flex flex-col gap-y-3">
            <p className="text-xl text-center font-bold">Update Information</p>
            <input
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Listbox
              value={selectedMembership}
              onChange={setSelectedMembership}
            >
              <div className="relative">
                <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm">
                  <span className="block truncate">{selectedMembership}</span>
                </Listbox.Button>

                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {memberships.map((membership) => (
                    <Listbox.Option
                      key={membership}
                      value={membership}
                      className={({ active }) =>
                        `${active ? "text-white bg-blue-600" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-3 pr-9`
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal"
                            } block truncate`}
                          >
                            {membership}
                          </span>
                          {selected && (
                            <span
                              className={`${
                                active ? "text-white" : "text-blue-600"
                              }
                                    absolute inset-y-0 right-0 flex items-center pr-4`}
                            ></span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            <button
              onClick={updateInformation}
              className="px-4 py-2 bg-slate-100 rounded-md border border-slate-100"
            >
              Update
            </button>
          </div>
        </Model>
      )}
      <div className="flex flex-col gap-y-5 h-screen justify-center">
        <MemberInfo />
        <div className="mt-6 flex justify-center gap-x-4">
          <button
            onClick={() => setUpdateInfoModel(true)}
            className="px-4 py-2 bg-slate-200 rounded-md border border-slate-100"
          >
            Update Information
          </button>
          <button
            onClick={deleteAccount}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete Account
          </button>
        </div>
      </div>
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      username: session.user.email,
      role: session.user.name,
    },
  };
};

export { getServerSideProps };

export default Settings;
