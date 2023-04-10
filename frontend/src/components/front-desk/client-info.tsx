import { useState } from "react";
import { Listbox } from "@headlessui/react";

import Model from "../model/model";

const ClientInfo = () => {
  const deleteAccount = () => {
    // api to delete account
  };

  const memberships = ["Regular", "Premium", "Gold"];

  const [updateInfoModel, setUpdateInfoModel] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(memberships[0]);
  const [email, setEmail] = useState("johndoe@mail.com");

  const updateInformation = () => {
    // API to update information
    setUpdateInfoModel(false);
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
      <div className="bg-white rounded-lg flex flex-col px-6 pt-8 pb-4 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Name</p>
            <p className="text-gray-700">Joe Doe</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Date of Birth</p>
            <p className="text-gray-700">2001/01/01</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Age</p>
            <p className="text-gray-700">13</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Gender</p>
            <p className="text-gray-700">M</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Date Joined</p>
            <p className="text-gray-700">2022/01/01</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Membership Type</p>
            <p className="text-gray-700">Regular Membership</p>
          </div>
        </div>
        <button
          onClick={deleteAccount}
          className="px-4 py-2 bg-red-500 text-white rounded-md mt-3 mb-1"
        >
          Delete Account
        </button>
        <button
          onClick={() => setUpdateInfoModel(true)}
          className="px-4 py-2 bg-slate-200 rounded-md border border-slate-100"
        >
          Update Information
        </button>
      </div>
    </div>
  );
};

export default ClientInfo;
