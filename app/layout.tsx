// Root layout in app/layout.tsx

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";

import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "SupplyPro",
  description: "Gestão de estoques e controle de pedidos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* suppressHydrationWarning é vital aqui para o next-themes não causar erro de script */
    <html lang="pt-br" suppressHydrationWarning className="h-full">
      <body className="min-h-full font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Wrapper flexível para garantir que o layout ocupe a tela toda */}
          <div className="flex min-h-screen">
            {/* Sidebar fixa lateralmente */}
            <aside className="w-16 md:w-64 h-screen sticky top-0 border-r bg-sidebar shrink-0 transition-all duration-300 gap-2">
              <Sidebar />
            </aside>

            {/* Conteúdo principal com scroll natural */}
            <main className="flex-1 bg-background text-foreground">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
