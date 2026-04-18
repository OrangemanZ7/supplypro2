import { NextResponse } from "next/server";

// Handle GET requests to /api/dashboard
export async function GET() {
  return NextResponse.json({ pageName: "Dashboard GET", status: "success" });
}
