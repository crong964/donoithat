//import { iSuplier } from "@/components/suplier/interface";
//import {
//  Select,
//  SelectContent,
//  SelectGroup,
//  SelectItem,
//  SelectLabel,
//  SelectTrigger,
//  SelectValue,
//} from "@/components/ui/select";
//import { RootState } from "@/redux/admin/reduxRoot";
//import vendors from "@/tempdata/vendors";
//import { useEffect, useState } from "react";
//import { memo } from "react";
//import { useDispatch, useSelector } from "react-redux";

//function Vendor() {
//  const dispatch = useDispatch();
 
//  const [data, setData] = useState<iSuplier[]>([]);

//  useEffect(() => {
//    fetch("/api/admin/suplier")
//      .then((v) => {
//        return v.json();
//      })
//      .then((v) => {
//        setData(v);
//      });
//    return () => {};
//  }, []);
//  return (
//    <div className="mb-4">
//      <Select
//        onValueChange={(v) => {
//          dispatch(setVendor(v));
//        }}
//      >
//        <SelectTrigger className="w-70">
//          <SelectValue placeholder={vendor || "Chọn nhãn hàng"} />
//        </SelectTrigger>
//        <SelectContent>
//          <SelectGroup>
//            <SelectLabel>Nhãn hàng</SelectLabel>
//            {data.map((vendorItem) => {
//              return (
//                <SelectItem value={vendorItem.suplierId}>
//                  {vendorItem.suplierName}
//                </SelectItem>
//              );
//            })}
//          </SelectGroup>
//        </SelectContent>
//      </Select>
//    </div>
//  );
//}

//export default memo(Vendor);
