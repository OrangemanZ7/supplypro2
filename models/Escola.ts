// Escola MODEL
import mongoose, { Schema, model, models } from "mongoose";

const EscolaSchema = new Schema(
  {
    nome: { type: String, required: true },
    celular: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    endereco: { type: String, required: false },
    localizacaoGPS: { type: String, required: false },
    cnpj: { type: String, required: false, unique: true },
    responsavel: { type: String, required: false },
    alunos: { type: Number, required: false },
    professores: { type: Number, required: false },
    funcionarios: { type: Number, required: false },
    pedidos: [{ type: Schema.Types.ObjectId, ref: "Pedido" }],
    consumos: [{ type: Schema.Types.ObjectId, ref: "Consumo" }],
  },
  {
    timestamps: true,
  },
);

export default models.Escola || model("Escola", EscolaSchema);
