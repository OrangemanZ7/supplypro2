// Escolas page
async function getPageData() {
  // Certifique-se de que a rota da API existe em /api/escolas/route.ts
  const res = await fetch(`http://localhost:3000/api/escolas`, {
    cache: "no-store", // Garante que pegue o dado fresco
  });

  if (!res.ok) throw new Error("Falha ao carregar dados");

  return res.json();
}

export default function Escolas() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        SupplyPro v1.0 -{" "}
        {getPageData().then((data) => {
          return data.pageName + " - STATUS: " + data.status;
        })}
      </main>
    </div>
  );
}
