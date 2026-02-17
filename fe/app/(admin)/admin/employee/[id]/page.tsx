import ProtectAction from "@/components/permission/protect-action";
import EmployeeForm from "@/components/route/admin/employee/employee-form";
import { getEmployeesById, getRole } from "@/service/admin/employee-service";
import React from "react";

const EmpoyeeIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const data = await Promise.all([getRole(), getEmployeesById(id)]);
  const roles = data[0];
  const employee = data[1];

  return (
    <ProtectAction permission="employee.update">
      <EmployeeForm roles={roles} employee={employee} />;
    </ProtectAction>
  );
};

export default EmpoyeeIdPage;
