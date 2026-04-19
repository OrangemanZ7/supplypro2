// Usuario Card component

"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Usuario {
  _id: string;
  nome: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UsuarioCardProps {
  usuario: Usuario;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UsuarioCard: React.FC<UsuarioCardProps> = ({
  usuario,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{usuario.nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{usuario.email}</p>
        {usuario.createdAt && (
          <p className="text-sm text-gray-500">
            Criado em: {new Date(usuario.createdAt).toLocaleDateString()}
          </p>
        )}
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => onEdit(usuario._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(usuario._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Deletar
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsuarioCard;
