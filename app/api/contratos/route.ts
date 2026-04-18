import { NextResponse } from "next/server";

// Handle GET requests to /api/contratos
export async function GET() {
  return NextResponse.json({ pageName: "Contratos GET", status: "success" });
}
