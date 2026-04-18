// Pedidos page
async function getPageData() {
  // Certifique-se de que a rota da API existe em /api/pedidos/route.ts
  const res = await fetch(`http://localhost:3000/api/pedidos`, {
    cache: "no-store", // Garante que pegue o dado fresco
  });

  if (!res.ok) throw new Error("Falha ao carregar dados");

  return res.json();
}

export default function Pedidos() {
  return (
    <div className="flex flex-col flex-1 h-full dark:bg-black pl-2">
      <main className="p-2">
        SupplyPro v1.0 -{" "}
        {getPageData().then((data) => {
          return data.pageName + " - STATUS: " + data.status;
        })}
      </main>
    </div>
  );
}
