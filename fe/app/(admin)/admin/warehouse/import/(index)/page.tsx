import TableEmpty from "@/components/empty/table-empty";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllImportAdmin } from "@/service/admin/import-service";
import dateFormat from "@/util/date";
import priceFormat from "@/util/price-format";
import { Plus, View } from "lucide-react";
import Link from "next/link";
import React from "react";

const ImportPage = async () => {
  const data = await getAllImportAdmin();
  if (data.length == 0) {
    return (
      <TableEmpty
        btnText="Thêm hóa đơn "
        description="Bạn chưa có bất kỳ hóa đơn nhập nào hay bắt đầu tạo hóa đơn nhập"
        title="Tạo hóa đơn nhập"
        url="/admin/warehouse/import/add"
      />
    );
  }
  return (
    <>
      <div className="p-3.75">
        <h1 className="text-2xl font-bold mb-3">Danh sách phiếu nhập</h1>
        <Link href={"/admin/warehouse/import/add"}>
          <Button variant={"blue"}>
            <Plus />
            Tạo phiếu nhập
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto mt-4 border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
          <thead>
            <tr>
              <th className="px-2">
                <Checkbox id="terms" className="border-black" />
              </th>
              <th className="w-50">Số phiếu</th>
              <th className="w-50">Ngày nhập</th>
              <th className="w-50">Nhà cung cấp</th>
              <th className="w-50">Mã hóa đơn mua</th>
              <th className="w-50">Tiền Hàng</th>
              <th className="w-20"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((v) => {
              return (
                <tr className="**:data-[row]:px-2 **:data-[row]:text-center">
                  <td data-row className="">
                    <Checkbox id={v.importId} className="border-black" />
                  </td>
                  <td data-row>{v.importId}</td>
                  <td data-row>{dateFormat(v.receivedDate)}</td>
                  <td data-row>{v.suplierName}</td>
                  <td data-row>{priceFormat(v.purchaseInvoiceId + "")}</td>
                  <td data-row>{priceFormat(v.totalMoney + "")}</td>
                  <td data-row>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={
                          "/admin/warehouse/import/detail?importId=" +
                          v.importId
                        }
                      >
                        <View className="text-green-500 " />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ImportPage;
