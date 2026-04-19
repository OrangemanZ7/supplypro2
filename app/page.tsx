// Home page
import {
  LayoutDashboard,
  Utensils,
  ShoppingCart,
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
  Settings,
} from "lucide-react";
import { NavigationCard } from "@/components/NavigationCard";

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

export default function Home() {
  return (
    <div className="flex flex-col flex-1 h-full p-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Módulos do SupplyPro
        </h1>
        <p className="text-muted-foreground">
          Selecione um módulo para gerenciar o sistema.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {navItems.map((item) => (
          <NavigationCard
            key={item.href}
            name={item.name}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}
