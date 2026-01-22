"use server";
import { getAllBrand } from "@/service/admin/brand-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    let data = await getAllBrand();
    return NextResponse.json(data);
  } catch (error) {}
  return NextResponse.json(
    { message: "" },
    {
      status: 404,
    }
  );
}

export async function POST(request: NextRequest) {
  // Parse the request body
  const body = await request.json();
  const { name } = body;

  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name };

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
