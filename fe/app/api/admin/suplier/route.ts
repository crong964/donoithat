'use server'

import { api } from "@/util/fetch";

export async function GET(request: Request) {
    try {
        let data = await api.get("/admin/suplier")
        return new Response(JSON.stringify(data.data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify([]), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }


}
