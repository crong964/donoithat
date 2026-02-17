import TableEmpty from "@/components/empty/table-empty";
import ProtectAction from "@/components/permission/protect-action";
import { getAllBrand } from "@/service/admin/brand-service";
import { Pen, Trash2 } from "lucide-react";

const BrandPage = async () => {
  const brands = await getAllBrand();
  if (brands.length == 0) {
    return (
      <TableEmpty
        btnText="Thêm nhãn hàng "
        description="Bạn chưa tạo bất kỳ nhãn hàng nào hay bắt đầu tạo nhãn hàng"
        title="Tạo nhãn hàng"
        url="/admin/brand/add"
      />
    );
  }

  return (
    <ProtectAction permission="brand.view">
      <div className="grid grid-cols-3  p-3.75 bg-white shadow-pro ">
        {brands.map((brand) => {
          return (
            <div key={brand.brandId} className="border p-2">
              {brand.brandName}
              <div className="flex gap-x-2.5 mt-2.5 **:data-[icon]:cursor-pointer">
                <ProtectAction permission="brand.update">
                  <Pen data-icon size={16} />
                </ProtectAction>
                <ProtectAction permission="brand.delete">
                  <Trash2 data-icon size={16} />
                </ProtectAction>
              </div>
            </div>
          );
        })}
      </div>
    </ProtectAction>
  );
};

export default BrandPage;
