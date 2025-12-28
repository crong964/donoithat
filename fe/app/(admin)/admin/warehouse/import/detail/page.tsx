import BackButton from "@/components/ui-custom/back-button";
import { Button } from "@/components/ui/button";
import { getImportAdminById } from "@/service/admin/import-service";
import dateFormat from "@/util/date";
import priceFormat from "@/util/price-format";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
interface iImportDetail {
  userId: string;
  fullName: string;
  importId: string;
  purchaseInvoiceId: string;
  totalMoney: number;
  receivedDate: string;
  suplierId: string;
  suplierName: string;
}
interface iProductVariantDetail {
  productVariantId: string;
  productVariantName: string;
  importPrice: number;
  image: string;
  quality: string;
}
const ImportDetailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ importId: string | undefined }>;
}) => {
  const importId = (await searchParams).importId;
  if (importId == undefined) {
    redirect("/admin/warehouse/import");
  }
  const data = await getImportAdminById(importId);
  return (
    <div className="pt-3">
      <div className="px-3">
        <BackButton />
        <div className="text-2xl font-bold mt-3">Chi tiết phiếu nhập</div>
      </div>
      <div className="px-3 space-y-9">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="px-1">Ngày nhập hàng</div>
            <div className="font-bold">
              {dateFormat(data?.import.receivedDate || "")}
            </div>
          </div>
          <div className="flex gap-3">
            <div>Nhà cung cấp</div>
            <div className="font-bold">{data?.import.suplierName}</div>
          </div>
          <div className="flex gap-3">
            <div>Mã phiếu mua hàng</div>
            <div className="font-bold">{data?.import.purchaseInvoiceId}</div>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-80">Tên sản phẩm</th>
              <th className="w-50">Giá nhập</th>
              <th className="w-50">Số lượng</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {data?.ls.map((importProduct) => {
              return (
                <tr key={importProduct.productVariantId}>
                  <td className=" p-2">
                    <div className="flex gap-3 items-start">
                      <img className="w-13 h-auto" src={importProduct.image} />
                      <p className="text-sm">
                        {importProduct.productVariantName}
                      </p>
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    <p>{priceFormat(importProduct.importPrice + "")}</p>
                  </td>
                  <td className="p-2 text-center">
                    <p>{priceFormat(importProduct.quality + "")}</p>
                  </td>
                  <td className="p-2 text-center">
                    <p>
                      {priceFormat(
                        importProduct.quality * importProduct.importPrice + ""
                      )}
                    </p>
                  </td>
                </tr>
              );
            })}
            <tr className="bg-a">
              <td colSpan={3} className="py-4">
                <p className="font-bold text-2xl text-center">Tổng tiền</p>
              </td>
              <td>
                <p className="font-bold text-2xl text-center">
                  {priceFormat(data?.import.totalMoney + "")}
                </p>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImportDetailPage;
