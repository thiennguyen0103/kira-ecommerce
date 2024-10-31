type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  isActive: boolean;
  role: Role;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type Photo = {
  id: string;
  path: string;
};

type Role = {
  id: string;
  name: string;
};

type Status = {
  id: string;
  name: string;
};
