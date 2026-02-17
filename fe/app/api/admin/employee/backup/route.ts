import { iBrand } from "@/components/brand/interface";
import { iEmployeeBackup } from "@/components/employee/interface";
import { api } from "@/util/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  var s = await request.json();
  try {
    api.post("/admin/employee/backup", s);
  } catch (error) {}

  return NextResponse.json({});
}

export async function GET(request: NextRequest) {
  let s = "";
  const headers = new Headers();
  headers.append("Content-Disposition", 'attachment; filename="employee.csv"');
  headers.append("Content-Type", "application/csv");
  try {
    const da = await api.get("/admin/employee/backup");
    const data = da.data as iEmployeeBackup[];
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
