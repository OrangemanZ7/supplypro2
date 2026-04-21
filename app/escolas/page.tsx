// Escolas page
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
import { Edit, Trash, Plus, MapPin } from "lucide-react";

interface Escola {
  _id: string;
  nome: string;
  celular: string;
  email?: string;
  endereco?: string;
  localizacaoGPS?: string;
  cnpj?: string;
  responsavel?: string;
  alunos?: number;
  professores?: number;
  funcionarios?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function Escolas() {
  const [escolas, setEscolas] = useState<Escola[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEscola, setSelectedEscola] = useState<Escola | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    celular: "",
    email: "",
    endereco: "",
    localizacaoGPS: "",
    cnpj: "",
    responsavel: "",
    alunos: 0,
    professores: 0,
    funcionarios: 0,
  });

  useEffect(() => {
    async function fetchEscolas() {
      try {
        const res = await fetch("/api/escolas");
        if (!res.ok) throw new Error("Falha ao carregar dados");
        const data = await res.json();
        setEscolas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchEscolas();
  }, []);

  const handleCreate = () => {
    setSelectedEscola(null);
    setFormData({
      nome: "",
      celular: "",
      email: "",
      endereco: "",
      localizacaoGPS: "",
      cnpj: "",
      responsavel: "",
      alunos: 0,
      professores: 0,
      funcionarios: 0,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const escola = escolas.find((e) => e._id === id);
    if (escola) {
      setSelectedEscola(escola);
      setFormData({
        nome: escola.nome,
        celular: escola.celular,
        email: escola.email || "",
        endereco: escola.endereco || "",
        localizacaoGPS: escola.localizacaoGPS || "",
        cnpj: escola.cnpj || "",
        responsavel: escola.responsavel || "",
        alunos: escola.alunos || 0,
        professores: escola.professores || 0,
        funcionarios: escola.funcionarios || 0,
      });
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/escolas?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEscolas(escolas.filter((e) => e._id !== id));
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
      const method = selectedEscola ? "PUT" : "POST";
      const url = selectedEscola
        ? `/api/escolas?id=${selectedEscola._id}`
        : "/api/escolas";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updatedEscola = await res.json();
        if (selectedEscola) {
          setEscolas(
            escolas.map((e) =>
              e._id === selectedEscola._id ? updatedEscola : e,
            ),
          );
        } else {
          setEscolas([...escolas, updatedEscola]);
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
        <h1 className="text-3xl font-bold tracking-tight">Escolas</h1>
        <div className="flex justify-end mb-4">
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Nova Escola
          </Button>
        </div>
        <div className="border rounded-lg p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Celular</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escolas.map((escola, index) => (
                <TableRow
                  key={escola._id}
                  className={index % 2 === 0 ? "bg-secondary" : ""}
                >
                  <TableCell>{escola.nome}</TableCell>
                  <TableCell>{escola.celular}</TableCell>
                  <TableCell>{escola.email}</TableCell>
                  <TableCell>{escola.responsavel}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(escola._id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(escola._id)}
                      className="ml-2"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.open(escola.localizacaoGPS, "_blank");
                      }}
                      className="ml-2"
                    >
                      <MapPin className="h-4 w-4" />
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
                {selectedEscola ? "Editar Escola" : "Criar Nova Escola"}
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
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) =>
                    setFormData({ ...formData, responsavel: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="alunos">Alunos</Label>
                <Input
                  id="alunos"
                  type="number"
                  value={formData.alunos}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      alunos: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="professores">Professores</Label>
                <Input
                  id="professores"
                  type="number"
                  value={formData.professores}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      professores: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="funcionarios">Funcionários</Label>
                <Input
                  id="funcionarios"
                  type="number"
                  value={formData.funcionarios}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      funcionarios: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <Button type="submit">
                {selectedEscola ? "Atualizar" : "Criar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
