"use client";

type Props = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

export default function Sidebar({ currentTab, setCurrentTab }: Props) {

  const menu = [
    "dashboard",
    "processos",
    "clientes",
    "documentos",
    "agenda",
    "financeiro"
  ];

  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        Anúbis Legal
      </h1>

      <nav className="space-y-4">

        {menu.map((item) => (

          <button
            key={item}
            onClick={() => setCurrentTab(item)}
            className={`block w-full text-left p-2 rounded
            ${currentTab === item ? "bg-gray-700" : "hover:bg-gray-800"}`}
          >
            {item.toUpperCase()}
          </button>

        ))}

      </nav>
    </aside>
  );
}