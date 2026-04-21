// Pedido MODEL

import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema(
  {
    fornecedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fornecedor",
      required: true,
    },
    produto: [
      {
        produtoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Produto",
          required: true,
        },
        quantidade: {
          type: Number,
          required: true,
        },
        preco: {
          type: Number,
          required: true,
        },
      },
    ],
    responsavel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    status: {
      type: String,
      enum: ["pendente", "em-andamento", "concluido", "cancelado"],
      default: "pendente",
    },
    valorTotal: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Pedido", PedidoSchema);
