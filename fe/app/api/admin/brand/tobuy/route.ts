"use server";
import { getAllBrandToBuy } from "@/service/admin/brand-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    let data = await getAllBrandToBuy();
    return NextResponse.json(data);
  } catch (error) {}
  return NextResponse.json(
    { message: "" },
    {
      status: 404,
    }
  );
}
