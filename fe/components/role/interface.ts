export interface iRole {
  roleId: string;
  roleName: string;
  permission: string;
}

export interface iRoleList {
  roles: iRole[];
}
