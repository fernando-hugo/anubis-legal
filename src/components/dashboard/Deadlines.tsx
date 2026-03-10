"use client"

import { AlertTriangle, ArrowRight, Clock } from "lucide-react"

const deadlines = [
  { title: "Réplica à Contestação", process: "Defesa Criminal - Estelionato", type: "Ordinário", due: "Hoje", dueStyle: { background: "#ef4444", color: "white" }, urgent: true },
  { title: "Juntada de Documentos", process: "Ação de Divórcio Litigioso", type: "Diligência", due: "Amanhã", dueStyle: { background: "#f97316", color: "white" }, urgent: true },
  { title: "Contestação - Ação de Indenização", process: "Ação de Indenização por Danos Morais", type: "Fatal", due: "2d restantes", dueStyle: { background: "#fef2f2", color: "#ef4444" }, urgent: true, typeStyle: { background: "#fef2f2", color: "#ef4444" } },
  { title: "Audiência de Conciliação", process: "Reclamatória Trabalhista", type: "Audiência", due: "14/03", dueStyle: { background: "#f3f4f6", color: "#6b7280" }, urgent: false },
]

export default function Deadlines() {
  return (
    <div style={{
      background: "white", borderRadius: "16px", padding: "24px",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0a0a0f", marginBottom: "2px" }}>Próximos Prazos</h2>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>{deadlines.length} prazos pendentes</p>
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "13px", fontWeight: 500, color: "#059669",
          background: "#f0fdf4", border: "none", cursor: "pointer",
          padding: "7px 14px", borderRadius: "8px",
          transition: "all 0.15s",
        }}>
          Ver todos <ArrowRight size={13} strokeWidth={2.5} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {deadlines.map((d, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 16px", borderRadius: "12px",
            background: d.urgent ? "linear-gradient(135deg, #fffbfb, #fff8f8)" : "#fafafa",
            border: `1px solid ${d.urgent ? "#fde8e8" : "#f0f0f0"}`,
            cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateX(2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: d.urgent ? "#fee2e2" : "#f3f4f6",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {d.urgent
                  ? <AlertTriangle size={14} color="#ef4444" strokeWidth={2} />
                  : <Clock size={14} color="#6b7280" strokeWidth={2} />
                }
              </div>
              <div>
                <p style={{ fontSize: "13.5px", fontWeight: 600, color: "#111827", marginBottom: "2px" }}>{d.title}</p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>{d.process}</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
              <span style={{
                ...(d.typeStyle ?? { background: "#f3f4f6", color: "#6b7280" }),
                fontSize: "11px", padding: "3px 9px", borderRadius: "6px", fontWeight: 500,
              }}>{d.type}</span>
              <span style={{
                ...d.dueStyle,
                fontSize: "11px", padding: "3px 9px", borderRadius: "6px", fontWeight: 600,
              }}>{d.due}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}