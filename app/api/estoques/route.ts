import { NextResponse } from "next/server";

// Handle GET requests to /api/estoques
export async function GET() {
  return NextResponse.json({ pageName: "Estoques GET", status: "success" });
}
