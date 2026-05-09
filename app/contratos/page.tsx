// Contratos page in app/contratos/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ContratosPage() {
  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/contratos");
      const data = await res.json();
      setContratos(data);
    }
    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contratos</h1>

        <Link
          href="/contratos/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Contrato
        </Link>
      </div>

      {/* Tabela */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Fornecedor</th>
              <th className="p-3 text-left">Ano</th>
              <th className="p-3 text-left">Vigência</th>
              <th className="p-3 text-left">Produtos</th>
              <th className="p-3 text-left">Criado em</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>

          <tbody>
            {contratos.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Nenhum contrato encontrado.
                </td>
              </tr>
            )}

            {contratos.map((c: any) => (
              <tr key={c._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{c.fornecedor?.nome}</td>
                <td className="p-3">{c.ano}</td>
                <td className="p-3">
                  {new Date(c.dataInicio).toLocaleDateString()} —{" "}
                  {new Date(c.dataFim).toLocaleDateString()}
                </td>
                <td className="p-3">{c.produtos.length}</td>
                <td className="p-3">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <Link
                    href={`/contratos/${c._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
