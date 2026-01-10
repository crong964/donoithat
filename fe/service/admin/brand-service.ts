import { iBrand } from "@/components/brand/interface";
import { api } from "@/util/fetch";

export const getAllBrand = async (): Promise<iBrand[]> => {
  let data: iBrand[] = [];
  try {
    const res = await api.get("admin/brand");
    data = res.data;
  } catch (e) {}

  return data;
};
export const getAllBrandToBuy = async (): Promise<iBrand[]> => {
  let data: iBrand[] = [];
  try {
    const res = await api.get("admin/brand/tobuy");
    data = res.data;
  } catch (e) {}

  return data;
};
