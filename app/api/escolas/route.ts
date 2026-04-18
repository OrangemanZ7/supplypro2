import { NextResponse } from "next/server";

// Handle GET requests to /api/escolas
export async function GET() {
  return NextResponse.json({ pageName: "Escolas GET", status: "success" });
}
