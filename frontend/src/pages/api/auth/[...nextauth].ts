import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

async function auth(request: NextApiRequest, response: NextApiResponse) {
  return NextAuth(request, response, {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "username",
          },
          password: {
            label: "Password",
            type: "password",
          },
        },
        async authorize(credentials) {
          const res = await axios.post(
            `${process.env.RIZEUP_API}/api/sign-in`,
            {
              credentials,
            }
          );

          console.log(res.data);
          const user = await res.data;

          if (res.status === 200 && user) {
            return user;
          }
          return null;
        },
      }),
    ],
    pages: {
      signIn: "/sign-in",
      error: "/sign-in",
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async signIn({ account }) {
        if (account?.provider === "credentials") {
          return true;
        }

        return false;
      },

      async session({ session }) {
        return session;
      },
    },
    secret: process.env.NEXT_AUTH_SECRET,
  });
}

export default auth;
