"use client";

import { useState } from "react";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import ProcessTable from "./ProcessTable";
import { stats, clientes, documentos, agenda, financeiro } from "@/data/mockData";

export default function DashboardBase() {

  const [currentTab, setCurrentTab] = useState("dashboard");

  return (

    <div className="flex">

      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-1 bg-gray-100 min-h-screen">

        <Topbar />

        <div className="p-8">

          {currentTab === "dashboard" && (

            <div>

              <div className="grid grid-cols-4 gap-6 mb-8">

                {stats.map((s, i) => (

                  <div
                    key={i}
                    className="bg-white p-6 rounded-xl border"
                  >

                    <p className="text-sm text-gray-500">
                      {s.title}
                    </p>

                    <h3 className="text-2xl font-bold">
                      {s.value}
                    </h3>

                  </div>

                ))}

              </div>

            </div>

          )}

          {currentTab === "processos" && <ProcessTable />}

          {currentTab === "clientes" && (

            <div className="bg-white p-6 rounded-xl border">

              <h2 className="font-bold mb-4">Clientes</h2>

              {clientes.map((c, i) => (

                <div key={i} className="border-b py-2">

                  {c.nome} — {c.telefone}

                </div>

              ))}

            </div>

          )}

          {currentTab === "documentos" && (

            <div className="grid grid-cols-3 gap-4">

              {documentos.map((d, i) => (

                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border"
                >
                  {d}
                </div>

              ))}

            </div>

          )}

          {currentTab === "agenda" && (

            <div className="bg-white p-6 rounded-xl border">

              <h2 className="font-bold mb-4">
                Agenda
              </h2>

              {agenda.map((a, i) => (

                <div key={i} className="border-b py-2">

                  {a.titulo} — {a.data}

                </div>

              ))}

            </div>

          )}

          {currentTab === "financeiro" && (

            <div className="bg-white p-6 rounded-xl border">

              <h2 className="font-bold mb-4">
                Financeiro
              </h2>

              {financeiro.map((f, i) => (

                <div key={i} className="border-b py-2">

                  {f.cliente} — {f.valor} — {f.status}

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>

  );
}