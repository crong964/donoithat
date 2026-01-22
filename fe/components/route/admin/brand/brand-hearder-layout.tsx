"use client";
import SubmitButton from "@/components/ui-custom/submit-buttom";
import CsvInput from "@/components/form/csv-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { iUserInAdminBackup } from "@/components/user/interface";
import { Download, Plus } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import ProtectAction from "@/components/permission/protect-action";
import { iBrand } from "@/components/brand/interface";

export default function BrandHearderLayout() {
  const handleCSV = (data: string) => {
    const items = data.split("\n");
    let brands: iBrand[] = [];
    for (let i = 0; i < items.length; i++) {
      let fieldId = 0;
      const elements = items[i].split(",");
      //
      const user: iBrand = {
        brandId: elements[fieldId++],
        brandName: elements[fieldId++],
      };
      brands.push(user);
    }

    fetch("/api/admin/brand/backup", {
      method: "POST",
      body: JSON.stringify(brands),
    }).then((v) => {
      window.location.reload();
    });
  };
  return (
    <>
      <div className="p-3 ">
        <h1 className="text-2xl font-bold mb-3">Danh sách nhãn hàng</h1>
        <div className="flex justify-end items-center gap-x-3 mb-3">
          <ProtectAction permission="brand.download">
            <Link href={"/api/admin/brand/backup"} download>
              <Button type="button" variant={"default"}>
                <Download />
                Tải CSV
              </Button>
            </Link>
          </ProtectAction>
          <ProtectAction permission="brand.upload">
            <CsvInput onChange={handleCSV} />
          </ProtectAction>
        </div>
      </div>
    </>
  );
}
