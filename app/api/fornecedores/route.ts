// Fornecedores API route
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Fornecedor from "@/models/Fornecedor";

// GET: List all Fornecedores or fetch by ID if query param provided
export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const fornecedores = await Fornecedor.find({
    nome: { $regex: q, $options: "i" },
  }).limit(10);

  return NextResponse.json(fornecedores);
}

// POST: Create a new fornecedor
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const fornecedor = await Fornecedor.create(body);
  return NextResponse.json(fornecedor, { status: 201 });
}
