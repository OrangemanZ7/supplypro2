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
import {
  LayoutDashboard,
  Utensils,
  ShoppingCart,
  Settings,
  Zap,
  FileText,
  Truck,
  School,
  Package,
  Building2,
  MapPin,
  ClipboardList,
  Tag,
  Users,
} from "lucide-react";

export default function Sidebar() {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Cardápios", href: "/cardapios", icon: Utensils },
    { name: "Compras", href: "/compras", icon: ShoppingCart },
    { name: "Consumos", href: "/consumos", icon: Zap },
    { name: "Contratos", href: "/contratos", icon: FileText },
    { name: "Envios", href: "/envios", icon: Truck },
    { name: "Escolas", href: "/escolas", icon: School },
    { name: "Estoques", href: "/estoques", icon: Package },
    { name: "Fornecedores", href: "/fornecedores", icon: Building2 },
    { name: "Locais", href: "/locais", icon: MapPin },
    { name: "Pedidos", href: "/pedidos", icon: ClipboardList },
    { name: "Produtos", href: "/produtos", icon: Tag },
    { name: "Usuários", href: "/usuarios", icon: Users },
    { name: "Configuração", href: "/configuracao", icon: Settings },
  ];

  return (
    <div className="flex flex-col flex-1 h-full pl-2 bg-sidebar text-sidebar-foreground">
      <p className="text-center p-2">SupplyPro v1.0</p>
      <hr className="w-42 border-t-2 ml-2" />
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 ml-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" /> {/* Renderiza o ícone aqui */}
                  <span>{item.name}</span>
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
