'use server'
import { iMainCateGory } from "@/components/category/interface";
import { errorResponse } from "@/util/error-response";
import { api } from "@/util/fetch";



export async function POST(request: Request) {
    let s = await request.json()
    try {
        var data = await api.post("/admin/product", s)
        return new Response(JSON.stringify(data.data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log((error as any).response.data);

        return new Response(JSON.stringify({ mess: errorResponse(error).message || "Có lỗi" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }


}

export async function PATCH(request: Request) {
    let s = await request.json()
    try {
        var data = await api.patch("/admin/product", s)
        return new Response(JSON.stringify(data.data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log((error as any).response.data);

        return new Response(JSON.stringify({ mess: errorResponse(error).message || "Có lỗi" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }


}


