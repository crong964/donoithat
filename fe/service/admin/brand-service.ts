import { iBrand } from "@/components/brand/interface";
import { api } from "@/util/fetch";

export const getBrand = async (): Promise<iBrand[]> => {
  try {
    const data = await api.get("admin/brand");
    return data.data;
  } catch (e) {}

  return [];
};
