import GitHubProvider from "next-auth/providers/github";

import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { api_user } from "../../../libs/api/user";
import { UserParam } from "../../../Types/User/user";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_URL,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token)
        session.user = token.user as {
          id: string;
          name: string;
          email?: string;
          image: string;
        };

      const hasTheUser = await api_user.verifyUserExist(session.user.id);
      if (!hasTheUser) await api_user.saveLoggedUser(session.user as UserParam);

      return session;
    },
  },
};

export default NextAuth(authOptions);
