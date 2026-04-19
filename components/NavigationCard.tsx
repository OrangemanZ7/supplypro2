import Link from "next/link";
import { LucideIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NavCardProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

export function NavigationCard({ name, href, icon: Icon }: NavCardProps) {
  return (
    <Link href={href} className="block no-underline">
      <Card
        size="sm"
        className="hover:border-primary transition-colors cursor-pointer h-full"
      >
        <CardHeader>
          <CardTitle className="text-base">{name}</CardTitle>
          <CardAction>
            <Icon className="h-5 w-5 text-muted-foreground" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Gerenciar módulo de {name.toLowerCase()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
