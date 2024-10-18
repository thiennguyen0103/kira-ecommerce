import { User } from "./user";

export type RegisterPayload = {
  name: string;
} & LoginPayload;

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
};
