import { api } from "@/util/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let locationId = request.nextUrl.searchParams.get("locationId");

  let data;

  if (locationId) {
    data = await api.get(`/location?locationId=${locationId}`);
  } else {
    data = await api.get(`/location`);
  }

  return new Response(JSON.stringify(data.data), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
