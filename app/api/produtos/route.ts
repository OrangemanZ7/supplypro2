import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import mongoose from "mongoose";
import Product from "../../../models/Produto"; // Importe o modelo direto

// GET: List all produtos or fetch by ID
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
      }
      const produto = await Product.findById(id);
      if (!produto) {
        return NextResponse.json(
          { error: "Produto não encontrado" },
          { status: 404 },
        );
      }
      return NextResponse.json(produto);
    }

    const produtos = await Product.find({});
    return NextResponse.json(produtos);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao buscar", details: error.message },
      { status: 500 },
    );
  }
}

// POST: Create a new produto
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    // Simplificado usando .create()
    const product = await Product.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    // ESSA LINHA É A MAIS IMPORTANTE: Veja o erro no seu terminal!
    console.error("ERRO NO POST:", error);

    return NextResponse.json(
      { error: "Erro ao criar produto", details: error.message },
      { status: 400 }, // Geralmente erro de preenchimento de campo
    );
  }
}

// ... PUT e DELETE seguem a mesma lógica de usar "Product" diretamente
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "ID inválido ou ausente" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const produto = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!produto) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json(produto);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao atualizar", details: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const produto = await Product.findByIdAndDelete(id);
    if (!produto) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Produto deletado com sucesso" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao deletar", details: error.message },
      { status: 500 },
    );
  }
}
