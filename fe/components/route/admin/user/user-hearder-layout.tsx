"use client";
import SubmitButton from "@/components/ui-custom/submit-buttom";
import CsvInput from "@/components/form/csv-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { iUserInAdminBackup } from "@/components/user/interface";
import { Download, Plus } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import ProtectAction from "@/components/permission/protect-action";

export default function UserHearderLayout() {
  const handleCSV = (data: string) => {
    const items = data.split("\n");
    let users: iUserInAdminBackup[] = [];
    for (let i = 0; i < items.length; i++) {
      let fieldId = 0;
      const elements = items[i].split(",");
      //U8f94d7532a374795b92ffbe8b6dfa6bb,hoangthiminh78@gmail.com,Pass@1043,Hoàng Thị Minh,0913422432,user
      const user: iUserInAdminBackup = {
        userId: elements[fieldId++],
        account: elements[fieldId++],
        password: elements[fieldId++],
        fullName: elements[fieldId++],
        phoneNumber: elements[fieldId++],
        role: elements[fieldId++],
      };
      users.push(user);
    }

    fetch("/api/admin/user/backup", {
      method: "POST",
      body: JSON.stringify(users),
    }).then((v) => {
      window.location.reload();
    });
  };
  return (
    <div className="p-3 ">
      <h1 className="text-2xl font-bold mb-3">Danh sách khác hàng</h1>
      <div className="flex justify-end items-center gap-x-3 mb-3">
        <ProtectAction permission="user.download">
          <Link href={"/api/admin/user/backup"} download>
            <Button type="button" variant={"default"}>
              <Download />
              Tải CSV
            </Button>
          </Link>
        </ProtectAction>
        <ProtectAction permission="user.upload">
          <CsvInput onChange={handleCSV} />
        </ProtectAction>
      </div>
      <Form action={"/admin/user"}>
        <div className="flex gap-4">
          <Input
            type="text"
            name="query"
            className="flex-1 bg-white"
            autoComplete="off"
            placeholder="Tìm kiếm khách hàng...."
          />
          <Input type="hidden" name="page" value={1} />
          <div className="w-[180px]">
            <SubmitButton
              loading={
                <Button type="button" variant={"blue"}>
                  Tìm kiếm...
                </Button>
              }
            >
              <Button variant={"blue"}>Tìm kiếm</Button>
            </SubmitButton>
          </div>
        </div>
      </Form>
    </div>
  );
}
