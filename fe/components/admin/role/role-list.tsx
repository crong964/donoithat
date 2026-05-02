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
import checkPermission from "@/util/check-role";
import { deleteRole, updateRole } from "@/service/admin/role-service";
import { toast } from "react-toastify";
import { Pen, RotateCcw, Trash } from "lucide-react";
import isSameRole from "@/util/check-role";

const RoleList = ({ roles }: iRoleList) => {
  const [index, setIndex] = useState(0);
  const [cloneRole, setCloneRole] = useState(roles[0]);
  const [role, setRole] = useState(roles[0]);
  const [mess, updateForm, pedding] = useActionState(updateRole, null);
  const [deleteMess, deleteForm, deletePedding] = useActionState(
    deleteRole,
    null,
  );
  useEffect(() => {
    setCloneRole(roles[index]);
    setRole(roles[index]);
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
      <Input
        className="my-3 bg-white"
        placeholder="Chỉnh sửa tên vai trò"
        onChange={(v) => {
          setRole({ ...role, roleName: v.currentTarget.value });
        }}
        value={role.roleName}
      />
      <RoleTable
        onChange={(v) => {
          setRole({ ...role, permission: v });
        }}
        data={role.permission}
      />

      <div className="flex gap-x-3.5">
        <Form action={updateForm}>
          <Input hidden name="roleName" value={role.roleName} />
          <Input hidden name="permission" value={role.permission.trim()} />
          <Input hidden name="roleId" value={role.roleId} />
          <Button
            disabled={isSameRole(cloneRole, role) || pedding}
            variant={"blue"}
          >
            <Pen />
            Thay đổi
          </Button>
        </Form>
        <Button
          onClick={() => {
            setRole(cloneRole);
          }}
          disabled={isSameRole(cloneRole, role)}
          variant={"blue"}
        >
          <RotateCcw />
          Đặt lại
        </Button>
        <Form action={updateForm}>
          <Input hidden name="roleId" value={roles[index].roleId} />
          <Button variant={"blue"} disabled={deletePedding}>
            <Trash />
            Xóa
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RoleList;
