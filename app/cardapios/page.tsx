// Cardapios page
async function getPageData() {
  // Certifique-se de que a rota da API existe em /api/cardapios/route.ts
  const res = await fetch(`http://localhost:3000/api/cardapios`, {
    cache: "no-store", // Garante que pegue o dado fresco
  });

  if (!res.ok) throw new Error("Falha ao carregar dados");

  return res.json();
}

export default function Cardapios() {
  return (
    <div className="flex flex-col flex-1 h-full bg-gray-200 text-gray-900">
      <main className="p-2">
        SupplyPro v1.0 -{" "}
        {getPageData().then((data) => {
          return data.pageName + " - STATUS: " + data.status;
        })}
      </main>
    </div>
  );
}
