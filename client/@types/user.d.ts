export type User = {
  id: string;
  email: string;
  provider: string;
  socialId: string;
  firstName: string;
  lastName: string;
  photo: Photo;
  role: Role;
  status: Status;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type Photo = {
  id: string;
  path: string;
};

export type Role = {
  id: string;
  name: string;
};

export type Status = {
  id: string;
  name: string;
};
