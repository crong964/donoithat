"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

import { iRole } from "@/components/role/interface";
import { useState } from "react";

export default function CategoryCombobox({ roles }: { roles: iRole[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full lg:w-150 justify-between"
        >
          {value
            ? roles.find((role) => role.roleId === value)?.roleName
            : "Chọn vai trò"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full lg:w-150 p-0">
        <Command className="w-full lg:w-150">
          <CommandInput
            placeholder="Tìm kiếm thể loại..."
            className="h-9 w-70 lg:w-150"
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <Link
                  key={role.roleId}
                  href={`/admin/employee?roleId=${
                    role.roleId == value ? "all" : role.roleId
                  }`}
                >
                  <CommandItem
                    value={role.roleId}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {role.roleName}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === role.roleId ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                </Link>
              ))}
              <Link href={`/admin/employee`}>
                <CommandItem
                  value={""}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  Tất cả
                  <Check
                    className={cn(
                      "ml-auto",
                      value === "" ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              </Link>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
