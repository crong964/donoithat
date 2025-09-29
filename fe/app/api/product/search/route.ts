import { api } from "@/util/fetch";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const name = request.nextUrl.searchParams.get("name")
    if (name == null) {
        return new Response(JSON.stringify({ mess: "Lỗi" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    try {
        let data = await api.get("/product/search?name=" + name)
        return new Response(JSON.stringify(data.data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ mess: "Lỗi" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }


}