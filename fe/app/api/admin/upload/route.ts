'use server'
import { iMainCateGory } from "@/components/category/interface";
import { api } from "@/util/fetch";



export async function POST(request: Request) {
    let s = await request.formData()
    try {
        var data = await api.post("/admin/image/upload", s)
        return new Response(JSON.stringify(data.data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {

    }
    return new Response(JSON.stringify({ mess: "" }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });

}


export async function PATCH(request: Request) {
    console.log(await request.json());

    return new Response(JSON.stringify({ mess: "" }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });

}

