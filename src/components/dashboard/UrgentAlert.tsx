"use client"

import { useState } from "react"
import { AlertTriangle, ArrowRight, X, Calendar, Clock, User } from "lucide-react"

const urgentDeadlines = [
  {
    id: 1,
    title: "Réplica à Contestação",
    case: "Ação de Indenização por Danos Morais",
    caseNumber: "1234567-89.2025.8.26.0001",
    dueDate: new Date(),
    type: "Ordinário",
    assignedTo: "Dr. Fernando",
    urgency: "hoje",
  },
  {
    id: 2,
    title: "Juntada de Documentos",
    case: "Reclamatória Trabalhista",
    caseNumber: "9876543-21.2025.5.02.0001",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    type: "Diligência",
    assignedTo: "Dr. Fernando",
    urgency: "amanha",
  },
  {
    id: 3,
    title: "Contestação - Ação de Indenização",
    case: "Ação de Indenização por Danos Morais",
    caseNumber: "1234567-89.2025.8.26.0001",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    type: "Fatal",
    assignedTo: "Dr. Fernando",
    urgency: "2dias",
  },
]

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    hoje:   { label: "Hoje",    bg: "#fee2e2", color: "#b91c1c" },
    amanha: { label: "Amanhã",  bg: "#fff7ed", color: "#c2410c" },
    "2dias":{ label: "2 dias",  bg: "#fefce8", color: "#854d0e" },
  }
  const s = map[urgency] ?? map["2dias"]
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700,
      background: s.bg, color: s.color,
    }}>{s.label}</span>
  )
}

function TypeBadge({ type }: { type: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    "Fatal":      { bg: "#fee2e2", color: "#b91c1c" },
    "Ordinário":  { bg: "#eff6ff", color: "#1d4ed8" },
    "Diligência": { bg: "#f0fdf4", color: "#15803d" },
    "Audiência":  { bg: "#faf5ff", color: "#7e22ce" },
  }
  const s = map[type] ?? { bg: "#f3f4f6", color: "#374151" }
  return (
    <span style={{
      padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 500,
      background: s.bg, color: s.color,
    }}>{type}</span>
  )
}

export default function UrgentAlert() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Banner */}
      <div
        onClick={() => setOpen(true)}
        style={{
          background: "linear-gradient(135deg, #fff5f5, #fff1f1)",
          border: "1px solid #fecaca", borderRadius: "14px",
          padding: "16px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", transition: "all 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(239,68,68,0.12)"}
        onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <AlertTriangle size={17} color="#ef4444" strokeWidth={2} />
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#b91c1c", marginBottom: "2px" }}>
              {urgentDeadlines.length} prazos urgentes
            </p>
            <p style={{ fontSize: "12.5px", color: "#ef4444" }}>Vencendo nos próximos 3 dias — clique para ver</p>
          </div>
        </div>
        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ArrowRight size={15} color="#ef4444" strokeWidth={2} />
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px",
        }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div style={{
            background: "white", borderRadius: "20px", width: "100%", maxWidth: "560px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{
              padding: "20px 24px", borderBottom: "1px solid #f3f4f6",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "linear-gradient(135deg, #fff5f5, #fff1f1)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "10px",
                  background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <AlertTriangle size={18} color="#ef4444" strokeWidth={2} />
                </div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>
                    Prazos Urgentes
                  </h2>
                  <p style={{ fontSize: "12px", color: "#ef4444", margin: 0 }}>
                    {urgentDeadlines.length} prazos vencendo em breve
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: "#f3f4f6", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <X size={15} color="#6b7280" />
              </button>
            </div>

            {/* List */}
            <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {urgentDeadlines.map(d => (
                <div key={d.id} style={{
                  padding: "16px", borderRadius: "12px",
                  border: "1px solid #f3f4f6", background: "#fafafa",
                  transition: "all 0.15s",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = "1px solid #fecaca"
                    e.currentTarget.style.background = "#fff5f5"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = "1px solid #f3f4f6"
                    e.currentTarget.style.background = "#fafafa"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827", margin: "0 0 4px" }}>
                        {d.title}
                      </p>
                      <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                        {d.case}
                      </p>
                    </div>
                    <UrgencyBadge urgency={d.urgency} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <Calendar size={12} color="#9ca3af" />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>{formatDate(d.dueDate)}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <User size={12} color="#9ca3af" />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>{d.assignedTo}</span>
                    </div>
                    <TypeBadge type={d.type} />
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <span style={{ fontSize: "11px", color: "#9ca3af" }}>Nº {d.caseNumber}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setOpen(false)} style={{
                padding: "9px 20px", borderRadius: "9px", fontSize: "13px", fontWeight: 500,
                background: "#f3f4f6", border: "none", cursor: "pointer", color: "#374151",
              }}>
                Fechar
              </button>
              <button style={{
                padding: "9px 20px", borderRadius: "9px", fontSize: "13px", fontWeight: 600,
                background: "linear-gradient(135deg, #C9A84C, #9a7a32)",
                border: "none", cursor: "pointer", color: "white",
                boxShadow: "0 4px 12px rgba(201,168,76,0.3)",
              }}>
                Ver todos os prazos
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}