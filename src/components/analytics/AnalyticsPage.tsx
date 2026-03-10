"use client"

import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"
import { Scale, TrendingUp, BarChart2, DollarSign } from "lucide-react"
import { useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  LineChart, Line,
} from "recharts"
import Footer from "@/components/layout/Footer"

const stats = [
  { title: "Total Processos", value: "6", icon: Scale, iconBg: "#eff6ff", iconColor: "#3b82f6" },
  { title: "Taxa de Prazos", value: "14.3%", sub: "1/7", icon: TrendingUp, iconBg: "#f0fdf4", iconColor: "#10b981" },
  { title: "Prazos Perdidos", value: "0", icon: BarChart2, iconBg: "#f3f4f6", iconColor: "#6b7280" },
  { title: "Receita Total", value: "R$ 12.325", icon: DollarSign, iconBg: "#fdf4ff", iconColor: "#a855f7" },
]

const areaData = [
  { area: "cível", total: 1 },
  { area: "trabalhista", total: 1 },
  { area: "tributário", total: 1 },
  { area: "família", total: 1 },
  { area: "criminal", total: 1 },
  { area: "empresarial", total: 1 },
]

const statusData = [
  { name: "em andamento", value: 4, color: "#10b981" },
  { name: "aguardando decisao", value: 1, color: "#f59e0b" },
  { name: "fase recursal", value: 1, color: "#6366f1" },
]

const receitaData = [
  { mes: "Jan", receita: 4200 },
  { mes: "Fev", receita: 5800 },
  { mes: "Mar", receita: 12325 },
]

const tabs = ["Visão Geral", "Financeiro", "IA Jurídica"]

export default function AnalyticsPage() {
  const [tab, setTab] = useState("Visão Geral")

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <main style={{ padding: "32px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>Legal Analytics</h1>
            <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>Inteligência de dados para tomada de decisão</p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} style={{
                  backgroundColor: "white", border: "1px solid #e5e7eb",
                  borderRadius: "12px", padding: "20px",
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                }}>
                  <div>
                    <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>{s.title}</p>
                    <p style={{ fontSize: "24px", fontWeight: 700, color: "#111827" }}>{s.value}</p>
                    {s.sub && <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{s.sub}</p>}
                  </div>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "8px",
                    backgroundColor: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={18} color={s.iconColor} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "2px", marginBottom: "20px", borderBottom: "1px solid #e5e7eb" }}>
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "10px 20px", fontSize: "14px", fontWeight: 500,
                border: "none", cursor: "pointer", backgroundColor: "transparent",
                borderBottom: tab === t ? "2px solid #111827" : "2px solid transparent",
                color: tab === t ? "#111827" : "#6b7280",
                transition: "all 0.15s",
              }}>
                {t}
              </button>
            ))}
          </div>

          {tab === "Visão Geral" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

              {/* Bar chart */}
              <div style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#111827", marginBottom: "20px" }}>Processos por Área</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="area" tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <Tooltip />
                    <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie chart */}
              <div style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#111827", marginBottom: "20px" }}>Status dos Processos</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} dataKey="value">
                      {statusData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend formatter={(value) => <span style={{ fontSize: "12px", color: "#6b7280" }}>{value}</span>} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {tab === "Financeiro" && (
            <div style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#111827", marginBottom: "20px" }}>Receita Mensal</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={receitaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip formatter={(v) => [`R$ ${Number(v).toLocaleString("pt-BR")}`, "Receita"]} />
                  <Line type="monotone" dataKey="receita" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {tab === "IA Jurídica" && (
            <div style={{
              backgroundColor: "white", border: "1px solid #e5e7eb",
              borderRadius: "12px", padding: "48px", textAlign: "center",
            }}>
              <Scale size={40} color="#d1d5db" style={{ margin: "0 auto 16px" }} />
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>IA Jurídica em breve</p>
              <p style={{ fontSize: "14px", color: "#9ca3af" }}>Análise preditiva de processos com inteligência artificial</p>
            </div>
          )}

        </main>
        <Footer />
      </div>
    </div>
  )
}
