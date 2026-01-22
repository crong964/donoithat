"use server";
import { api } from "@/util/fetch";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    let data = await api.get("/admin/product/category");
    return new Response(JSON.stringify(data.data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ mess: "Lỗi" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
