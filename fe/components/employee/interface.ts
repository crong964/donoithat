export interface iEmployee {
  phoneNumber: string;
  fullName: string;
  account: string;
  roleName: string;
  userId: string;
}
export interface iEmployeeForm {
  phoneNumber: string;
  fullName: string;
  account: string;
  password: string;
  roleId: string;
  userId: string;
}
export interface iEmployeeBackup {
  account: string;
  password: string;
  roleId: string;
  userId: string;
  phoneNumber: string;
  fullName: string;
}
