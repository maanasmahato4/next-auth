import User from "@/lib/models/user";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import DBConnection from "@/lib/database/database";

DBConnection();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "eg: john doe",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("incorrect credentials");
        }
        if (!credentials?.password) {
          throw new Error("password should not be empty");
        }
        const matched = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!matched) {
          throw new Error("incorrect credentials");
        }

        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
