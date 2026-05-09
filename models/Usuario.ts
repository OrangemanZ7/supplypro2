// Usuario model in /models/Usuario.ts

import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const UsuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    celular: { type: String, required: false },
    inscricao: { type: String, required: false, unique: true }, // Ex: matrícula ou número de funcionário
    senha: { type: String, required: false },

    // Adicione outros campos conforme necessário, como senha, data de criação, etc.
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  },
);

export default mongoose.models.Usuario ||
  mongoose.model("Usuario", UsuarioSchema);
