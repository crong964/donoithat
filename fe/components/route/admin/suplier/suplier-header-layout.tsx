"use client";
import CsvInput from "@/components/form/csv-input";
import { iSuplier } from "@/components/suplier/interface";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import Link from "next/link";

export default function SuplierHeaderLayout() {
  const handleBackup = (s: string) => {
    let data = s.split("\n");
    let dataTmp: iSuplier[] = [];
    data.forEach((v) => {
      let vs = v.split(",");
      if (vs.length < 3) {
        return;
      }
      let i = 0;
      dataTmp.push({
        id: vs[i++],
        suplierId: vs[i++],
        suplierName: vs[i++],
        suplierPhoneNumber: vs[i++],
        suplierEmail: vs[i++],
        suplierAddress: vs[i++],
      });
    });
    fetch("/api/admin/suplier/backup", {
      method: "POST",
      body: JSON.stringify(dataTmp),
    }).then((v) => {
      window.location.reload();
    });
  };
  return (
    <div className="p-3 ">
      <p className="text-2xl font-bold mb-3"> Danh sách nhà cung cấp</p>
      <div className="space-x-2">
        <Link href={"/api/admin/suplier/backup"} download>
          <Button type="button" variant={"default"}>
            <Download />
            Tải CSV
          </Button>
        </Link>
        <CsvInput onChange={handleBackup} />
        <Link href={"/admin/suplier/add"}>
          <Button type="button" variant={"blue"}>
            <Plus />
            Thêm
          </Button>
        </Link>
      </div>
    </div>
  );
}
