export type Privileges = {
  read: boolean;
  write: boolean;
  delete: boolean;
};

export type Role = {
  _id: string;
  level: "root" | "admin" | "viewer";
  privileges: Privileges;
};
