import classNames from "classnames";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { RxChevronLeft } from "react-icons/rx";
import Link from "next/link";

export enum Gender {
  M = "Male",
  F = "Female",
}

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.M);

  const router = useRouter();
  const handleSignUp = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_RIZE_API_URL}/sign-up`, {
        email: username,
        password,
        birthDate,
        gender,
        firstName,
        lastName,
      });

      alert("Account created successfully");
      router.push("/sign-in");
    } catch {
      alert("Error creating account");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 mt-24 mx-8">
      <Link href="/">
        <RxChevronLeft className="w-8 h-8" />
      </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create a Account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  onChange={(event) => setUsername(event.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birth Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(event) => setBirthDate(event.target.value)}
                  value={birthDate}
                ></input>
              </div>
            </div>
            <div className="flex flex-row gap-x-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    onChange={(event) => setFirstName(event.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    onChange={(event) => setLastName(event.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => setDropdown(!dropdown)}
              className="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
            >
              {gender || "Select gender"}
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              className={classNames(
                "z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44",
                dropdown ? "block" : "hidden"
              )}
            >
              <ul className="py-2 text-sm text-gray-700 w-full">
                {Object.values(Gender).map((gender) => (
                  <li key={gender}>
                    <button
                      onClick={() => {
                        setGender(gender);
                        setDropdown(false);
                      }}
                      className="block text-center w-full py-2 hover:bg-gray-100"
                    >
                      {gender}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button
                onClick={handleSignUp}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
