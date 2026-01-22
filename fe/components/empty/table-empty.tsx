"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface iTableEmpty {
  children?: React.ReactNode;
  title: string;
  description: string;
  warning?: string;
  isFiltering?: boolean;
  btnText: string;
  className?: string;
  url: string;
  src?: string;
}
const TableEmpty = ({
  title,
  description,
  btnText,
  url,
  src = "/table-empty.png",
}: iTableEmpty) => {
  return (
    <div className="p-3 ">
      <div className="w-full bg-white py-20 flex items-center gap-y-3 flex-col border rounded-2xl">
        <img src={src} className="w-50 h-auto" alt="" srcSet="" />
        <p className="text-lg font-bold"> {title}</p>
        <p className="text-sm text-[#A1A1A1] text-center w-80">
          {" "}
          {description}
        </p>
        <Link href={url}>
          <Button variant={"blue"}>
            <Plus />
            {btnText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TableEmpty;
