import EmployeeHearderLayout from "@/components/route/admin/employee/employee-hearder-layout";
import RoleCombobox from "@/components/route/admin/employee/role-combobox";
import { getRole } from "@/service/admin/employee-service";

import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const roles = await getRole();
  return (
    <>
      <div className="p-3.75">
        <EmployeeHearderLayout />
        <RoleCombobox roles={roles} />
      </div>

      {children}
    </>
  );
};

export default Layout;
