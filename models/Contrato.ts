// Contrato MODEL
import mongoose, { Schema, model, models } from "mongoose";

const ContratoSchema = new Schema(
  {
    fornecedor: {
      type: Schema.Types.ObjectId,
      ref: "Fornecedor",
      required: true,
    },

    produtos: [
      {
        produto: {
          type: Schema.Types.ObjectId,
          ref: "Produto",
          required: true,
        },

        unidade: {
          type: String,
          required: true, // ex: kg, litro, maço, pacote
        },

        precoUnitario: {
          type: Number,
          required: true,
        },

        quantidadeMaxima: {
          type: Number,
          required: true, // limite anual
        },

        quantidadeUtilizada: {
          type: Number,
          default: 0, // atualizado conforme compras
        },
      },
    ],

    ano: {
      type: Number,
      required: true,
    },

    dataInicio: {
      type: Date,
      required: true,
    },

    dataFim: {
      type: Date,
      required: true,
    },

    observacoes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default models.Contrato || model("Contrato", ContratoSchema);
