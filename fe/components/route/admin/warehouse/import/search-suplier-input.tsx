"use client";
import { iSuplierSearch } from "@/components/suplier/interface";
import PaginationSingle from "@/components/ui-custom/pagination-single";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
interface iSearchSuplierPros {
  select: (data: { id: string; name: string }) => void;
  id: string;
  name: string;
}
const SearchSuplierInput = ({ select, id, name }: iSearchSuplierPros) => {
  const [suplierSearchs, setSuplierSearchs] = useState<iSuplierSearch[]>([]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<{
    page: number;
    name: string;
  }>({
    name: "",
    page: 1,
  });
  useEffect(() => {
    const f = setTimeout(async () => {
      try {
        let json = await fetch(
          `/api/admin/suplier/search?name=${query.name || ""}&page=${
            query.page
          }`
        );
        const data = await json.json();
        setSuplierSearchs(data);
      } catch (error) {}
    }, 300);
    return () => {
      clearTimeout(f);
    };
  }, [query]);
  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} className="flex-1 text-left h-10">
            <p className="w-full text-left">
              {name || "Tìm kiếm nhà cung cấp"}
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" gap-y-3 flex flex-col">
          <Input
            placeholder="Tìm kiếm nhà cung cấp"
            autoComplete="off"
            onChange={(v) => {
              const text = v.currentTarget.value;
              setQuery({ name: text, page: 1 });
            }}
          />
          {suplierSearchs.length <= 0 && (
            <div className="flex justify-center items-center">
              Chưa có nhà cung cấp
            </div>
          )}
          <ul className="h-80 overflow-y-auto space-y-2">
            {suplierSearchs.map((suplier) => {
              return (
                <li
                  key={suplier.id}
                  onClick={() => {
                    select({ id: suplier.id, name: suplier.suplierName });
                    setOpen(false);
                  }}
                  data-select={suplier.id == id}
                  className="data-[select=true]:bg-blue-300 data-[select=false]:bg-white cursor-pointer hover:bg-a p-1 flex flex-col gap-2"
                >
                  <p className="text-sm font-bold">{suplier.suplierName}</p>
                  <p className="text-sm">{suplier.suplierPhoneNumber}</p>
                </li>
              );
            })}
          </ul>
          {suplierSearchs.length > 0 && (
            <PaginationSingle
              curPage={query.page}
              disableNext={suplierSearchs.length < 10}
              onNext={(next) => {
                setQuery({
                  name: query.name,
                  page: next,
                });
              }}
              onPre={(pre) => {
                setQuery({
                  name: query.name,
                  page: pre,
                });
              }}
            />
          )}
        </PopoverContent>
      </Popover>
      <Button type="button" variant={"blue"}>
        <Plus />
      </Button>
    </div>
  );
};

export default SearchSuplierInput;
