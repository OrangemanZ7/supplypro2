// API route for /api/produtos
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Produto from "@/models/Produto";

// GET /api/produtos?q=alface
export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const produtos = await Produto.find({
    nome: { $regex: q, $options: "i" },
  })
    .limit(20)
    .sort({ nome: 1 });

  return NextResponse.json(produtos);
}

// POST /api/produtos
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // validação mínima
    if (!body.nome || body.nome.trim() === "") {
      return NextResponse.json(
        { message: "O nome do produto é obrigatório." },
        { status: 400 },
      );
    }

    const produto = await Produto.create({
      nome: body.nome,
      categoria: body.categoria || null,
      descricao: body.descricao || null,
    });

    return NextResponse.json(produto, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { message: "Erro ao criar produto." },
      { status: 500 },
    );
  }
}
