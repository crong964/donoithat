import { iBrand } from "@/components/brand/interface";
import { iBackupInventory } from "@/components/inventory/interface";
import { iBackupLocation } from "@/components/location/interface";
import { api } from "@/util/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  var s = await request.json();

  try {
    api.post("/admin/location/backupnew", s);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({});
}

export async function GET(request: NextRequest) {
  let s = "";
  const headers = new Headers();
  headers.append("Content-Disposition", 'attachment; filename="locaion.csv"');
  headers.append("Content-Type", "application/csv");
  try {
    const da = await api.get("/admin/location/backup");

    const data = da.data as iBackupLocation[];
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
