export type Privileges = {
  read: boolean;
  write: boolean;
  delete: boolean;
};

export type Role = {
  level: "root" | "admin" | "viewer";
  privileges: Privileges;
};
