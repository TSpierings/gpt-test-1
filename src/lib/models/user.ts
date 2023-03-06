export enum UserRole {
  default = 'default',
  editor = 'editor',
  admin = 'admin'
};

export type User = {
  name: string,
  email: string,
  image: string,
  role?: UserRole
};
