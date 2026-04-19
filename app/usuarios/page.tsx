// Usuarios page
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

interface Usuario {
  _id: string;
  nome: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState({ nome: "", email: "" });

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await fetch("/api/usuarios");
        if (!res.ok) throw new Error("Falha ao carregar dados");
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsuarios();
  }, []);

  const handleCreate = () => {
    setSelectedUsuario(null);
    setFormData({ nome: "", email: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const usuario = usuarios.find((u) => u._id === id);
    if (usuario) {
      setSelectedUsuario(usuario);
      setFormData({ nome: usuario.nome, email: usuario.email });
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/usuarios?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsuarios(usuarios.filter((u) => u._id !== id));
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
      const method = selectedUsuario ? "PUT" : "POST";
      const url = selectedUsuario
        ? `/api/usuarios?id=${selectedUsuario._id}`
        : "/api/usuarios";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updatedUsuario = await res.json();
        if (selectedUsuario) {
          setUsuarios(
            usuarios.map((u) =>
              u._id === selectedUsuario._id ? updatedUsuario : u,
            ),
          );
        } else {
          setUsuarios([...usuarios, updatedUsuario]);
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
        <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
        <div className="flex justify-end mb-4">
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Usuário
          </Button>
        </div>
        <div className="border rounded-lg p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario, index) => (
                <TableRow
                  key={usuario._id}
                  className={index % 2 === 0 ? "bg-secondary" : ""}
                >
                  <TableCell>{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(usuario._id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(usuario._id)}
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
                {selectedUsuario ? "Editar Usuário" : "Criar Novo Usuário"}
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
              <Button type="submit">
                {selectedUsuario ? "Atualizar" : "Criar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
