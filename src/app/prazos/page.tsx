"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"
import { AlertTriangle, Plus, Search, X, Calendar } from "lucide-react"
import Footer from "@/components/layout/Footer"

const initialDeadlines = [
  { title: "Réplica à Contestação", process: "Defesa Criminal - Estelionato", type: "Ordinário", due: "Hoje", dueBg: "#ef4444", dueColor: "white", assignee: "Dr. Fernando", urgent: true },
  { title: "Juntada de Documentos", process: "Ação de Divórcio Litigioso", type: "Diligência", due: "Amanhã", dueBg: "#f97316", dueColor: "white", assignee: "Dra. Camila", urgent: true },
  { title: "Contestação - Ação de Indenização", process: "Ação de Indenização por Danos Morais", type: "Fatal", due: "2d", dueBg: "#e5e7eb", dueColor: "#374151", assignee: "Dr. Fernando", urgent: true, typeColor: "#ef4444", typeBg: "#fee2e2" },
  { title: "Audiência de Conciliação", process: "Reclamatória Trabalhista", type: "Audiência", due: "5d", dueBg: "#e5e7eb", dueColor: "#374151", assignee: "Dra. Camila", urgent: false },
  { title: "Recurso de Apelação", process: "Execução Fiscal - ICMS", type: "Recurso", due: "19/03", dueBg: "#e5e7eb", dueColor: "#374151", assignee: "Dr. Fernando", urgent: false },
]

const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: "9px",
  border: "1px solid #e5e7eb", fontSize: "14px", color: "#111827",
  background: "white", outline: "none", fontFamily: "inherit",
  boxSizing: "border-box" as const,
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: "0.4px", display: "block", marginBottom: "6px", textTransform: "uppercase" as const }}>
      {label}
    </label>
    {children}
  </div>
)

const emptyForm = {
  title: "", process: "", type: "Ordinário", dueDate: "", assignee: "Dr. Fernando", description: "",
}

function calcDue(dateStr: string): { due: string; dueBg: string; dueColor: string; urgent: boolean } {
  if (!dateStr) return { due: "—", dueBg: "#e5e7eb", dueColor: "#374151", urgent: false }
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  if (diff <= 0)  return { due: "Hoje",   dueBg: "#ef4444", dueColor: "white",    urgent: true }
  if (diff === 1) return { due: "Amanhã", dueBg: "#f97316", dueColor: "white",    urgent: true }
  if (diff <= 3)  return { due: `${diff}d`, dueBg: "#e5e7eb", dueColor: "#374151", urgent: true }
  return { due: new Date(dateStr).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }), dueBg: "#e5e7eb", dueColor: "#374151", urgent: false }
}

export default function PrazosPage() {
  const [deadlines, setDeadlines] = useState(initialDeadlines)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [checked, setChecked] = useState<number[]>([])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const typeColors: Record<string, { color: string; bg: string }> = {
    "Fatal":      { color: "#ef4444", bg: "#fee2e2" },
    "Ordinário":  { color: "#374151", bg: "#f3f4f6" },
    "Audiência":  { color: "#7e22ce", bg: "#faf5ff" },
    "Diligência": { color: "#15803d", bg: "#f0fdf4" },
    "Recurso":    { color: "#1d4ed8", bg: "#eff6ff" },
  }

  async function handleSave() {
    if (!form.title || !form.process || !form.dueDate) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    const { due, dueBg, dueColor, urgent } = calcDue(form.dueDate)
    const tc = typeColors[form.type] ?? { color: "#374151", bg: "#f3f4f6" }
    setDeadlines(prev => [...prev, {
      title: form.title, process: form.process, type: form.type,
      due, dueBg, dueColor, assignee: form.assignee, urgent,
      typeColor: tc.color, typeBg: tc.bg,
    }])
    setForm(emptyForm)
    setOpen(false)
    setSaving(false)
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <main style={{ padding: "32px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>Prazos</h1>
              <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>Controle de prazos processuais</p>
            </div>
            <button
              onClick={() => setOpen(true)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #C9A84C, #9a7a32)",
                color: "white", padding: "10px 20px", borderRadius: "10px",
                fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer",
                boxShadow: "0 4px 12px rgba(201,168,76,0.3)",
              }}
            >
              <Plus size={16} /> Novo Prazo
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 14px" }}>
              <Search size={15} color="#9ca3af" />
              <input placeholder="Buscar prazos..." style={{ border: "none", outline: "none", fontSize: "14px", color: "#374151", width: "100%", backgroundColor: "transparent" }} />
            </div>
            <select style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", color: "#374151", backgroundColor: "white", cursor: "pointer" }}>
              <option>Pendentes</option><option>Concluídos</option><option>Todos</option>
            </select>
            <select style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", color: "#374151", backgroundColor: "white", cursor: "pointer" }}>
              <option>Todos os Tipos</option><option>Ordinário</option><option>Fatal</option>
              <option>Audiência</option><option>Diligência</option><option>Recurso</option>
            </select>
          </div>

          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {deadlines.map((d, i) => (
              <div key={i} style={{
                backgroundColor: checked.includes(i) ? "#f0fdf4" : d.urgent ? "#fff7f7" : "white",
                border: `1px solid ${checked.includes(i) ? "#86efac" : d.urgent ? "#fecaca" : "#e5e7eb"}`,
                borderRadius: "12px", padding: "20px 24px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                cursor: "pointer", transition: "all 0.2s",
                opacity: checked.includes(i) ? 0.6 : 1,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <input
                    type="checkbox"
                    checked={checked.includes(i)}
                    onChange={() => setChecked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}
                    style={{ width: "18px", height: "18px", cursor: "pointer", flexShrink: 0, accentColor: "#10b981" }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {d.urgent && !checked.includes(i) && <AlertTriangle size={15} color="#f87171" />}
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: checked.includes(i) ? "#6b7280" : "#111827", marginBottom: "3px", textDecoration: checked.includes(i) ? "line-through" : "none" }}>{d.title}</p>
                      <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>{d.process}</p>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        <span style={{ backgroundColor: (d as any).typeBg ?? "#f3f4f6", color: (d as any).typeColor ?? "#374151", fontSize: "11px", padding: "2px 8px", borderRadius: "999px", fontWeight: 500 }}>{d.type}</span>
                        <span style={{ backgroundColor: d.dueBg, color: d.dueColor, fontSize: "11px", padding: "2px 8px", borderRadius: "999px", fontWeight: 600 }}>{d.due}</span>
                        <span style={{ backgroundColor: "#f3f4f6", color: "#374151", fontSize: "11px", padding: "2px 8px", borderRadius: "999px", fontWeight: 500 }}>{d.assignee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      <Footer />
        
      </div>

      {/* Modal Novo Prazo */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "520px", boxShadow: "0 24px 60px rgba(0,0,0,0.15)", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Calendar size={18} color="#d97706" />
                </div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Novo Prazo</h2>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Cadastre um prazo processual</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={15} color="#6b7280" />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>

              <Field label="Título do Prazo *">
                <input style={inputStyle} placeholder="Ex: Réplica à Contestação" value={form.title} onChange={e => set("title", e.target.value)} />
              </Field>

              <Field label="Processo Vinculado *">
                <input style={inputStyle} placeholder="Ex: Ação de Indenização por Danos Morais" value={form.process} onChange={e => set("process", e.target.value)} />
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <Field label="Tipo">
                  <select style={inputStyle} value={form.type} onChange={e => set("type", e.target.value)}>
                    <option>Ordinário</option>
                    <option>Fatal</option>
                    <option>Audiência</option>
                    <option>Diligência</option>
                    <option>Recurso</option>
                  </select>
                </Field>
                <Field label="Data de Vencimento *">
                  <input type="date" style={inputStyle} value={form.dueDate} onChange={e => set("dueDate", e.target.value)} />
                </Field>
              </div>

              <Field label="Responsável">
                <select style={inputStyle} value={form.assignee} onChange={e => set("assignee", e.target.value)}>
                  <option>Dr. Fernando</option>
                  <option>Dra. Camila</option>
                  <option>Dr. Ricardo</option>
                </select>
              </Field>

              <Field label="Observações">
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} placeholder="Detalhes adicionais..." value={form.description} onChange={e => set("description", e.target.value)} />
              </Field>
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setOpen(false)} style={{ padding: "10px 20px", borderRadius: "9px", fontSize: "13px", fontWeight: 500, background: "#f3f4f6", border: "none", cursor: "pointer", color: "#374151" }}>
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.process || !form.dueDate}
                style={{
                  padding: "10px 24px", borderRadius: "9px", fontSize: "13px", fontWeight: 600,
                  background: saving || !form.title || !form.process || !form.dueDate ? "#e5e7eb" : "linear-gradient(135deg, #C9A84C, #9a7a32)",
                  border: "none", cursor: saving ? "not-allowed" : "pointer",
                  color: saving || !form.title || !form.process || !form.dueDate ? "#9ca3af" : "white",
                  boxShadow: "0 4px 12px rgba(201,168,76,0.25)", transition: "all 0.2s",
                }}
              >
                {saving ? "Salvando..." : "Cadastrar Prazo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
