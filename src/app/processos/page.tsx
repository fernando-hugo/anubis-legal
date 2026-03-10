"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"
import { Scale, Search, Plus, ChevronRight, X } from "lucide-react"
import Footer from "@/components/layout/Footer"

const initialProcesses = [
  { title: "Ação de Indenização por Danos Morais", client: "Maria Oliveira Silva", number: "1234567-89.2025.8.26.0001", status: "em andamento", priority: "alta", area: "Cível", court: "2ª Vara Cível - SP", statusColor: "#10b981", priorityColor: "#f59e0b" },
  { title: "Reclamatória Trabalhista", client: "João Carlos Mendes", number: "9876543-21.2025.5.02.0001", status: "em andamento", priority: "media", area: "Trabalhista", court: "3ª Vara do Trabalho - RJ", statusColor: "#10b981", priorityColor: "#6b7280" },
  { title: "Execução Fiscal - ICMS", client: "TechBrasil Ltda", number: "5555555-00.2024.8.13.0001", status: "aguardando decisão", priority: "urgente", area: "Tributário", court: "1ª Vara da Fazenda Pública - SP", statusColor: "#f59e0b", priorityColor: "#ef4444" },
  { title: "Ação de Divórcio Litigioso", client: "Ana Paula Ferreira", number: "3333333-11.2025.8.26.0005", status: "em andamento", priority: "media", area: "Família", court: "5ª Vara de Família - SP", statusColor: "#10b981", priorityColor: "#6b7280" },
  { title: "Defesa Criminal - Estelionato", client: "João Carlos Mendes", number: "7777777-22.2025.8.26.0010", status: "em andamento", priority: "urgente", area: "Criminal", court: "10ª Vara Criminal - SP", statusColor: "#10b981", priorityColor: "#ef4444" },
  { title: "Ação Revisional de Contrato", client: "Construtora Horizonte S.A.", number: "2222222-33.2025.8.26.0001", status: "fase recursal", priority: "baixa", area: "Empresarial", court: "2ª Vara Cível - MG", statusColor: "#6366f1", priorityColor: "#6b7280" },
]

const Badge = ({ label, color, bg }: { label: string; color: string; bg: string }) => (
  <span style={{ backgroundColor: bg, color, fontSize: "11px", padding: "2px 8px", borderRadius: "999px", fontWeight: 500 }}>
    {label}
  </span>
)

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: "0.4px", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
      {label}
    </label>
    {children}
  </div>
)

const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: "9px",
  border: "1px solid #e5e7eb", fontSize: "14px", color: "#111827",
  background: "white", outline: "none", fontFamily: "inherit",
  boxSizing: "border-box" as const,
}

const emptyForm = {
  title: "", client: "", number: "", area: "Cível", status: "em andamento",
  priority: "media", court: "", description: "",
}

export default function ProcessosPage() {
  const [processes, setProcesses] = useState(initialProcesses)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const statusColors: Record<string, string> = {
    "em andamento": "#10b981", "aguardando decisão": "#f59e0b",
    "fase recursal": "#6366f1", "encerrado": "#6b7280",
  }
  const priorityColors: Record<string, string> = {
    urgente: "#ef4444", alta: "#f59e0b", media: "#6b7280", baixa: "#6b7280",
  }

  async function handleSave() {
    if (!form.title || !form.client || !form.number) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    setProcesses(prev => [...prev, {
      ...form,
      statusColor: statusColors[form.status] ?? "#10b981",
      priorityColor: priorityColors[form.priority] ?? "#6b7280",
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
              <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>Processos</h1>
              <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>{processes.length} processos cadastrados</p>
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
              <Plus size={16} /> Novo Processo
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 14px" }}>
              <Search size={15} color="#9ca3af" />
              <input placeholder="Buscar por título, número ou cliente..." style={{ border: "none", outline: "none", fontSize: "14px", color: "#374151", width: "100%", backgroundColor: "transparent" }} />
            </div>
            <select style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", color: "#374151", backgroundColor: "white", cursor: "pointer" }}>
              <option>Todos os Status</option>
              <option>Em andamento</option>
              <option>Aguardando decisão</option>
              <option>Fase recursal</option>
            </select>
            <select style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", color: "#374151", backgroundColor: "white", cursor: "pointer" }}>
              <option>Todas as Áreas</option>
              <option>Cível</option><option>Trabalhista</option>
              <option>Tributário</option><option>Criminal</option><option>Família</option>
            </select>
          </div>

          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {processes.map((p, i) => (
              <div key={i} style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "box-shadow 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Scale size={18} color="#3b82f6" />
                  </div>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#111827", marginBottom: "3px" }}>{p.title}</p>
                    <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>{p.client} • {p.number}</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <Badge label={p.status} color={p.statusColor} bg={p.statusColor + "20"} />
                      <Badge label={p.priority} color={p.priorityColor} bg={p.priorityColor + "20"} />
                      <Badge label={p.area} color="#374151" bg="#f3f4f6" />
                      <Badge label={p.court} color="#374151" bg="#f3f4f6" />
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="#9ca3af" />
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>

      {/* Modal Novo Processo */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "600px", boxShadow: "0 24px 60px rgba(0,0,0,0.15)", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>

            {/* Modal Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Scale size={18} color="#3b82f6" />
                </div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Novo Processo</h2>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Preencha os dados do processo</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={15} color="#6b7280" />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>

              <Field label="Título do Processo *">
                <input style={inputStyle} placeholder="Ex: Ação de Indenização por Danos Morais" value={form.title} onChange={e => set("title", e.target.value)} />
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <Field label="Cliente *">
                  <input style={inputStyle} placeholder="Nome do cliente" value={form.client} onChange={e => set("client", e.target.value)} />
                </Field>
                <Field label="Número do Processo *">
                  <input style={inputStyle} placeholder="0000000-00.0000.0.00.0000" value={form.number} onChange={e => set("number", e.target.value)} />
                </Field>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <Field label="Área">
                  <select style={inputStyle} value={form.area} onChange={e => set("area", e.target.value)}>
                    <option>Cível</option><option>Trabalhista</option><option>Tributário</option>
                    <option>Criminal</option><option>Família</option><option>Empresarial</option>
                    <option>Previdenciário</option><option>Consumidor</option>
                  </select>
                </Field>
                <Field label="Status">
                  <select style={inputStyle} value={form.status} onChange={e => set("status", e.target.value)}>
                    <option value="em andamento">Em andamento</option>
                    <option value="aguardando decisão">Aguardando decisão</option>
                    <option value="fase recursal">Fase recursal</option>
                    <option value="encerrado">Encerrado</option>
                  </select>
                </Field>
                <Field label="Prioridade">
                  <select style={inputStyle} value={form.priority} onChange={e => set("priority", e.target.value)}>
                    <option value="urgente">Urgente</option>
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                  </select>
                </Field>
              </div>

              <Field label="Vara / Tribunal">
                <input style={inputStyle} placeholder="Ex: 2ª Vara Cível - SP" value={form.court} onChange={e => set("court", e.target.value)} />
              </Field>

              <Field label="Descrição / Observações">
                <textarea style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }} placeholder="Detalhes adicionais sobre o processo..." value={form.description} onChange={e => set("description", e.target.value)} />
              </Field>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setOpen(false)} style={{ padding: "10px 20px", borderRadius: "9px", fontSize: "13px", fontWeight: 500, background: "#f3f4f6", border: "none", cursor: "pointer", color: "#374151" }}>
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.client || !form.number}
                style={{
                  padding: "10px 24px", borderRadius: "9px", fontSize: "13px", fontWeight: 600,
                  background: saving || !form.title || !form.client || !form.number
                    ? "#e5e7eb" : "linear-gradient(135deg, #C9A84C, #9a7a32)",
                  border: "none", cursor: saving ? "not-allowed" : "pointer",
                  color: saving || !form.title || !form.client || !form.number ? "#9ca3af" : "white",
                  boxShadow: "0 4px 12px rgba(201,168,76,0.25)",
                  transition: "all 0.2s",
                }}
              >
                {saving ? "Salvando..." : "Cadastrar Processo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}