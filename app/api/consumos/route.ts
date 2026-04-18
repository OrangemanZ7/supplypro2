import { NextResponse } from "next/server";

// Handle GET requests to /api/consumos
export async function GET() {
  return NextResponse.json({ pageName: "Consumos GET", status: "success" });
}
