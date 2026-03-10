"use client"

import { Plus, FileText, Clock, TrendingUp } from "lucide-react"

const activities = [
  { icon: Plus, color: "#059669", bg: "#f0fdf4", text: "Novo processo criado: Ação de Indenização por Danos Morais", author: "Dr. Fernando", time: "17:33" },
  { icon: FileText, color: "#8b5cf6", bg: "#faf5ff", text: "Petição inicial enviada ao tribunal", author: "Dr. Fernando", time: "17:33" },
  { icon: Clock, color: "#f97316", bg: "#fff7ed", text: "Prazo de audiência cadastrado para 15/03", author: "Dra. Camila", time: "17:33" },
  { icon: TrendingUp, color: "#3b82f6", bg: "#eff6ff", text: "6h de análise documental registradas", author: "Dr. Fernando", time: "17:33" },
]

export default function ActivityFeed() {
  return (
    <div style={{
      background: "white", borderRadius: "16px", padding: "24px",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)",
      height: "100%",
    }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0a0a0f", marginBottom: "2px" }}>Atividades</h2>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>Últimas atualizações</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
        {activities.map((a, i) => {
          const Icon = a.icon
          return (
            <div key={i} style={{ display: "flex", gap: "12px", paddingBottom: i < activities.length - 1 ? "16px" : "0", marginBottom: i < activities.length - 1 ? "16px" : "0", borderBottom: i < activities.length - 1 ? "1px solid #f9fafb" : "none" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon size={14} color={a.color} strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.5, marginBottom: "4px" }}>{a.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "11.5px", fontWeight: 500, color: "#9ca3af" }}>{a.author}</span>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#d1d5db", display: "inline-block" }} />
                  <span style={{ fontSize: "11.5px", color: "#c4c4c8" }}>09 mar, {a.time}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}