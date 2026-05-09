// API route for /api/envios

import { NextResponse } from "next/server";

// Handle GET requests to /api/envios
export async function GET() {
  return NextResponse.json({ pageName: "Envios GET", status: "success" });
}
