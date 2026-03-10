"use client"

import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis,
  Tooltip, CartesianGrid, BarChart, Bar, Legend
} from "recharts"
import { useState } from "react"
import { TrendingUp } from "lucide-react"

const monthlyData = [
  { month: "Jan", processos: 20, encerrados: 5, novos: 8 },
  { month: "Fev", processos: 32, encerrados: 8, novos: 14 },
  { month: "Mar", processos: 41, encerrados: 11, novos: 18 },
  { month: "Abr", processos: 55, encerrados: 14, novos: 22 },
  { month: "Mai", processos: 60, encerrados: 18, novos: 19 },
  { month: "Jun", processos: 72, encerrados: 20, novos: 24 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: "white", border: "1px solid #f3f4f6",
      borderRadius: "12px", padding: "12px 16px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    }}>
      <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color }} />
          <span style={{ fontSize: "12px", color: "#6b7280" }}>{p.name}:</span>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function ProcessesChart() {
  const [chartType, setChartType] = useState<"area" | "bar">("area")

  const totalGrowth = Math.round(((monthlyData[5].processos - monthlyData[0].processos) / monthlyData[0].processos) * 100)

  return (
    <div style={{
      background: "white", borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.06)",
      padding: "24px", overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUp size={16} color="#C9A84C" />
            </div>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", margin: 0 }}>Crescimento de Processos</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "42px" }}>
            <span style={{ fontSize: "12px", color: "#6b7280" }}>Últimos 6 meses</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#10b981", background: "#f0fdf4", padding: "1px 8px", borderRadius: "999px" }}>
              +{totalGrowth}% ↑
            </span>
          </div>
        </div>

        {/* Toggle Area/Bar */}
        <div style={{ display: "flex", gap: "4px", background: "#f3f4f6", borderRadius: "8px", padding: "3px" }}>
          {(["area", "bar"] as const).map(t => (
            <button key={t} onClick={() => setChartType(t)} style={{
              padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 500,
              border: "none", cursor: "pointer", transition: "all 0.15s",
              background: chartType === t ? "white" : "transparent",
              color: chartType === t ? "#111827" : "#9ca3af",
              boxShadow: chartType === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}>
              {t === "area" ? "Área" : "Barras"}
            </button>
          ))}
        </div>
      </div>

      {/* Mini stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Total Ativo", value: monthlyData[5].processos, color: "#C9A84C" },
          { label: "Novos (Jun)", value: monthlyData[5].novos, color: "#10b981" },
          { label: "Encerrados (Jun)", value: monthlyData[5].encerrados, color: "#6b7280" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "10px 14px", borderRadius: "10px", background: "#fafafa", border: "1px solid #f3f4f6" }}>
            <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 4px", fontWeight: 500 }}>{s.label}</p>
            <p style={{ fontSize: "20px", fontWeight: 700, color: s.color, margin: 0, letterSpacing: "-0.5px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ height: "200px" }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="processos" name="Total" stroke="#C9A84C" strokeWidth={2.5} fill="url(#goldGradient)" dot={{ fill: "#C9A84C", r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: "#C9A84C" }} />
              <Area type="monotone" dataKey="novos" name="Novos" stroke="#10b981" strokeWidth={2} fill="url(#greenGradient)" dot={{ fill: "#10b981", r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: "#10b981" }} />
            </AreaChart>
          ) : (
            <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "12px", color: "#6b7280" }} />
              <Bar dataKey="processos" name="Total" fill="#C9A84C" radius={[4, 4, 0, 0]} />
              <Bar dataKey="novos" name="Novos" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="encerrados" name="Encerrados" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}