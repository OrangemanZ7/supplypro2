"use client";
// Dashboard page

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Sidebar() {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  const navItems = [
    { name: "Cardápios" as string, href: "/cardapios" as string },
    { name: "Compras" as string, href: "/compras" as string },
    { name: "Configuração" as string, href: "/configuracao" as string },
    { name: "Consumos" as string, href: "/consumos" as string },
    { name: "Contratos" as string, href: "/contratos" as string },
    { name: "Dashboard" as string, href: "/dashboard" as string },
    { name: "Envios" as string, href: "/envios" as string },
    { name: "Escolas" as string, href: "/escolas" as string },
    { name: "Estoques" as string, href: "/estoques" as string },
    { name: "Fornecedoes" as string, href: "/fornecedores" as string },
    { name: "Locais" as string, href: "/locais" as string },
    { name: "Pedidos" as string, href: "/pedidos" as string },
    { name: "Produtos" as string, href: "/produtos" as string },
    { name: "Usuários" as string, href: "/usuarios" as string },
  ];

  return (
    <div className="flex flex-col flex-1 h-full pl-2">
      <p className="text-center p-2">SupplyPro v1.0 - Sidebar</p>
      <hr className="w-58 border-t-2 ml-2"></hr>
      <nav>
        <ul className="space-y-2 p-2 ml-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={
                    isActive
                      ? "text-sidebar-primary"
                      : "text-muted-foreground hover:text-foreground transition-colors"
                  }
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <hr className="w-58 border-t-2 ml-2"></hr>
      <div className="mt-auto mb-20 p-2 ml-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
