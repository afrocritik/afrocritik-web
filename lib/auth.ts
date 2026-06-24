import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" }
          });
          const user = await res.json();

          if (res.ok && user?.user) {
            return {
              id: user.user.id,
              name: user.user.name,
              email: user.user.email,
              role: user.user.role,
              token: user.token,
              isProfileComplete: !!user.user.isProfileComplete,
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      }
    }),
    // Establishes a NextAuth session from a token issued by the backend's
    // OAuth callback (Google/Facebook). The OAuth redirect lands on a small
    // client page that calls signIn("oauth-token", { token }).
    CredentialsProvider({
      id: "oauth-token",
      name: "OAuth",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.token) return null;
        try {
          const res = await fetch(`${API_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${credentials.token}` },
          });
          const data = await res.json();
          if (res.ok && data?.user) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              token: credentials.token,
              isProfileComplete: !!data.user.isProfileComplete,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
        token.isProfileComplete = user.isProfileComplete;
      }
      // Allow the client to refresh the flag after finishing onboarding,
      // via useSession().update({ isProfileComplete: true }).
      if (trigger === "update" && session?.isProfileComplete !== undefined) {
        token.isProfileComplete = session.isProfileComplete;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.token = token.token as string;
        session.user.isProfileComplete = token.isProfileComplete as boolean;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
    newUser: '/profile-setup'
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
