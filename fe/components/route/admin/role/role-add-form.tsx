"use client";
import Form from "next/form";
import React, { useActionState, useState } from "react";
import RoleTable from "./role-table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { InfoIcon, UserCog, PlusCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { addRole } from "@/service/admin/role-service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const RoleAddForm = () => {
  const [permission, setPermission] = useState("");
  const [mess, addForm, pedding] = useActionState(addRole, null);
  return (
    <Form action={addForm}>
      <div className="flex flex-col items-center gap-y-3">
        <Input required enterKeyHint="go" name="permission" value={permission} type="hidden" />
        <InputGroup className="w-200">
          <InputGroupInput
            name="roleName"
            placeholder="Tên vai trò hoặc chức vụ"
          />
          <InputGroupAddon align="inline-start">
            <UserCog />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton className="rounded-full" size="icon-xs">
                  <InfoIcon />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>
                Nhập tên vai trò hoặc chức vụ ex thu kho,...
              </TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
        <RoleTable data={permission} onChange={(data) => setPermission(data)} />
      </div>
      <Button variant={"blue"} disabled={pedding}>
        {!pedding ? <PlusCircle /> : <Spinner />}
        Thêm vai trò {pedding}
      </Button>
    </Form>
  );
};

export default RoleAddForm;
