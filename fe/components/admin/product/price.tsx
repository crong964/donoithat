import {
  setMainPriceProduct,
  setMinMaxPrice,
} from "@/redux/admin/product/productRedux";
import { RootState } from "@/redux/admin/reduxRoot";
import PriceFormat from "@/util/price-format";
import { Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Price() {
  const minPrice = useSelector((state: RootState) => state.product.minPrice);
  const maxPrice = useSelector((state: RootState) => state.product.maxPrice);
  const mainPrice = useSelector((state: RootState) => state.product.mainPrice);
  const productVariants = useSelector(
    (state: RootState) => state.product.productVariants
  );

  useEffect(() => {
    let min = 0;
    let max = 0;
    let f = productVariants[0];
    if (f) {
      min = f.price;
      max = f.price;
    }
    for (let i = 0; i < productVariants.length; i++) {
      const element = productVariants[i];
      if (element.price > max) {
        max = element.price;
      }
      if (element.price < min) {
        min = element.price;
      }
    }
    dispatch(setMinMaxPrice({ maxPrice: max, minPrice: min }));
    return () => {};
  }, [productVariants]);
  const dispatch = useDispatch();
  return (
    <>
      <div className="mb-4">
        <div className="flex items-center gap-x-3">
          <div className="basis-1/12">
            <div className="flex space-x-1">
              <span>Giá</span>
              <p className="text-red-600">*</p>
            </div>
          </div>
          <div className="flex-1">
            <Input
              placeholder="Giá"
              value={PriceFormat(mainPrice + "")}
              required
              onChange={(v) => {
                let n = parseInt(v.currentTarget.value.replaceAll(",", ""));
                if (v.currentTarget.value == "") {
                  dispatch(setMainPriceProduct(0));
                }
                if (isNaN(n)) {
                  return;
                }
                dispatch(setMainPriceProduct(n));
              }}
            />
          </div>
          <div className="basis-1/12">
            <span>Tồn kho</span>
          </div>
          <div className="flex-1">
            <p>
              {productVariants.reduce((value, item) => {
                let n = parseInt(item.quality);
                if (isNaN(n)) {
                  return value;
                }
                return value + n;
              }, 0)}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-x-3">
          <div className="basis-2/12">
            <div className="flex space-x-1">
              <span>Giá thấp nhất</span>
            </div>
          </div>
          <div className="flex-1">
            <p>{PriceFormat(minPrice + "")}</p>
          </div>
          <div className="basis-2/12">
            <span>Giá cao nhất</span>
          </div>
          <div className="flex-1">
            <p>{PriceFormat(maxPrice + "")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
