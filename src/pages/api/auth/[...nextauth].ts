import connectMongo from "@/configs/db.config";
import User, { DTUser } from "@/models/User";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import {
  Awaitable,
  RequestInternal,
  Session,
  User as UserType,
} from "next-auth";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
      profile: async (userProfile) => {
        await connectMongo().catch((err) =>
          console.log({ error: "DB Connection failed!!" })
        );

        const userInfo: DTUser = {
          email: userProfile?.email,
          userName: userProfile?.name,
          profilePic: userProfile?.picture,
        };

        const isExist = await User?.findOne({ email: userInfo?.email });

        if (isExist) {
          return {
            ...userProfile,
            id: isExist?._id,
            email: isExist?.email,
            name: isExist?.userName,
            image: isExist?.profilePic,
          };
        } else {
          const confirmation = await User?.create(userInfo);

          if (confirmation) {
            return {
              ...userProfile,
              id: userProfile?.sub?.toString(),
              email: userProfile?.email,
              name: userProfile?.name,
              image: userProfile?.picture,
            };
          }
        }

        return userProfile;
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      authorize: async (
        credentials: Record<string, string>,
        req: Pick<RequestInternal, "headers" | "body" | "query" | "method">
      ) => {
        await connectMongo().catch((err) =>
          console.log({ error: "DB Connection Failed!!" })
        );

        const isExist = await User.findOne({
          email: credentials?.email,
        });

        if (!isExist) {
          throw Error("401_User not found. Please create account");
          // return null;
        } else {
          const checkPassword = await compare(
            credentials?.password,
            isExist?.password as string
          );

          if (!checkPassword || isExist?.email !== credentials?.email) {
            throw Error("403_Incorrect credentials");
            // return null;
          } else {
            return isExist;
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: ({ token }) => {
      return token;
    },
    session: async ({ session, token }) => {
      const dbUser = await User?.aggregate([
        {
          $match: { email: session?.user?.email },
        },
      ]);

      const sessionData = { ...session, authUser: dbUser };

      return sessionData;
    },
  },
});
