// Pedidos API route
import { NextResponse } from "next/server";

// Handle GET requests to /api/pedidos
export async function GET() {
  return NextResponse.json({ pageName: "Pedidos GET", status: "success" });
}
