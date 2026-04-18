"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils"; // Importação necessária
import { buttonVariants } from "@/components/ui/button"; // Importação necessária
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
    { name: "Cardápios", href: "/cardapios" },
    { name: "Compras", href: "/compras" },
    { name: "Configuração", href: "/configuracao" },
    { name: "Consumos", href: "/consumos" },
    { name: "Contratos", href: "/contratos" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Envios", href: "/envios" },
    { name: "Escolas", href: "/escolas" },
    { name: "Estoques", href: "/estoques" },
    { name: "Fornecedores", href: "/fornecedores" },
    { name: "Locais", href: "/locais" },
    { name: "Pedidos", href: "/pedidos" },
    { name: "Produtos", href: "/produtos" },
    { name: "Usuários", href: "/usuarios" },
  ];

  return (
    <div className="flex flex-col flex-1 h-full pl-2 bg-sidebar text-sidebar-foreground">
      <p className="text-center p-2">SupplyPro v1.0</p>
      <hr className="w-42 border-t-2 ml-2" />
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2 ml-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block py-1 transition-colors",
                    isActive
                      ? "text-sidebar-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <hr className="w-42 border-t-2 ml-2" />
      <div className="mt-4 p-2 ml-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "relative h-9 w-9",
            )}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
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
      <div className="mt-auto p-2 ml-2">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SupplyPro.
        </p>
        <p className="text-xs">Todos os direitos reservados.</p>
      </div>
    </div>
  );
}
