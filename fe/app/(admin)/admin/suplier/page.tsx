import SuplierHeaderLayout from "@/components/route/admin/suplier/suplier-header-layout";
import CsvInput from "@/components/form/csv-input";
import { iSuplier } from "@/components/suplier/interface";
import { Button } from "@/components/ui/button";
import { getSupliers } from "@/service/admin/suplier-service";
import { Eye, Plus } from "lucide-react";
import Link from "next/link";

export default async function SuplierIndexPage() {
  const data = await getSupliers();

  return (
    <>
      <SuplierHeaderLayout />
      <div className="p-4 overflow-x-auto w-full">
        <table className="table-auto w-max lg:w-full text-left">
          <tr className="text-sm">
            <th className="w-40">Mã</th>
            <th className="w-40">Tên</th>
            <th className="w-1/5">Địa chỉ</th>
            <th className="w-1/5">Số điện thoại</th>
            <th className="w-1/5">Email</th>
            <th>Thao tác</th>
          </tr>
          {data.map((v) => {
            return (
              <tr key={v.id}>
                <td className="py-3 pr-3">{v.suplierId}</td>
                <td className="py-3 pr-3">{v.suplierName}</td>
                <td className="py-3 pr-3">{v.suplierAddress}</td>
                <td className="py-3 pr-3">{v.suplierPhoneNumber}</td>
                <td className="py-3 pr-3">{v.suplierEmail}</td>
                <td className="py-3 pr-3">
                  <Link href={`/admin/suplier/edit?suplierId=${v.id}`}>
                    <Button variant={"blue"}>
                      <Eye></Eye>
                    </Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}
