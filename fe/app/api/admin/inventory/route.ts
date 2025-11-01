'use server'
import { iMainCateGory } from "@/components/category/interface";
import { errorResponse } from "@/util/error-response";
import { api } from "@/util/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const p = request.nextUrl.searchParams
    try {
        let data = await api.get(`/admin/inventory?curpage=${p.get("page") || ""}&inventoryName=${p.get("inventoryName") || ""}&onSale=${p.get("onSale") || ""}&brandId=${p.get("brandId") || ""}`)

        return NextResponse.json(data.data)
    } catch (error) {


    }
    return NextResponse.json({ message: "" }, {
        status: 505
    })
}

export async function POST(request: NextRequest) {
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