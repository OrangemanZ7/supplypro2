// Usuarios API route

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import mongoose from "mongoose";
import Usuario from "../../../models/Usuario";

const User =
  mongoose.models.Usuario || mongoose.model("Usuario", Usuario.schema);

// GET: List all usuarios or fetch by ID if query param provided
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const user = await User.findById(id);
      if (!user) {
        return NextResponse.json(
          { error: "Usuário não encontrado" },
          { status: 404 },
        );
      }
      return NextResponse.json(user);
    } else {
      const users = await User.find({});
      return NextResponse.json(users);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch usuarios" },
      { status: 500 },
    );
  }
}

// POST: Create a new usuario
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const user = new User(body);
    await user.save();
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create usuario" },
      { status: 500 },
    );
  }
}

// PUT: Update a user by ID
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    const body = await request.json();
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

// DELETE: Delete a user by ID
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
