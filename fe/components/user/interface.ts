export interface iUser {
  account: string;
  address: string;
  fullName: string;
  password: string;
  phoneNumber: string;
}

export interface iUserInAdmin {
  userId: string;
  account: string;
  fullName: string;
  countOrder: number;
  phoneNumber: string;
}
export interface iUserInAdminBackup {
  userId: string;
  account: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  role: string;
}
export interface iGetUserAdmin {
  page: number;
  query: string;
}
export interface iLogin {
  account: string;
  password: string;
}
