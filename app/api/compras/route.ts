// API route for /api/compras

import { NextResponse } from "next/server";

// Handle GET requests to /api/compras
export async function GET() {
  return NextResponse.json({ pageName: "Compras GET", status: "success" });
}
