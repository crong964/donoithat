import TableEmpty from "@/components/empty/table-empty";
import ProtectAction from "@/components/permission/protect-action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getEmployees } from "@/service/admin/employee-service";
import { Eye, Plus, Trash } from "lucide-react";
import Link from "next/link";

export default async function Employee() {
  const employees = await getEmployees();
  if (employees.length == 0) {
    return (
      <TableEmpty
        btnText="Thêm nhân viên"
        description="Bạn chưa tạo bất kỳ nhân viên nào, hãy bắt đầu tạo nhân viên mà bạn mong muốn"
        title="Không có nhân viên"
        url="/admin/employee/add"
        src="/table-empty.png"
      />
    );
  }

  return (
    <ProtectAction permission="employee.view">
      <div className="p-3">
        <h1 className="text-2xl font-bold mb-3">Danh sách khác hàng</h1>
        <ProtectAction permission="employee.add">
          <div className="flex justify-end mb-3">
            <Link href={"/admin/employee/add"}>
              <Button type="button" variant={"blue"}>
                <Plus />
                Thêm
              </Button>
            </Link>
          </div>
        </ProtectAction>
        <div className="overflow-x-auto min-h-60 bg-white  rounded-sm border">
          <table className="table-fixed w-full ">
            <tr className="h-20">
              <th className="px-2 w-10"></th>
              <th className="p-2 w-100">Tài khoản</th>
              <th className="p-2 w-50">Họ và tên</th>
              <th className="p-2 w-50">Số điện thoại</th>
              <th className="p-2 w-50">Vài trò</th>
              <th className="w-30"></th>
            </tr>
            {employees.map((employee) => {
              return (
                <tr className="max-h-20 hover:bg-a">
                  <td className="p-2">
                    <Checkbox className="border border-black" />
                  </td>
                  <td className="text-center">{employee.account}</td>
                  <td className="text-center">{employee.fullName}</td>
                  <td className="text-center">{employee.phoneNumber}</td>
                  <td className="text-center">{employee.roleName}</td>
                  <td className="p-4">
                    <ProtectAction permission="employee.update">
                      <Link href={`/admin/employee/${employee.userId}`}>
                        <Button variant={"link"}>
                          <Eye />
                        </Button>
                      </Link>
                    </ProtectAction>
                    <ProtectAction permission="employee.delete">
                      <Link href={`/admin/employee/${employee.userId}`}>
                        <Button variant={"link"}>
                          <Trash />
                        </Button>
                      </Link>
                    </ProtectAction>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </ProtectAction>
  );
}
