export type UserCreateDTO = {
  name: string;
  username: string;
  password: string;
};

export type UpdateUserAddRoleDTO = {
  _id: string;
  roles: string[];
};
