"use client";
import { iRoleList } from "@/components/role/interface";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useActionState, useEffect, useState } from "react";
import RoleTable from "./role-table";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import checkPermission from "@/util/check-permission";
import { updateRole } from "@/service/admin/role-service";
import { toast } from "react-toastify";
import { Pen, RotateCcw } from "lucide-react";

const RoleList = ({ roles }: iRoleList) => {
  const [index, setIndex] = useState(0);
  const [clonePermisson, setClonePermisson] = useState(roles[0].permission);
  const [permisson, setPermisson] = useState(roles[0].permission);
  const [mess, updateForm, pedding] = useActionState(updateRole, null);

  useEffect(() => {
    setClonePermisson(roles[index].permission);
    setPermisson(roles[index].permission);
    return () => {};
  }, [index, roles]);

  useEffect(() => {
    if (!mess) {
      return;
    }
    if (mess.error) {
      toast.error("Thất bại");
      return;
    }
    if (!mess.error) {
      toast.success("Thành công");
      return;
    }
  }, [mess]);
  return (
    <div className="px-3.75">
      <Select
        value={index + ""}
        onValueChange={(indexs) => {
          setIndex(parseInt(indexs));
        }}
      >
        <SelectTrigger className="w-[180px] bg-blue-400 text-white">
          <SelectValue placeholder="chọn vai trò" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Vai trò</SelectLabel>
            {roles.map((role, i) => {
              return <SelectItem value={i + ""}>{role.roleName}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <RoleTable
        onChange={(v) => {
          setPermisson(v);
        }}
        data={permisson}
      />
      <div className="flex gap-x-3.5">
        <Form action={updateForm}>
          <Input hidden name="roleName" value={roles[index].roleName} />
          <Input hidden name="permission" value={permisson.trim()} />
          <Input hidden name="roleId" value={roles[index].roleId} />
          <Button
            disabled={checkPermission(clonePermisson, permisson) || pedding}
            variant={"blue"}
          >
            <Pen />
            Thay đổi
          </Button>
        </Form>
        <Button
          onClick={() => {
            setPermisson(clonePermisson);
          }}
          disabled={checkPermission(clonePermisson, permisson)}
          variant={"blue"}
        >
          <RotateCcw />
          Đặt lại
        </Button>
      </div>
    </div>
  );
};

export default RoleList;
