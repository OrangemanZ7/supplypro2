// Produto MODEL

import mongoose, { Schema, model, models } from "mongoose";

const ProdutoSchema = new Schema(
  {
    nome: { type: String, required: true },

    categoria: { type: String },

    descricao: { type: String },

    // Many-to-many: um produto pode ter vários fornecedores
    fornecedores: [{ type: Schema.Types.ObjectId, ref: "Fornecedor" }],
  },
  {
    timestamps: true,
  },
);

export default models.Produto || model("Produto", ProdutoSchema);
