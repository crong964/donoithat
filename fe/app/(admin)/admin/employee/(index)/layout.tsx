import EmployeeHearderLayout from "@/components/admin/employee/employee-hearder-layout";
import RoleCombobox from "@/components/admin/employee/role-combobox";
import { getRole } from "@/service/admin/employee-service";

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
