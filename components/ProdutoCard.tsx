// This component is a reusable card component that can be used to display product information in the application. It takes in a product object as a prop and renders a card with the product's name, description, price, and creation date. It also includes buttons for editing and deleting the product, which call the provided onEdit and onDelete functions when clicked.

"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface Produto {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ProdutoCardProps {
  produto: Produto;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({
  produto,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{produto.nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{produto.descricao}</p>
        <p className="text-lg font-semibold text-green-600 mt-2">
          R$ {produto.preco.toFixed(2)}
        </p>
        {produto.createdAt && (
          <p className="text-sm text-gray-500">
            Criado em: {new Date(produto.createdAt).toLocaleDateString()}
          </p>
        )}
        <div className="mt-4 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(produto._id)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(produto._id)}
          >
            <Trash className="h-4 w-4 mr-2" />
            Deletar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProdutoCard;
