"use client";
import CsvInput from "@/components/form/csv-input";
import { Button } from "@/components/ui/button";

import { Download, Plus } from "lucide-react";
import Link from "next/link";
import ProtectAction from "@/components/permission/protect-action";
import { iEmployeeBackup } from "@/components/employee/interface";

export default function EmployeeHearderLayout() {
  const handleCSV = (data: string) => {
    const items = data.split("\n");
    let employees: iEmployeeBackup[] = [];
    for (let i = 0; i < items.length; i++) {
      let fieldId = 0;
      const elements = items[i].split(",");

      const user: iEmployeeBackup = {
        account: elements[fieldId++],
        password: elements[fieldId++],
        roleId: elements[fieldId++],
        userId: elements[fieldId++],
        phoneNumber: elements[fieldId++],
        fullName: elements[fieldId++],
      };
      employees.push(user);
    }

    fetch("/api/admin/employee/backup", {
      method: "POST",
      body: JSON.stringify(employees),
    }).then((v) => {
      window.location.reload();
    });
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-3">Danh sách nhân viên</h1>
      <div className="flex justify-end items-center gap-x-3 mb-3">
        <ProtectAction permission="employee.download">
          <Link href={"/api/admin/employee/backup"} download>
            <Button type="button" variant={"blue"}>
              <Download />
              Tải CSV
            </Button>
          </Link>
        </ProtectAction>
        <ProtectAction permission="employee.upload">
          <CsvInput onChange={handleCSV} />
        </ProtectAction>
        <ProtectAction permission="employee.add">
          <Link href={"/admin/employee/add"}>
            <Button type="button" variant={"blue"}>
              <Plus />
              Thêm
            </Button>
          </Link>
        </ProtectAction>
      </div>
    </>
  );
}
