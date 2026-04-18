import { NextResponse } from "next/server";

// Handle GET requests to /api/produtos
export async function GET() {
  return NextResponse.json({ pageName: "Produtos GET", status: "success" });
}
