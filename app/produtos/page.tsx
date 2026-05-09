// Produtos page in app/produtos/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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

interface Produto {
  _id: string;
  nome: string;
  preco: number;
  marca: string;
  unidadeMedida: string;
  fornecedor: string;
  estoque: number;
  categoria: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    marca: "",
    unidadeMedida: "",
    fornecedor: "",
    estoque: "",
    categoria: "",
  });

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await fetch("/api/produtos");
        if (!res.ok) throw new Error("Falha ao carregar dados");
        const data = await res.json();
        setProdutos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  const handleCreate = () => {
    setSelectedProduto(null);
    setFormData({
      nome: "",
      preco: "",
      marca: "",
      unidadeMedida: "",
      fornecedor: "",
      estoque: "",
      categoria: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const produto = produtos.find((p) => p._id === id);
    if (produto) {
      setSelectedProduto(produto);
      setFormData({
        nome: produto.nome,
        preco: produto.preco.toString(),
        marca: produto.marca,
        unidadeMedida: produto.unidadeMedida,
        fornecedor: produto.fornecedor,
        estoque: produto.estoque.toString(),
        categoria: produto.categoria,
      });
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/produtos?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProdutos(produtos.filter((p) => p._id !== id));
      } else {
        console.error("Falha ao deletar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = selectedProduto ? "PUT" : "POST";
      const url = selectedProduto
        ? `/api/produtos?id=${selectedProduto._id}`
        : "/api/produtos";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          preco: parseFloat(formData.preco),
        }),
      });
      if (res.ok) {
        const updatedProduto = await res.json();
        if (selectedProduto) {
          setProdutos(
            produtos.map((p) =>
              p._id === selectedProduto._id ? updatedProduto : p,
            ),
          );
        } else {
          setProdutos([...produtos, updatedProduto]);
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
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
        <div className="flex justify-end mb-4">
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Produto
          </Button>
        </div>
        <div className="border rounded-lg p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>UM</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.map((produto, index) => (
                <TableRow
                  key={produto._id}
                  className={index % 2 === 0 ? "bg-secondary" : ""}
                >
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>R$ {produto.preco.toFixed(2)}</TableCell>
                  <TableCell>{produto.marca}</TableCell>
                  <TableCell>{produto.fornecedor}</TableCell>
                  <TableCell>{produto.estoque}</TableCell>
                  <TableCell>{produto.unidadeMedida}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(produto._id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(produto._id)}
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
                {selectedProduto ? "Editar Produto" : "Criar Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="preco">Preço</Label>
                <Input
                  id="preco"
                  type="number"
                  step="0.01"
                  value={formData.preco}
                  onChange={(e) =>
                    setFormData({ ...formData, preco: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="marca">Marca</Label>
                <Input
                  id="marca"
                  value={formData.marca}
                  onChange={(e) =>
                    setFormData({ ...formData, marca: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="unidadeMedida">Unidade de Medida</Label>
                <Input
                  id="unidadeMedida"
                  value={formData.unidadeMedida}
                  onChange={(e) =>
                    setFormData({ ...formData, unidadeMedida: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="categoria">Categoria</Label>
                <Input
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Input
                  id="fornecedor"
                  value={formData.fornecedor}
                  onChange={(e) =>
                    setFormData({ ...formData, fornecedor: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="estoque">Estoque</Label>
                <Input
                  id="estoque"
                  type="number"
                  value={formData.estoque}
                  onChange={(e) =>
                    setFormData({ ...formData, estoque: e.target.value })
                  }
                />
              </div>
              <Button type="submit">
                {selectedProduto ? "Atualizar" : "Criar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
