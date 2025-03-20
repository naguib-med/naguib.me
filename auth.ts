import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";
import type { Session } from "next-auth";
import { authConfig } from "./auth.config";

interface ExtendedSession extends Session {
  accessToken?: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // Import edge-compatible config
  adapter: PrismaAdapter(prisma), // Non-edge compatible adapter
  callbacks: {
    ...authConfig.callbacks, // Keep the authorized callback
    // Non-edge compatible callbacks
    async session({ session, token }): Promise<ExtendedSession> {
      return {
        ...session,
        accessToken: token.accessToken as string,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        const u = user as User & { role: string };
        return {
          ...token,
          id: u.id,
          role: u.role,
        };
      }
      return token;
    },
  },
});
