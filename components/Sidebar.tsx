"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Home,
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
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
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
    // Ajustado para encolher a largura em telas pequenas (w-16) e expandir em telas médias (w-64)
    <div className="flex flex-col flex-1 h-full bg-sidebar text-sidebar-foreground transition-all w-16 md:w-64 border-r">
      <Link
        href="/"
        className="flex items-center justify-center md:justify-start gap-2 rounded-md px-4 md:px-7 py-4 text-sm transition-colors"
      >
        <Home className="h-5 w-5" />
        {/* Escondido no mobile, visível no desktop */}
        <span className="hidden md:inline font-bold">SupplyPro v1.0</span>
      </Link>

      <hr className="mx-2 border-t-2" />

      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col items-center md:items-stretch px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={item.name} // Tooltip nativo para mobile
                  className={cn(
                    // h-10 e w-10 no mobile cria um círculo/quadrado perfeito para o ícone
                    "flex items-center justify-center md:justify-start gap-3 rounded-md transition-colors",
                    "h-10 w-10 md:h-auto md:w-full md:px-3 md:py-2",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {/* O "truque" está aqui: hidden por padrão, inline no md: */}
                  <span className="hidden md:inline">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <hr className="mx-2 border-t-2" />

      <div className="mt-4 p-2 flex justify-center md:justify-start">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "h-9 w-9",
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

      <div className="mt-auto p-4 hidden md:block">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SupplyPro.
        </p>
        <p className="text-xs">Todos os direitos reservados.</p>
      </div>
    </div>
  );
}

// Altere a classe da div principal da Sidebar
<div
  className={cn(
    "flex flex-col h-full bg-sidebar text-sidebar-foreground border-r transition-all duration-300",
    "w-[60px] md:w-64", // 60px no mobile (apenas ícone), 256px no desktop
  )}
>
  {/* ... restante do código ... */}
</div>;
