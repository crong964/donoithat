import { iBrand } from "@/components/brand/interface";
import { iSuplier } from "@/components/suplier/interface";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setBrand } from "@/redux/admin/product/productRedux";
import { RootState } from "@/redux/admin/reduxRoot";
import { useEffect, useState } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

function BrandSelectInput() {
  const dispatch = useDispatch();
  const brandId = useSelector((state: RootState) => state.product.brandId);
  const [data, setData] = useState<iBrand[]>([]);

  useEffect(() => {
    fetch("/api/admin/brand")
      .then((v) => {
        return v.json();
      })
      .then((v) => {
        setData(v);
      });
    return () => {};
  }, []);
  return (
    <div className="mb-4">
      <Select
        value={brandId}
        onValueChange={(v) => {
          dispatch(setBrand(v));
        }}
      >
        <SelectTrigger className="w-70">
          <SelectValue placeholder={brandId || "Chọn nhãn hàng"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Nhãn hàng</SelectLabel>
            {data.map((brand) => {
              return (
                <SelectItem value={brand.brandId}>{brand.brandName}</SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default memo(BrandSelectInput);
