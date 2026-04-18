"use client";
// Dashboard page

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard" as string, href: "/dashboard" as string },
    { name: "Cardápios" as string, href: "/cardapios" as string },
    { name: "Compras" as string, href: "/compras" as string },
    { name: "Consumos" as string, href: "/consumos" as string },
    { name: "Contratos" as string, href: "/contratos" as string },
    { name: "Envios" as string, href: "/envios" as string },
    { name: "Escolas" as string, href: "/escolas" as string },
    { name: "Estoques" as string, href: "/estoques" as string },
    { name: "Fornecedoes" as string, href: "/fornecedores" as string },
    { name: "Locais" as string, href: "/locais" as string },
    { name: "Pedidos" as string, href: "/pedidos" as string },
    { name: "Produtos" as string, href: "/produtos" as string },
    { name: "Usuários" as string, href: "/usuarios" as string },
    { name: "Configuração" as string, href: "/configuracao" as string },
  ];

  return (
    <div className="flex flex-col flex-1 dark:bg-black">
      <p>SupplyPro v1.0 - Sidebar</p>

      <nav>
        <ul className="space-y-2 p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={
                    isActive
                      ? "text-blue-900"
                      : "text-blue-100 hover:text-blue-900"
                  }
                >
                  - {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
