import { iBrand } from "@/components/brand/interface";
import { api } from "@/util/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  var s = await request.json();
  try {
    api.post("/admin/brand/backup", s);
  } catch (error) {}

  return NextResponse.json({});
}

export async function GET(request: NextRequest) {
  let s = "";
  const headers = new Headers();
  headers.append("Content-Disposition", 'attachment; filename="brand.csv"'); // Set desired filename
  headers.append("Content-Type", "application/csv"); // Set appropriate Content-Type
  try {
    const da = await api.get("/admin/brand/backup");
    const data = da.data as iBrand[];
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
