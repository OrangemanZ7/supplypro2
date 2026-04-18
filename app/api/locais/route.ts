import { NextResponse } from "next/server";

// Handle GET requests to /api/locais
export async function GET() {
  return NextResponse.json({ pageName: "Locais GET", status: "success" });
}
