import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const ImportLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="p-3.75">
        <h1 className="text-2xl font-bold mb-3">Hàng tồn kho</h1>
        <Link href={"/admin/warehouse/import/add"}>
          <Button variant={"blue"}>
            <Plus />
            Tạo phiếu nhập
          </Button>
        </Link>
      </div>

      {children}
    </>
  );
};

export default ImportLayout;
