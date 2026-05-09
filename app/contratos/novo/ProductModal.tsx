// Modal para selecionar ou criar um produto

"use client";

import { useState, useEffect } from "react";
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

export interface Produto {
  _id: string;
  nome: string;
}

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: (produto: Produto) => void;
}

export default function ProductModal({
  open,
  onClose,
  onSaved,
}: ProductModalProps) {
  const [query, setQuery] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nomeNovo, setNomeNovo] = useState("");

  useEffect(() => {
    if (!query) return;

    const timeout = setTimeout(async () => {
      const res = await fetch(`/api/produtos?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setProdutos(data);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleCreate = async () => {
    const res = await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nomeNovo }),
    });

    const produto = await res.json();
    onSaved(produto);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Selecionar ou Criar Produto</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Buscar produto</Label>
            <Input value={query} onChange={(e) => setQuery(e.target.value)} />

            {produtos.length > 0 && (
              <div className="border rounded mt-2 max-h-40 overflow-auto bg-white text-black">
                {produtos.map((p) => (
                  <div
                    key={p._id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onSaved(p)}
                  >
                    {p.nome}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2 border-t">
            <Label>Nome do novo produto</Label>
            <Input
              value={nomeNovo}
              onChange={(e) => setNomeNovo(e.target.value)}
            />

            <Button className="mt-2 w-full" onClick={handleCreate}>
              Criar Produto
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
