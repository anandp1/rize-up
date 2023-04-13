import type { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import useSWR from "swr";

import MemberInfo from "../components/member/member-info";
import Layout from "../components/shared/layout";
import Model from "../components/model/model";
import { Customer } from "../../interfaces/interface";
import { fetcher } from "../../utils/fetcher";
import axios from "axios";

interface SettingsProps {
  username: string;
  role: string;
}

const Settings: React.FC<SettingsProps> = ({
  username,
  role,
}: SettingsProps) => {
  const memberships = ["Basic", "Premium", "Gold"];

  const [updateInfoModel, setUpdateInfoModel] = useState(false);
  const [changePasswordModel, setChangePasswordModel] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(memberships[0]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    data: memberInfo,
    error,
    mutate: revalidateData,
  } = useSWR<Customer>(
    `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/account/${username}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!memberInfo) return <div>Loading...</div>;

  const deleteAccount = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/account/delete/${username}`
      );

      alert(response.data.message);
      signOut();
    } catch {
      alert("Error deleting account");
    }
  };

  const updateInformation = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/account/update/${username}/${selectedMembership}`
      );

      alert("Updated information successfully");
      revalidateData();
    } catch {
      alert("Error updating information");
    }
    setUpdateInfoModel(false);
  };

  const updatePassword = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/account/update/password/${username}/${password}`
      );

      alert("Password updated successfully");
      revalidateData();
    } catch {
      alert("Error updating password");
    }
    setChangePasswordModel(false);
  };

  return (
    <Layout>
      {changePasswordModel && (
        <Model open={changePasswordModel} setOpen={setChangePasswordModel}>
          <div className="flex flex-col gap-y-3">
            <p className="text-xl text-center font-bold">Change Password</p>
            <input
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-slate-100 rounded-md border border-slate-100"
              onClick={updatePassword}
            >
              Update
            </button>
          </div>
        </Model>
      )}
      {updateInfoModel && (
        <Model open={updateInfoModel} setOpen={setUpdateInfoModel}>
          <div className="flex flex-col gap-y-3">
            <p className="text-xl text-center font-bold">Update Information</p>
            <input
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              value={email ?? memberInfo.email}
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
        <MemberInfo memberInfo={memberInfo} />
        <p
          onClick={() => setChangePasswordModel(true)}
          className="text-blue-500 hover:underline hover:cursor-pointer mx-auto"
        >
          Change Password
        </p>

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
