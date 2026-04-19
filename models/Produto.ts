// Produto MODEL

import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    marca: { type: String, required: true },
    unidadeMedida: { type: String, required: false },
    fornecedor: { type: String, required: false },
    estoque: { type: Number, required: false },
    categoria: { type: String, required: false },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  },
);

export default mongoose.models.Produto ||
  mongoose.model("Produto", ProdutoSchema);
