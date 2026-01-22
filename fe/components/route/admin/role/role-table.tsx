"use client";
import { _permissions } from "@/contant/permission";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import Form from "next/form";
import React, { useMemo, useState } from "react";
interface iPermissionAddForm {
  data?: string;
  onChange: (data: string) => void;
}
const RoleTable = ({ data = "", onChange }: iPermissionAddForm) => {
  const selectPermission = (permission: string) => {
    if (permission.length == 0) {
      return;
    }
    let permissions = data.split(" ");
    if (permissions.indexOf(permission) >= 0) {
      onChange(data.replace(permission, ""));
      return;
    }

    onChange(`${data} ${permission}`);
  };
  const perset = useMemo(() => {
    let perset = new Set<string>();
    let permissions = data.split(" ");
    permissions.forEach((v) => {
      perset.add(v);
    });

    return perset;
  }, [data]);
  const checked = (permissions: string[]) => {
    for (let i = 0; i < permissions.length; i++) {
      const element = permissions[i];
      if (!perset.has(element)) {
        return false;
      }
    }

    return true;
  };
  return (
    <div className="overflow-x-auto bg-white p-2 shadow-xs my-3">
      <table>
        <tr>
          <th className="p-2 w-100"></th>
          <th className="p-2 w-40 text-left uppercase">Xem</th>
          <th className="p-2 w-40 text-left uppercase">Tạo</th>
          <th className="p-2 w-40 text-left uppercase">Cập nhập</th>
          <th className="p-2 w-40 text-left uppercase">Xóa</th>
          <th className="p-2 w-40 text-left uppercase">Tất cả</th>
        </tr>
        <>
          {_permissions.map((permission) => {
            return (
              <tr key={permission.name} className="hover:bg-a">
                <td className="p-2">{permission.name}</td>
                {permission.permission.map((v) => {
                  return (
                    <td className="p-2" key={v}>
                      {v != "" && (
                        <Switch
                          checked={perset.has(v)}
                          onClick={() => selectPermission(v)}
                          className="cursor-pointer"
                          id={v}
                        />
                      )}
                    </td>
                  );
                })}
                <td>
                  <Switch
                    checked={checked(permission.permission)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        let tempPer = permission.permission
                          .filter((v) => {
                            return !perset.has(v);
                          })
                          .reduce((preValue, cur) => {
                            return `${preValue} ${cur}`;
                          }, "");

                        onChange(`${data} ${tempPer}`);
                        return;
                      }

                      permission.permission.forEach((v) => {
                        perset.delete(v);
                      });
                      let newPer = "";
                      perset.forEach((v) => {
                        newPer += `${v} `;
                      });
                      onChange(newPer.trim());
                    }}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            );
          })}
        </>
      </table>
    </div>
  );
};

export default RoleTable;
