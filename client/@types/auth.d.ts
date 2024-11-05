import { User } from "./user";

type RegisterPayload = {
  name: string;
} & LoginPayload;

type LoginPayload = {
  email: string;
  password: string;
};

type Auth = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
};
