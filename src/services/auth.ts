import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./apiGuest";
import type { NextAuthConfig } from "next-auth";

// Extendendo o tipo de sessão para incluir nosso guestId
declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name?: string;
      image?: string;
      guestId?: string;
    };
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    authorized({
      auth,
    }: {
      auth: { user: import("next-auth").Session["user"] } | null;
    }) {
      return !!auth?.user;
    },

    async signIn({ user}) {
      try {
        if (!user.email) return false;
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({
            email: user.email!,
            fullName: user.name ?? "Unknown",
          });

        return true;
      } catch {
        return false;
      }
    },

    async session({ session }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
