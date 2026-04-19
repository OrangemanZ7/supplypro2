// Fornecedores page

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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash, Plus } from "lucide-react";

interface Fornecedor {
  _id: string;
  nome: string;
  nomeFantasia: string;
  celular: string;
  email?: string;
  endereco?: string;
  localizacaoGPS?: string;
  cnpj?: string;
  cpf?: string;
  inscricaoEstadual?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] =
    useState<Fornecedor | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    nomeFantasia: "",
    celular: "",
    email: "",
    endereco: "",
    localizacaoGPS: "",
    cnpj: "",
    cpf: "",
    inscricaoEstadual: "",
  });

  useEffect(() => {
    async function fetchFornecedores() {
      try {
        const res = await fetch("/api/fornecedores");
        if (!res.ok) throw new Error("Falha ao carregar dados");
        const data = await res.json();
        setFornecedores(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFornecedores();
  }, []);

  const handleCreate = () => {
    setSelectedFornecedor(null);
    setFormData({
      nome: "",
      nomeFantasia: "",
      celular: "",
      email: "",
      endereco: "",
      localizacaoGPS: "",
      cnpj: "",
      cpf: "",
      inscricaoEstadual: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const fornecedor = fornecedores.find((f) => f._id === id);
    if (fornecedor) {
      setSelectedFornecedor(fornecedor);
      setFormData({
        nome: fornecedor.nome,
        nomeFantasia: fornecedor.nomeFantasia,
        celular: fornecedor.celular,
        email: fornecedor.email || "",
        endereco: fornecedor.endereco || "",
        localizacaoGPS: fornecedor.localizacaoGPS || "",
        cnpj: fornecedor.cnpj || "",
        cpf: fornecedor.cpf || "",
        inscricaoEstadual: fornecedor.inscricaoEstadual || "",
      });
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/fornecedores?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFornecedores(fornecedores.filter((f) => f._id !== id));
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
      const method = selectedFornecedor ? "PUT" : "POST";
      const url = selectedFornecedor
        ? `/api/fornecedores?id=${selectedFornecedor._id}`
        : "/api/fornecedores";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updatedFornecedor = await res.json();
        if (selectedFornecedor) {
          setFornecedores(
            fornecedores.map((f) =>
              f._id === selectedFornecedor._id ? updatedFornecedor : f,
            ),
          );
        } else {
          setFornecedores([...fornecedores, updatedFornecedor]);
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
        <h1 className="text-3xl font-bold tracking-tight">Fornecedores</h1>
        <div className="flex justify-end mb-4">
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Fornecedor
          </Button>
        </div>
        <div className="border rounded-lg p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome Fantasia</TableHead>
                <TableHead>Celular</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fornecedores.map((fornecedor, index) => (
                <TableRow
                  key={fornecedor._id}
                  className={index % 2 === 0 ? "bg-secondary" : ""}
                >
                  <TableCell>{fornecedor.nomeFantasia}</TableCell>
                  <TableCell>{fornecedor.celular}</TableCell>
                  <TableCell>{fornecedor.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(fornecedor._id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(fornecedor._id)}
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
                {selectedFornecedor
                  ? "Editar Fornecedor"
                  : "Criar Novo Fornecedor"}
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
                <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                <Input
                  id="nomeFantasia"
                  value={formData.nomeFantasia}
                  onChange={(e) =>
                    setFormData({ ...formData, nomeFantasia: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="celular">Celular</Label>
                <Input
                  id="celular"
                  value={formData.celular}
                  onChange={(e) =>
                    setFormData({ ...formData, celular: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) =>
                    setFormData({ ...formData, endereco: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="localizacaoGPS">Localização GPS</Label>
                <Input
                  id="localizacaoGPS"
                  value={formData.localizacaoGPS}
                  onChange={(e) =>
                    setFormData({ ...formData, localizacaoGPS: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) =>
                    setFormData({ ...formData, cnpj: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) =>
                    setFormData({ ...formData, cpf: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                <Input
                  id="inscricaoEstadual"
                  value={formData.inscricaoEstadual}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inscricaoEstadual: e.target.value,
                    })
                  }
                />
              </div>
              <Button type="submit">
                {selectedFornecedor ? "Atualizar" : "Criar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
