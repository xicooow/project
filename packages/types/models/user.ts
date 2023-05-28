import type { Role } from "./role";

export type User = {
  _id: string;
  role: Role;
  email: string;
  active: boolean;
  first_name: string;
  display_name: string;
  created_date: string;
  session_count: number;
  last_name?: string;
};

export type CreateUser = Pick<User, "email" | "first_name" | "last_name">;
