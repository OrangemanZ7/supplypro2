// API route for /api/cardapios

import { NextResponse } from "next/server";

// Handle GET requests to /api/cardapios
export async function GET() {
  return NextResponse.json({ pageName: "Cardápios GET", status: "success" });
}
