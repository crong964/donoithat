"use client";
import { RootState } from "@/redux/admin/reduxRoot";
import React, { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
type iPros = {
  permission: string;
  children: ReactNode;
};
const ProtectAction = ({ children, permission }: iPros) => {
  const _permissions = useSelector(
    (state: RootState) => state.permission.permission,
  );
  const _role = useSelector((state: RootState) => state.permission.role);

  const allow = useMemo(() => {
    if (_role == "superadmin") {
      return true;
    }
    if (_role == "user") {
      return false;
    }
    const permissionList = _permissions.split(" ");
    for (let i = 0; i < permissionList.length; i++) {
      const element = permissionList[i];
      if (element == permission) {
        return true;
      }
    }
    return false;
  }, [permission, _permissions, _role]);

  return allow ? <>{children}</> : <></>;
};

export default ProtectAction;
