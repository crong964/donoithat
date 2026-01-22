import TableEmpty from "@/components/empty/table-empty";
import ProtectAction from "@/components/permission/protect-action";
import RoleList from "@/components/route/admin/role/role-list";
import { Button } from "@/components/ui/button";
import { getAllRole } from "@/service/admin/role-service";
import { Plus } from "lucide-react";
import Link from "next/link";

import React from "react";

const PermissionPage = async () => {
  const roles = await getAllRole();

  if (roles.length == 0) {
    return (
      <div className="p-2 ">
        <div className="overflow-x-auto">
          <TableEmpty
            btnText="Thêm quyền"
            description="Thêm quyền mới"
            title="Không có kết quả"
            src="/table-empty.png"
            url="/admin/role/add"
          />
        </div>
      </div>
    );
  }
  return (
    <ProtectAction permission="role.view">
      <div className="p-3.75">
        <h1 className="text-2xl font-bold mb-3">Danh sách các quyền</h1>
        <ProtectAction permission="role.add">
          <div className="flex justify-end">
            <Link href={"/admin/role/add"}>
              <Button variant={"blue"}>
                <Plus />
                Thêm quyền
              </Button>
            </Link>
          </div>
        </ProtectAction>
      </div>
      <div className="">
        <RoleList roles={roles} />
      </div>
    </ProtectAction>
  );
};

export default PermissionPage;
