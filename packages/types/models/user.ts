import type { Role } from "./role";

export type User = {
  role: Role;
  active: boolean;
  first_name: string;
  display_name: string;
  created_date: Date;
  session_count: number;
  last_name: string | null;
};
