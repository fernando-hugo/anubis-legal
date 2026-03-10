"use client"

import { Scale, Clock, TrendingUp, Users } from "lucide-react"

const stats = [
  { title: "Processos Ativos", value: "4", sub: "6 total", icon: Scale, color: "#3B8EEA", bg: "linear-gradient(135deg, #eff6ff, #dbeafe)" },
  { title: "Prazos Pendentes", value: "6", sub: "3 urgente(s)", icon: Clock, color: "#ef4444", bg: "linear-gradient(135deg, #fff1f2, #fee2e2)" },
  { title: "Horas Faturáveis", value: "28.5h", sub: "Este período", icon: TrendingUp, color: "#C9A84C", bg: "linear-gradient(135deg, #fffbeb, #fef3c7)" },
  { title: "Clientes", value: "5", sub: "5 total", icon: Users, color: "#8b5cf6", bg: "linear-gradient(135deg, #faf5ff, #ede9fe)" },
]

export default function StatsCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
      {stats.map((s, i) => {
        const Icon = s.icon
        return (
          <div key={i} style={{
            background: "white", borderRadius: "14px", padding: "22px",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            transition: "all 0.2s", cursor: "default",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)"
            }}
          >
            <div>
              <p style={{ fontSize: "12px", fontWeight: 500, color: "#9ca3af", marginBottom: "8px", letterSpacing: "0.2px" }}>{s.title}</p>
              <p style={{ fontSize: "30px", fontWeight: 700, color: "#0a0a0f", lineHeight: 1, marginBottom: "6px", letterSpacing: "-1px" }}>{s.value}</p>
              <p style={{ fontSize: "12px", color: "#c4c4c8" }}>{s.sub}</p>
            </div>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: s.bg, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon size={19} color={s.color} strokeWidth={2} />
            </div>
          </div>
        )
      })}
    </div>
  )
}