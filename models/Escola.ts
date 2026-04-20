// Escola MODEL
import mongoose from "mongoose";

const EscolaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    celular: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    endereco: { type: String, required: false },
    localizacaoGPS: { type: String, required: false },
    cnpj: { type: String, required: false, unique: true },
    responsavel: { type: String, required: false },
    alunos: { type: Number, required: false },
    professores: { type: Number, required: false },
    funcionarios: { type: Number, required: false },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Escola || mongoose.model("Escola", EscolaSchema);
