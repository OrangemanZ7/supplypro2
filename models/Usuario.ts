// Usuario MODEL

import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Adicione outros campos conforme necessário, como senha, data de criação, etc.
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  },
);

export default mongoose.models.Usuario ||
  mongoose.model("Usuario", UsuarioSchema);
