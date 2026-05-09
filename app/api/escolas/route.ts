// API route for /api/escolas

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import mongoose from "mongoose";
import Escola from "../../../models/Escola";

const School =
  mongoose.models.Escola || mongoose.model("Escola", Escola.schema);

// GET: List all Escolas or fetch by ID if query param provided
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const school = await School.findById(id);
      if (!school) {
        return NextResponse.json(
          { error: "Escola não encontrada" },
          { status: 404 },
        );
      }
      return NextResponse.json(school);
    } else {
      const schools = await School.find({});
      return NextResponse.json(schools);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao buscar escolas" },
      { status: 500 },
    );
  }
}

// POST: Create a new escola
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const school = new School(body);
    await school.save();
    return NextResponse.json(school, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao criar escola" },
      { status: 500 },
    );
  }
}

// PUT: Update a Escola by ID
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "precisa de um ID" }, { status: 400 });
    }
    const body = await request.json();
    const school = await School.findByIdAndUpdate(id, body, { new: true });
    if (!school) {
      return NextResponse.json(
        { error: "Escola não encontrada" },
        { status: 404 },
      );
    }
    return NextResponse.json(school);
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao atualizar escola" },
      { status: 500 },
    );
  }
}

// DELETE: Delete a Escola by ID
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "precisa de um ID" }, { status: 400 });
    }
    const school = await School.findByIdAndDelete(id);
    if (!school) {
      return NextResponse.json(
        { error: "Escola não encontrada" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Escola deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao eliminar escola" },
      { status: 500 },
    );
  }
}
