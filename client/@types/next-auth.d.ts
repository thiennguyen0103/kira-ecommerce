import { AuthResponse } from "./auth";

declare module "next-auth" {
  interface Session extends AuthResponse {}

  interface User extends AuthResponse {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string;
    refreshToken: string;
    tokenExpires: number;
    user: User;
  }
}
