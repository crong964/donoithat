"use client";
import CsvInput from "@/components/form/csv-input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { iCategoryBackup } from "./interface";
import ProtectAction from "@/components/permission/protect-action";

export default function CategoryHeaderLayout() {
  const handleBackup = (s: string) => {
    let data = s.split("\n");
    let dataTmp: iCategoryBackup[] = [];
    data.forEach((v) => {
      let vs = v.split(",");
      if (vs.length < 3) {
        return;
      }
      let i = 0;
      dataTmp.push({
        categoryId: vs[i++],
        categoryImage: vs[i++],
        slug: vs[i++],
        index: vs[i++],
        nameCategory: vs[i++],
        status: vs[i++] == "true",
        categoryParentId: vs[i++],
      });
    });

    fetch("/api/admin/category/backup", {
      method: "POST",
      body: JSON.stringify(dataTmp),
    })
      .then((v) => {
        location.reload();
      })
      .catch((v) => {
        console.log(v);
      });
  };
  return (
    <>
      <header>
        <h1 className="font-bold text-2xl">Danh sách loại sản phẩm</h1>
        <div className="space-x-2 my-10">
          <ProtectAction permission="categery.download">
            <Link href={"/api/admin/category/backup"} download>
              <Button type="button" variant={"blue"}>
                <Download />
                Tải CSV
              </Button>
            </Link>
          </ProtectAction>
          <ProtectAction permission="categery.upload">
            <CsvInput onChange={handleBackup} />
          </ProtectAction>
        </div>
      </header>
    </>
  );
}
