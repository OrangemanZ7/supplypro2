// Fornecedor interface in /types/Fornecedor.ts

export interface Fornecedor {
  _id?: string;
  nome: string;
  cnpj: string;
  email?: string;
  telefone?: string;
  endereco?: string;
}
