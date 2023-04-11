import { useState } from "react";
import { Listbox } from "@headlessui/react";
import useSWR from "swr";
import axios from "axios";

import Model from "../model/model";
import { Customer } from "../../../interfaces/interface";
import { fetcher } from "../../../utils/fetcher";

const ClientInfo = () => {
  const memberships = ["Basic", "Premium", "Gold"];

  const [updateInfoModel, setUpdateInfoModel] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(memberships[0]);
  const [email, setEmail] = useState("");
  const [selectedClient, setSelectedClient] = useState<Customer>();

  const {
    data: clientInfo,
    error,
    mutate: revalidateData,
  } = useSWR<Customer[]>(
    `${process.env.NEXT_PUBLIC_RIZE_API_URL}/frontdesk/members/all`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!clientInfo) return <div>Loading...</div>;

  const updateInformation = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/account/update/${email}/${selectedMembership}`
      );

      alert("Updated information successfully");
      revalidateData();
    } catch {
      alert("Error updating information");
    }
    setUpdateInfoModel(false);
  };

  const deleteAccount = async (email: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/account/delete/${email}`
      );

      alert(response.data.message);
    } catch {
      console.log("Error deleting account");
    }
  };
  return (
    <div className="flex">
      {updateInfoModel && (
        <Model open={updateInfoModel} setOpen={setUpdateInfoModel}>
          <div className="flex flex-col gap-y-3">
            <p className="text-xl text-center font-bold">Update Information</p>
            <input
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              value={email ?? selectedClient?.email}
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
      {clientInfo.map((client) => (
        <div
          key={client.email}
          className="bg-white rounded-lg flex flex-col px-6 pt-8 pb-4 max-w-lg mx-auto max-h-screen overflow-y-auto"
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <p className="text-lg font-semibold mb-1">Name</p>
              <p className="text-gray-700">
                {client.firstName} {client.lastName}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold mb-1">Date of Birth</p>
              <p className="text-gray-700">{client.birthDate}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold mb-1">Age</p>
              <p className="text-gray-700">{client.age}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold mb-1">Gender</p>
              <p className="text-gray-700">{client.gender}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold mb-1">Date Joined</p>
              <p className="text-gray-700">{client.dateJoined}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold mb-1">Membership Type</p>
              <p className="text-gray-700">{client.membershipName}</p>
            </div>
          </div>
          <button
            onClick={async () => await deleteAccount(client.email)}
            className="px-4 py-2 bg-red-500 text-white rounded-md mt-3 mb-1"
          >
            Delete Account
          </button>
          <button
            onClick={() => {
              setUpdateInfoModel(true);
              setSelectedClient(client);
            }}
            className="px-4 py-2 bg-slate-200 rounded-md border border-slate-100"
          >
            Update Information
          </button>
        </div>
      ))}
    </div>
  );
};

export default ClientInfo;
