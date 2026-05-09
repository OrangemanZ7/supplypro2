"use client";

import { useEffect, useState } from "react";
import SupplierModal from "./SupplierModal";
import ProductModal from "./ProductModal";

import type { Fornecedor } from "@/types/Fornecedor";
import type { Produto } from "@/types/Produto";

type ProdutoContrato = {
  produto?: Produto;
  produtoId?: string;
  unidade: string;
  precoUnitario: number;
  quantidadeMaxima: number;
};

export default function NovoContratoPage() {
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [fornecedorQuery, setFornecedorQuery] = useState("");
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [showFornecedorModal, setShowFornecedorModal] = useState(false);

  const [produtosContrato, setProdutosContrato] = useState<ProdutoContrato[]>(
    [],
  );
  const [showProdutoModal, setShowProdutoModal] = useState(false);
  const [produtoIndexEditing, setProdutoIndexEditing] = useState<number | null>(
    null,
  );

  const [ano, setAno] = useState<number>(new Date().getFullYear());
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [observacoes, setObservacoes] = useState<string>("");

  // busca fornecedores
  useEffect(() => {
    if (!fornecedorQuery) return;
    const timeout = setTimeout(async () => {
      const res = await fetch(
        `/api/fornecedores?q=${encodeURIComponent(fornecedorQuery)}`,
      );
      const data = await res.json();
      setFornecedores(data);
    }, 300);
    return () => clearTimeout(timeout);
  }, [fornecedorQuery]);

  const addProdutoLinha = () => {
    setProdutosContrato((prev) => [
      ...prev,
      { unidade: "", precoUnitario: 0, quantidadeMaxima: 0 },
    ]);
  };

  const handleSalvarContrato = async () => {
    if (!fornecedor) {
      alert("Selecione um fornecedor.");
      return;
    }
    if (!dataInicio || !dataFim || !produtosContrato.length) {
      alert("Preencha datas e ao menos um produto.");
      return;
    }

    const payload = {
      fornecedorId: fornecedor._id,
      ano,
      dataInicio,
      dataFim,
      observacoes,
      produtos: produtosContrato.map((p) => ({
        produtoId: p.produto?._id || p.produtoId,
        unidade: p.unidade,
        precoUnitario: p.precoUnitario,
        quantidadeMaxima: p.quantidadeMaxima,
      })),
    };

    const res = await fetch("/api/contratos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Erro ao salvar contrato.");
      return;
    }

    alert("Contrato criado com sucesso.");
    // aqui você pode redirecionar ou limpar o formulário
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Novo Contrato</h1>

      {/* Fornecedor */}
      <div>
        <label className="block text-sm font-medium">Fornecedor</label>
        <input
          className="border p-2 w-full"
          placeholder="Digite o nome ou CNPJ"
          value={fornecedorQuery}
          onChange={(e) => setFornecedorQuery(e.target.value)}
        />
        {fornecedores.length > 0 && (
          <div className="border mt-1 bg-white max-h-40 overflow-auto text-sm">
            {fornecedores.map((f) => (
              <div
                key={f._id}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setFornecedor(f);
                  setFornecedorQuery(f.nome);
                  setFornecedores([]);
                }}
              >
                {f.nome} — {f.cnpj}
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          className="mt-2 text-blue-600 text-sm"
          onClick={() => setShowFornecedorModal(true)}
        >
          + Criar novo fornecedor
        </button>
        {fornecedor && (
          <p className="text-xs text-gray-600 mt-1">
            Selecionado: {fornecedor.nome} ({fornecedor.cnpj})
          </p>
        )}
      </div>

      {/* Dados gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Ano</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={ano}
            onChange={(e) => setAno(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Data início</label>
          <input
            type="date"
            className="border p-2 w-full"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Data fim</label>
          <input
            type="date"
            className="border p-2 w-full"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Observações</label>
        <textarea
          className="border p-2 w-full"
          rows={3}
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />
      </div>

      {/* Produtos do contrato */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Produtos do contrato</h2>
          <button
            type="button"
            className="text-blue-600 text-sm"
            onClick={addProdutoLinha}
          >
            + Adicionar produto
          </button>
        </div>

        {produtosContrato.map((item, index) => (
          <div key={index} className="border p-3 rounded space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">
                  {item.produto
                    ? item.produto.nome
                    : "Nenhum produto selecionado"}
                </span>
              </div>
              <button
                type="button"
                className="text-blue-600 text-xs"
                onClick={() => {
                  setProdutoIndexEditing(index);
                  setShowProdutoModal(true);
                }}
              >
                {item.produto ? "Trocar produto" : "Selecionar produto"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div>
                <label>Unidade</label>
                <input
                  className="border p-1 w-full"
                  value={item.unidade}
                  onChange={(e) =>
                    setProdutosContrato((prev) =>
                      prev.map((p, i) =>
                        i === index ? { ...p, unidade: e.target.value } : p,
                      ),
                    )
                  }
                />
              </div>
              <div>
                <label>Preço unitário</label>
                <input
                  type="number"
                  step="0.01"
                  className="border p-1 w-full"
                  value={item.precoUnitario}
                  onChange={(e) =>
                    setProdutosContrato((prev) =>
                      prev.map((p, i) =>
                        i === index
                          ? { ...p, precoUnitario: Number(e.target.value) }
                          : p,
                      ),
                    )
                  }
                />
              </div>
              <div>
                <label>Quantidade máxima</label>
                <input
                  type="number"
                  className="border p-1 w-full"
                  value={item.quantidadeMaxima}
                  onChange={(e) =>
                    setProdutosContrato((prev) =>
                      prev.map((p, i) =>
                        i === index
                          ? { ...p, quantidadeMaxima: Number(e.target.value) }
                          : p,
                      ),
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSalvarContrato}
      >
        Salvar contrato
      </button>

      {/* Modais */}
      {showFornecedorModal && (
        <SupplierModal
          open={showFornecedorModal}
          onClose={() => setShowFornecedorModal(false)}
          onSaved={(f: Fornecedor) => {
            setFornecedor(f);
            setFornecedorQuery(f.nome);
            setShowFornecedorModal(false);
          }}
        />
      )}

      {showProdutoModal && produtoIndexEditing !== null && (
        <ProductModal
          open={showProdutoModal}
          onClose={() => setShowProdutoModal(false)}
          onSaved={(produto: Produto) => {
            setProdutosContrato((prev) =>
              prev.map((p, i) =>
                i === produtoIndexEditing ? { ...p, produto } : p,
              ),
            );
            setShowProdutoModal(false);
          }}
        />
      )}
    </div>
  );
}
