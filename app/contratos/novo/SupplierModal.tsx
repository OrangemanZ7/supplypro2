// SupplierModal component in app/contratos/novo/SupplierModal.tsx

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Fornecedor } from "@/types/Fornecedor";

interface SupplierModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: (fornecedor: Fornecedor) => void;
}

export default function SupplierModal({
  open,
  onClose,
  onSaved,
}: SupplierModalProps) {
  const [nome, setNome] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleSave = async () => {
    const res = await fetch("/api/fornecedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        nomeFantasia,
        cnpj,
        celular,
        email,
        telefone,
        endereco,
      }),
    });

    if (!res.ok) {
      alert("Erro ao salvar fornecedor");
      return;
    }

    const fornecedor = await res.json();
    onSaved(fornecedor);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Fornecedor</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Razão Social</Label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>

          <div>
            <Label>Nome Fantasia *</Label>
            <Input
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
            />
          </div>

          <div>
            <Label>CNPJ *</Label>
            <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
          </div>

          <div>
            <Label>Celular *</Label>
            <Input
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <Label>Telefone</Label>
            <Input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          <div>
            <Label>Endereço</Label>
            <Input
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
