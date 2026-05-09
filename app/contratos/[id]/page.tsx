// Contrato detalhes page in app/contratos/[id]/page.tsx

import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Contrato from "@/models/Contrato";

interface Props {
  params: { id: string };
}

export default async function ContratoDetalhesPage({ params }: Props) {
  const { id } = await params; // ← CORREÇÃO

  await dbConnect();

  const contrato = await Contrato.findById(id)
    .populate("fornecedor")
    .populate("produtos.produto")
    .lean();

  if (!contrato) return notFound();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contrato {contrato.ano}</h1>

        <Link href={`/contratos/${params.id}/editar`}>
          <Button>Editar contrato</Button>
        </Link>
      </div>

      {/* Informações gerais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Ano:</strong> {contrato.ano}
          </p>
          <p>
            <strong>Vigência:</strong>{" "}
            {new Date(contrato.dataInicio).toLocaleDateString()} —{" "}
            {new Date(contrato.dataFim).toLocaleDateString()}
          </p>
          {contrato.observacoes && (
            <p>
              <strong>Observações:</strong> {contrato.observacoes}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Fornecedor */}
      <Card>
        <CardHeader>
          <CardTitle>Fornecedor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Razão Social:</strong> {contrato.fornecedor.nome}
          </p>
          <p>
            <strong>Nome Fantasia:</strong> {contrato.fornecedor.nomeFantasia}
          </p>
          <p>
            <strong>CNPJ:</strong> {contrato.fornecedor.cnpj}
          </p>
          <p>
            <strong>Celular:</strong> {contrato.fornecedor.celular}
          </p>
          {contrato.fornecedor.email && (
            <p>
              <strong>Email:</strong> {contrato.fornecedor.email}
            </p>
          )}
          {contrato.fornecedor.endereco && (
            <p>
              <strong>Endereço:</strong> {contrato.fornecedor.endereco}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Produtos do contrato */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos do contrato</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Produto</th>
                <th className="p-2 text-left">Unidade</th>
                <th className="p-2 text-left">Preço</th>
                <th className="p-2 text-left">Qtd. Máxima</th>
                <th className="p-2 text-left">Qtd. Utilizada</th>
                <th className="p-2 text-left">Saldo</th>
              </tr>
            </thead>

            <tbody>
              {contrato.produtos.map((item: any, index: number) => {
                const saldo = item.quantidadeMaxima - item.quantidadeUtilizada;

                return (
                  <tr key={index} className="border-t">
                    <td className="p-2">{item.produto?.nome}</td>
                    <td className="p-2">{item.unidade}</td>
                    <td className="p-2">R$ {item.precoUnitario.toFixed(2)}</td>
                    <td className="p-2">{item.quantidadeMaxima}</td>
                    <td className="p-2">{item.quantidadeUtilizada}</td>
                    <td className="p-2 font-semibold">{saldo}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
