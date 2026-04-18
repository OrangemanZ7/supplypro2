import { NextResponse } from "next/server";

// Handle GET requests to /api/usuarios
export async function GET() {
  return NextResponse.json({ pageName: "Usuários GET", status: "success" });
}
