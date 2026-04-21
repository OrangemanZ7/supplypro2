// Pedidos page

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash, Plus } from "lucide-react";

// Interface do Produto (Importado de modelos ou redefinido)
interface Produto {
  _id: string;
  nome: string;
  preco: number;
  marca: string;
  // ... outros campos
}

// Interface do Item do Pedido
interface PedidoItem {
  produtoId: string;
  nome: string;
  quantidade: number;
  preco: number;
}

// Interface do Pedido
interface Pedido {
  _id: string;
  fornecedor: string;
  produtos: PedidoItem[];
  responsavel: string;
  status: "pendente" | "em-andamento" | "concluido" | "cancelado";
  valorTotal: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function Pedidos() {
  // Definição correta do estado para lidar com IDs e Nomes
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

  // Estado com tipos explícitos para evitar erros de acesso a propriedades
  const [formData, setFormData] = useState({
    fornecedor: "",
    produtoIds: [] as string[],
    produtoItens: [] as PedidoItem[], // Array de objetos Produto
    responsavel: "",
    status: "pendente",
    valorTotal: 0,
  });

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const res = await fetch("/api/pedidos");
        if (!res.ok) throw new Error("Falha ao carregar dados");
        const data = await res.json();
        const arrayData = Array.isArray(data) ? data : [data];
        setPedidos(arrayData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPedidos();
  }, []);

  const handleCreate = () => {
    setSelectedPedido(null);
    // Inicializa com arrays vazios de objetos
    setFormData({
      fornecedor: "",
      produtoIds: [],
      produtoItens: [],
      responsavel: "",
      status: "pendente",
      valorTotal: 0,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const pedido = pedidos.find((p) => p._id === id);
    if (pedido) {
      setSelectedPedido(pedido);
      // Mapeamos os objetos do pedido para o formData
      setFormData({
        fornecedor: pedido.fornecedor,
        produtoIds: pedido.produtos.map((item) => item.produtoId),
        produtoItens: pedido.produtos, // Mantém os objetos completos
        responsavel: pedido.responsavel,
        status: pedido.status,
        valorTotal: pedido.valorTotal,
      });
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/pedidos?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPedidos(pedidos.filter((p) => p._id !== id));
      } else {
        console.error("Falha ao deletar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Calcula o valor total com base nos itens e atualiza o formulário
  const calcularTotal = () => {
    let total = 0;
    formData.produtoItens.forEach((item) => {
      total += item.quantidade * item.preco;
    });
    setFormData({ ...formData, valorTotal: total });
  };

  const handleProdutoChange = (produtos: Produto[]) => {
    // Lógica para popular produtos selecionados
    // Esta é uma simplificação. Em um sistema real, você usaria um Select com dados do API
    const itens = produtos.map((p) => ({
      produtoId: p._id,
      nome: p.nome,
      preco: p.preco,
      quantidade: 1,
    }));

    setFormData({
      ...formData,
      produtoItens: [...formData.produtoItens, ...itens],
    });
  };

  const handleRemoverProduto = (index: number) => {
    const novosItens = [...formData.produtoItens];
    novosItens.splice(index, 1);
    setFormData({ ...formData, produtoItens: novosItens });
    calcularTotal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = selectedPedido ? "PUT" : "POST";
      const url = selectedPedido
        ? `/api/pedidos?id=${selectedPedido._id}`
        : "/api/pedidos";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updatedPedido = await res.json();
        if (selectedPedido) {
          setPedidos(
            pedidos.map((p) =>
              p._id === selectedPedido._id ? updatedPedido : p,
            ),
          );
        } else {
          setPedidos([...pedidos, updatedPedido]);
        }
        setIsModalOpen(false);
      } else {
        console.error("Falha ao salvar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="flex flex-col flex-1 h-full">
      <main className="p-2">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <div className="flex justify-end mb-4">
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Pedido
          </Button>
        </div>
        <div className="border rounded-lg p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidos.map((pedido, index) => (
                <TableRow
                  key={pedido._id}
                  className={index % 2 === 0 ? "bg-secondary" : ""}
                >
                  <TableCell>{pedido.fornecedor}</TableCell>
                  <TableCell>
                    {pedido.produtos.map((item) => (
                      <div key={item.produtoId} className="text-sm">
                        <span className="font-medium">{item.nome}</span>
                        <span> - Qtd: {item.quantidade}</span>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{pedido.responsavel}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        pedido.status === "pendente"
                          ? "bg-yellow-100 text-yellow-800"
                          : pedido.status === "em-andamento"
                            ? "bg-blue-100 text-blue-800"
                            : pedido.status === "concluido"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pedido.status.replace("-", " ")}
                    </span>
                  </TableCell>
                  <TableCell>R$ {pedido.valorTotal.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(pedido._id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(pedido._id)}
                      className="ml-2"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedPedido ? "Editar Pedido" : "Criar Novo Pedido"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Input
                  id="fornecedor"
                  value={formData.fornecedor}
                  onChange={(e) =>
                    setFormData({ ...formData, fornecedor: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) =>
                    setFormData({ ...formData, responsavel: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value as string })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="em-andamento">Em Andamento</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Produtos</Label>
                {/* Área de adição de produtos simplificada para exemplo */}
                <div className="border p-2 rounded">
                  {formData.produtoItens.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center mb-2"
                    >
                      <div>
                        <span className="font-bold">{item.nome}</span>
                        <Input
                          type="number"
                          value={item.quantidade}
                          onChange={(e) => {
                            const novosItens = [...formData.produtoItens];
                            novosItens[idx].quantidade = Number(e.target.value);
                            setFormData({
                              ...formData,
                              produtoItens: novosItens,
                            });
                          }}
                          className="w-20"
                        />
                      </div>
                      <span>
                        R$ {item.preco.toFixed(2)} x {item.quantidade} = R${" "}
                        {(item.preco * item.quantidade).toFixed(2)}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoverProduto(idx)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-right mt-1">
                  Total:{" "}
                  <span className="font-bold">
                    R$ {formData.valorTotal.toFixed(2)}
                  </span>
                </p>
              </div>
              <Button type="submit">
                {selectedPedido ? "Atualizar" : "Criar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
