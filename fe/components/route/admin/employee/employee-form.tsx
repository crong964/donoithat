"use client";
import { iEmployee, iEmployeeForm } from "@/components/employee/interface";
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
import data from "@/tempdata/data";
import isSameJson from "@/util/is-same-json";
import {
  OctagonAlert,
  IdCard,
  SquareAsterisk,
  Phone,
  UserRoundPen,
  Plus,
} from "lucide-react";
import Form from "next/form";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

const EmployeeForm = ({
  roles,
  employee,
}: {
  roles: iRole[];
  employee?: iEmployeeForm | null;
}) => {
  const [mess, addForm, pedding] = useActionState(addEmployee, null);
  const [data, setData] = useState({ ...employee });
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
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <ActionHeader title={employee ? "Chỉnh sửa" : "Thêm nhân viên"} />
      <div className="bg-a m-3 p-3 rounded-sm shadow">
        <Form action={addForm}>
          <FieldGroup>
            <Field>
              <FieldLabel className="items-center" htmlFor="account">
                Tài khoản <span className="text-red-600 text-2xl ">*</span>
              </FieldLabel>
              <FieldDescription>
                Tài khoản đăng nhập của nhân viên
              </FieldDescription>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>
                    <IdCard />
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  name="account"
                  required
                  value={data?.account}
                  onChange={handleChange}
                  placeholder={"nhập tài khoản"}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton className="rounded-full" size="icon-xs">
                    <OctagonAlert />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">
                Mật khẩu
                {employee == undefined && (
                  <span className="text-red-600 text-2xl ">*</span>
                )}
              </FieldLabel>
              <FieldDescription>
                Mật khẩu đăng nhập của nhân viên
              </FieldDescription>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>
                    <SquareAsterisk />
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  name="password"
                  required={employee == undefined}
                  onChange={handleChange}
                  value={data.password}
                  placeholder="Nhập mật khẩu"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton className="rounded-full" size="icon-xs">
                    <OctagonAlert />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="roleId">
                Chọn chực vụ <span className="text-red-600 text-2xl ">*</span>
              </FieldLabel>
              <Select
                value={data.roleId}
                onValueChange={(v) => {
                  setData({ ...data, roleId: v });
                }}
                name="roleId"
                required
              >
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
              <FieldLabel htmlFor="phoneNumber">
                Số điện thoại <span className="text-red-600 text-2xl ">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>
                    <Phone />
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  name="phoneNumber"
                  required
                  onChange={handleChange}
                  value={data.phoneNumber}
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
                Tên Nhân viên <span className="text-red-600 text-2xl ">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>
                    <UserRoundPen />
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  onChange={handleChange}
                  name="fullName"
                  placeholder="Tên nhân viên"
                  value={data.fullName}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton className="rounded-full" size="icon-xs">
                    <OctagonAlert />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <div>
              {employee == undefined ? (
                <Button disabled={isSameJson(data, {}) || pedding} variant={"blue"}>
                  {pedding ? <Spinner /> : <Plus />}
                  Thêm nhân viên
                </Button>
              ) : (
                <>
                  <Button
                    disabled={isSameJson(data, employee) || pedding}
                    variant={"blue"}
                  >
                    {pedding ? <Spinner /> : <Plus />}
                    Chỉnh sửa
                  </Button>
                </>
              )}
            </div>
          </FieldGroup>
        </Form>
      </div>
    </>
  );
};

export default EmployeeForm;
