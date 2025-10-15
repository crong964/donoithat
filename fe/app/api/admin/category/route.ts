'use server'
import { iMainCateGory } from "@/components/category/interface";
import { api } from "@/util/fetch";

export async function GET(request: Request) {
    try {
        let data = await api.get("/admin/category")

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

export async function POST(request: Request) {
    // Parse the request body
    const body = await request.json();
    const { name } = body;

    // e.g. Insert new user into your DB
    const newUser = { id: Date.now(), name };

    return new Response(JSON.stringify(newUser), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}