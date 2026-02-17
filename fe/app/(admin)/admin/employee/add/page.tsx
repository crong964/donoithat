import ProtectAction from "@/components/permission/protect-action";
import EmployeeForm from "@/components/route/admin/employee/employee-form";
import { getRole } from "@/service/admin/employee-service";

const EmployeeAddPage = async () => {
  const data = await getRole();
  return (
    <ProtectAction permission="employee.add">
      <EmployeeForm roles={data} />;
    </ProtectAction>
  );
};

export default EmployeeAddPage;
