import { authService } from "@/services/auth.service";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/v1/auth/refresh",
    {
      method: "POST",
      headers: {
        authorization: `Refresh ${token.refreshToken}`,
      },
    },
  );

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = credentials;

        const response = await authService.login({ email, password });
        if (response.data) {
          return response.data as any;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.tokenExpires) return token;

      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.token = token.token as any;
      session.refreshToken = token.refreshToken as any;
      session.tokenExpires = token.expires as any;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
