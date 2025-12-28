import { api } from "@/util/fetch";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");
  const page = request.nextUrl.searchParams.get("page") || 1;

  if (name == null) {
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    let data = await api.get(`/admin/suplier/search?name=${name}&page=${page}`);

    return new Response(JSON.stringify(data.data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
