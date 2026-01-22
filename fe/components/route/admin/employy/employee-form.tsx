"use client";
import { iRole } from "@/components/role/interface";
import ActionHeader from "@/components/ui-custom/action-header";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { addEmployee } from "@/service/admin/employee-service";
import {
  OctagonAlert,
  IdCard,
  SquareAsterisk,
  Phone,
  UserRoundPen,
  Plus,
} from "lucide-react";
import Form from "next/form";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const EmployeeForm = ({ roles }: { roles: iRole[] }) => {
  const [mess, addForm, pedding] = useActionState(addEmployee, null);
  useEffect(() => {
    if (!mess) {
      return;
    }
    if (mess.error) {
      toast.error(mess.message);
      return;
    }
    if (!mess.error) {
      toast.success("Thêm thành công");
      return;
    }
    return () => {};
  }, [mess]);
  return (
    <>
      <ActionHeader title="Thêm nhân viên" />
      <div className="bg-a m-3 p-3 rounded-sm shadow">
        <Form action={addForm}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="account">Tài khoản</FieldLabel>
              <FieldDescription>
                Tài khoản đăng nhập của nhân viên
              </FieldDescription>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>
                    <IdCard />
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput name="account" placeholder="nhập tài khoản"/>
                <InputGroupAddon align="inline-end">
                  <InputGroupButton className="rounded-full" size="icon-xs">
                    <OctagonAlert />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
              <FieldDescription>
                Mật khẩu đăng nhập của nhân viên
              </FieldDescription>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>
                    <SquareAsterisk />
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput name="password" placeholder="Nhập mật khẩu" />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton className="rounded-full" size="icon-xs">
                    <OctagonAlert />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="roleId">Chọn chực vụ</FieldLabel>
              <Select name="roleId">
                <SelectTrigger className="w-70">
                  <SelectValue placeholder={"Chọn nhãn hàng"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Chức vụ</SelectLabel>
                    {roles.map((role) => {
                      return (
                        <SelectItem value={role.roleId}>
                          {role.roleName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="phoneNumber">Số điện thoại</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>
                    <Phone />
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  name="phoneNumber"
                  placeholder="Nhập số điện thoại"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton className="rounded-full" size="icon-xs">
                    <OctagonAlert />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="fullName">
                Tên Nhân viên
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>
                    <UserRoundPen />
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput name="fullName" placeholder="Tên nhân viên" />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton className="rounded-full" size="icon-xs">
                    <OctagonAlert />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <div>
              <Button disabled={pedding} variant={"blue"}>
                {pedding ? <Spinner /> : <Plus />}
                Thêm nhân viên
              </Button>
            </div>
          </FieldGroup>
        </Form>
      </div>
    </>
  );
};

export default EmployeeForm;
