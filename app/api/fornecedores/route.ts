// Fornecedores API route

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import mongoose from "mongoose";
import Fornecedor from "../../../models/Fornecedor";

const Supplier =
  mongoose.models.Fornecedor || mongoose.model("Fornecedor", Fornecedor.schema);

// GET: List all Fornecedores or fetch by ID if query param provided
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const supplier = await Supplier.findById(id);
      if (!supplier) {
        return NextResponse.json(
          { error: "Fornecedor não encontrado" },
          { status: 404 },
        );
      }
      return NextResponse.json(supplier);
    } else {
      const suppliers = await Supplier.find({});
      return NextResponse.json(suppliers);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch fornecedores" },
      { status: 500 },
    );
  }
}

// POST: Create a new fornecedor
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const supplier = new Supplier(body);
    await supplier.save();
    return NextResponse.json(supplier, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create fornecedor" },
      { status: 500 },
    );
  }
}

// PUT: Update a Fornecedor by ID
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    const body = await request.json();
    const supplier = await Supplier.findByIdAndUpdate(id, body, { new: true });
    if (!supplier) {
      return NextResponse.json(
        { error: "Fornecedor not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(supplier);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update fornecedor" },
      { status: 500 },
    );
  }
}

// DELETE: Delete a Fornecedor by ID
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) {
      return NextResponse.json(
        { error: "Fornecedor not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Fornecedor deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete fornecedor" },
      { status: 500 },
    );
  }
}
