import { NextResponse } from "next/server";

// Handle GET requests to /api/configuracao
export async function GET() {
  return NextResponse.json({ pageName: "Configuração GET", status: "success" });
}
