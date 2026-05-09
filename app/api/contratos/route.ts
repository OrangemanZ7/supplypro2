// API route for /api/contratos

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contrato from "@/models/Contrato";
import Fornecedor from "@/models/Fornecedor";
import Produto from "@/models/Produto";

export async function GET() {
  await dbConnect();

  const contratos = await Contrato.find()
    .populate("fornecedor")
    .populate("produtos.produto")
    .sort({ createdAt: -1 });

  return NextResponse.json(contratos);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const { fornecedorId, ano, dataInicio, dataFim, observacoes, produtos } =
      body;

    if (!fornecedorId || !ano || !dataInicio || !dataFim || !produtos?.length) {
      return NextResponse.json(
        { message: "Dados incompletos para criação de contrato." },
        { status: 400 },
      );
    }

    const contrato = await Contrato.create({
      fornecedor: fornecedorId,
      ano,
      dataInicio,
      dataFim,
      observacoes,
      produtos: produtos.map((p: any) => ({
        produto: p.produtoId,
        unidade: p.unidade,
        precoUnitario: p.precoUnitario,
        quantidadeMaxima: p.quantidadeMaxima,
        quantidadeUtilizada: 0,
      })),
    });

    await Fornecedor.findByIdAndUpdate(fornecedorId, {
      $addToSet: { contratos: contrato._id },
    });

    const produtoIds = produtos.map((p: any) => p.produtoId);
    await Produto.updateMany(
      { _id: { $in: produtoIds } },
      { $addToSet: { fornecedores: fornecedorId } },
    );

    return NextResponse.json(contrato, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao criar contrato." },
      { status: 500 },
    );
  }
}
