"use server";
import { iBrand } from "@/components/brand/interface";
import { api } from "@/util/fetch";
import { cache } from "react";

export const getAllBrand = cache(async (): Promise<iBrand[]> => {
  let data: iBrand[] = [];
  try {
    const res = await api.get("/brand");
    data = res.data;
  } catch (e) {
    data = [];
  }
  return data;
});
