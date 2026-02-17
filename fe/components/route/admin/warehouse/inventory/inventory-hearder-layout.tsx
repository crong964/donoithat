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
import { iBackupInventory } from "@/components/inventory/interface";

export default function InventoryHearderLayout() {
  const handleCSV = (data: string) => {
    const items = data.split("\n");
    let backupInventories: iBackupInventory[] = [];
    for (let i = 0; i < items.length; i++) {
      let fieldId = 0;
      const elements = items[i].split(",");
      //
      const user: iBackupInventory = {
        productVariantId: elements[fieldId++],
        productVariantName: elements[fieldId++],
        variantId: elements[fieldId++],
        variantName: elements[fieldId++],
        price: elements[fieldId++],
        importPrice: elements[fieldId++],
        image: elements[fieldId++],
        quality: elements[fieldId++],
        position: elements[fieldId++],
        weight: elements[fieldId++],
        brandId: elements[fieldId++],
        productId: elements[fieldId++],
        imageFiles: elements[fieldId++],
      };
      backupInventories.push(user);
    }

    fetch("/api/admin/inventory/backup", {
      method: "POST",
      body: JSON.stringify(backupInventories),
    }).then((v) => {
      window.location.reload();
    });
  };
  return (
    <>
      <div className="p-3.75">
        <h1 className="text-2xl font-bold mb-3">Hàng tồn kho</h1>
        <div className="flex justify-end items-center gap-x-3 mb-3">
          <ProtectAction permission="inventory.download">
            <Link href={"/api/admin/inventory/backup"} download>
              <Button type="button" variant={"default"}>
                <Download />
                Tải CSV
              </Button>
            </Link>
          </ProtectAction>
          <ProtectAction permission="inventory.upload">
            <CsvInput onChange={handleCSV} />
          </ProtectAction>
          <ProtectAction permission="inventory.add">
            <Link href={"/admin/warehouse/inventory/add"}>
              <Button variant={"blue"}>
                <Plus />
                Thêm sản phẩm
              </Button>
            </Link>
          </ProtectAction>
        </div>
      </div>
    </>
  );
}
