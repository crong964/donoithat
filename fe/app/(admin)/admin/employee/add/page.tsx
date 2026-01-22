import ProtectAction from "@/components/permission/protect-action";
import EmployeeForm from "@/components/route/admin/employy/employee-form";
import { getRole } from "@/service/admin/employee-service";

const EmployeeAddPage = async () => {
  const data = await getRole();
  return (
    <ProtectAction permission="employee.update">
      <EmployeeForm roles={data}></EmployeeForm>;
    </ProtectAction>
  );
};

export default EmployeeAddPage;
