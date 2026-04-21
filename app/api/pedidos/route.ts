// Pedidos API route
import { NextRequest, NextResponse } from "next/server";
import Pedido from "../../../models/Pedido";
import Fornecedor from "../../../models/Fornecedor";
import Usuario from "../../../models/Usuario";
import Produto from "../../../models/Produto";

// GET - List or Get Single Order
export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const id = params.get("id");

    if (id) {
      // Get single order with populated data
      const pedido = await Pedido.findById(id)
        .populate("fornecedor", "razaoSocial cnpj")
        .populate("responsavel", "nome email")
        .populate({
          path: "produto",
          populate: {
            path: "produtoId",
            model: Produto,
            select: "nome descricao precoEstoque",
          },
        });

      if (!pedido) {
        return NextResponse.json(
          { error: "Pedido não encontrado" },
          { status: 404 },
        );
      }

      return NextResponse.json(pedido);
    }

    // List all orders with populated data
    const filter: any = {};
    const search = params.get("search");
    const status = params.get("status");

    if (search) {
      filter.$or = [
        { fornecedor: { $regex: search, $options: "i" } },
        { responsavel: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const docs = await Pedido.find(filter)
      .populate("fornecedor", "razaoSocial cnpj")
      .populate("responsavel", "nome email")
      .populate({
        path: "produto",
        populate: {
          path: "produtoId",
          model: Produto,
          select: "nome descricao precoEstoque",
        },
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({ data: docs });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fornecedor, produto, responsavel, status } = body;

    // Validate Fornecedor
    const fornecedorDoc = await Fornecedor.findById(fornecedor);
    if (!fornecedorDoc) {
      return NextResponse.json(
        { error: "Fornecedor não encontrado" },
        { status: 404 },
      );
    }

    // Validate Responsavel
    const responsavelDoc = await Usuario.findById(responsavel);
    if (!responsavelDoc) {
      return NextResponse.json(
        { error: "Responsável não encontrado" },
        { status: 404 },
      );
    }

    // Handle produto array - normalize each item
    const normalizedProduto = (produto as any[]).map((item: any) => {
      return {
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        preco: item.preco,
      };
    });

    // Create order
    const pedido = await Pedido.create({
      fornecedor: fornecedorDoc,
      produto: normalizedProduto,
      responsavel: responsavelDoc,
      status: status || "pendente",
      valorTotal: normalizedProduto.reduce((sum: number, item: any) => {
        return sum + item.preco * item.quantidade;
      }, 0),
    });

    // Populate data for response
    const populatedPedido = await Pedido.findById(pedido._id)
      .populate("fornecedor", "razaoSocial cnpj")
      .populate("responsavel", "nome email")
      .populate({
        path: "produto",
        populate: {
          path: "produtoId",
          model: Produto,
          select: "nome descricao precoEstoque",
        },
      });

    return NextResponse.json(populatedPedido, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PUT - Update order
export async function PUT(request: NextRequest) {
  try {
    const params = await request.json();
    const { id } = params;
    const body = await request.json();

    // Find and update order
    const pedido = await Pedido.findByIdAndUpdate(
      id,
      {
        ...body,
        valorTotal:
          body.produto?.reduce((sum: number, item: any) => {
            return sum + item.preco * item.quantidade;
          }, 0) || 0,
      },
      { new: true },
    );

    if (!pedido) {
      return NextResponse.json(
        { error: "Pedido não encontrado" },
        { status: 404 },
      );
    }

    // Populate data for response
    const populatedPedido = await Pedido.findById(pedido._id)
      .populate("fornecedor", "razaoSocial cnpj")
      .populate("responsavel", "nome email")
      .populate({
        path: "produto",
        populate: {
          path: "produtoId",
          model: Produto,
          select: "nome descricao precoEstoque",
        },
      });

    return NextResponse.json(populatedPedido);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

// DELETE - Delete order
export async function DELETE(request: NextRequest) {
  try {
    const params = await request.json();
    const { id } = params;

    const deleted = await Pedido.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Pedido não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Pedido deletado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
