// Fornecedor MODEL

import mongoose from "mongoose";

const FornecedorSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    nomeFantasia: { type: String, required: true },
    celular: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    endereco: { type: String, required: false },
    localizacaoGPS: { type: String, required: false },
    cnpj: { type: String, required: false, unique: true },
    cpf: { type: String, required: false, unique: true },
    inscricaoEstadual: { type: String, required: false, unique: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Fornecedor ||
  mongoose.model("Fornecedor", FornecedorSchema);
