import classNames from "classnames";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export enum SignInRole {
  MANAGER = "Manager",
  MEMBER = "Member",
  FRONT_DESK = "Front Desk",
  TRAINER = "Trainer",
}

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [role, setRole] = useState<SignInRole>(SignInRole.MANAGER);

  const router = useRouter();

  const handleSignIn = () => {
    signIn("credentials", {
      username: `${role}-${username}`,
      password,
      redirect: false,
    });

    router.push("/");
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 mt-24 mx-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
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
                  required
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
            <button
              onClick={() => setDropdown(!dropdown)}
              className="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
            >
              {role || "Select Role"}
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
                {Object.values(SignInRole).map((role) => (
                  <li key={role}>
                    <button
                      onClick={() => {
                        setRole(role);
                        setDropdown(false);
                      }}
                      className="block text-center w-full py-2 hover:bg-gray-100"
                    >
                      {role}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button
                onClick={handleSignIn}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <button className="flex w-full justify-center rounded-md border border-transparent bg-indigo-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Create an account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session?.user?.email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export { getServerSideProps };

export default SignIn;
