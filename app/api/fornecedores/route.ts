import { NextResponse } from "next/server";

// Handle GET requests to /api/fornecedores
export async function GET() {
  return NextResponse.json({ pageName: "Fornecedores GET", status: "success" });
}
