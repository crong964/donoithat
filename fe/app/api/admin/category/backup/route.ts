"use server";
import { iCategoryBackup } from "@/components/route/admin/category/interface";
import { api } from "@/util/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let s = "";
  const headers = new Headers();
  headers.append("Content-Disposition", 'attachment; filename="category.csv"'); // Set desired filename
  headers.append("Content-Type", "application/csv");
  try {
    let da = await api.get("/admin/category/backup");
    const data = da.data as iCategoryBackup[];
    data.forEach((v) => {
      for (const key in v) {
        if (!Object.hasOwn(v, key)) continue;
        let tmp: any = v;
        const element = tmp[key];
        s += `${element},`;
      }
      s += `\n`;
    });
  } catch (error) {}
  return new Response(s, { headers });
}

export async function POST(request: NextRequest) {
  var s = await request.json();

  try {
    await api.post("/admin/category/backup", s);
  } catch (error) {
    console.log((error as any).response?.data);

    return NextResponse.json({}, { status: 500 });
  }

  return NextResponse.json({});
}
