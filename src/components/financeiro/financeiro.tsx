"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"
import { Clock, TrendingUp, DollarSign, FileText, X, CheckCircle } from "lucide-react"
import Footer from "@/components/layout/Footer"

const initialLancamentos = [
  { title: "Elaboração de recurso", process: "Ação Revisional de Contrato", date: "08/03/2026", hours: "8h", value: "R$ 4.000,00", rate: 500 },
  { title: "Preparação para audiência", process: "Ação de Divórcio Litigioso", date: "07/03/2026", hours: "3h", value: "R$ 1.050,00", rate: 350 },
  { title: "Pesquisa jurisprudencial", process: "Defesa Criminal - Estelionato", date: "07/03/2026", hours: "5h", value: "R$ 2.000,00", rate: 400 },
  { title: "Análise documental", process: "Execução Fiscal - ICMS", date: "06/03/2026", hours: "6h", value: "R$ 3.000,00", rate: 500 },
  { title: "Reunião com cliente", process: "Reclamatória Trabalhista", date: "05/03/2026", hours: "2h", value: "R$ 700,00", rate: 350 },
  { title: "Petição inicial", process: "Ação de Indenização por Danos Morais", date: "04/03/2026", hours: "4.5h", value: "R$ 1.575,00", rate: 350 },
]

const initialFaturas: any[] = []

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

const emptyHoras = { title: "", process: "", date: "", hours: "", rate: "350", billable: true }
const emptyFatura = { client: "", process: "", dueDate: "", notes: "" }

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export default function FinanceiroPage() {
  const [tab, setTab] = useState<"lancamentos" | "faturas">("lancamentos")
  const [lancamentos, setLancamentos] = useState(initialLancamentos)
  const [faturas, setFaturas] = useState(initialFaturas)
  const [modalHoras, setModalHoras] = useState(false)
  const [modalFatura, setModalFatura] = useState(false)
  const [formHoras, setFormHoras] = useState(emptyHoras)
  const [formFatura, setFormFatura] = useState(emptyFatura)
  const [saving, setSaving] = useState(false)

  const setH = (k: string, v: any) => setFormHoras(f => ({ ...f, [k]: v }))
  const setF = (k: string, v: string) => setFormFatura(f => ({ ...f, [k]: v }))

  const totalHoras = lancamentos.reduce((acc, l) => acc + parseFloat(l.hours), 0)
  const totalReceita = lancamentos.reduce((acc, l) => acc + parseFloat(l.value.replace(/[R$\s.]/g, "").replace(",", ".")), 0)
  const totalFaturado = faturas.reduce((acc: number, f: any) => acc + (f.value ?? 0), 0)

  const stats = [
    { title: "Horas Faturáveis", value: `${totalHoras}h`, icon: Clock, iconBg: "#eff6ff", iconColor: "#3b82f6" },
    { title: "Receita Total", value: formatCurrency(totalReceita), icon: TrendingUp, iconBg: "#f0fdf4", iconColor: "#10b981" },
    { title: "A Faturar", value: formatCurrency(totalReceita - totalFaturado), icon: DollarSign, iconBg: "#fefce8", iconColor: "#f59e0b" },
    { title: "Recebido", value: formatCurrency(totalFaturado), icon: DollarSign, iconBg: "#fdf4ff", iconColor: "#a855f7" },
  ]

  const previewValue = formHoras.hours && formHoras.rate
    ? parseFloat(formHoras.hours) * parseFloat(formHoras.rate)
    : 0

  async function handleSaveHoras() {
    if (!formHoras.title || !formHoras.process || !formHoras.hours || !formHoras.date) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    const value = parseFloat(formHoras.hours) * parseFloat(formHoras.rate)
    const date = new Date(formHoras.date).toLocaleDateString("pt-BR")
    setLancamentos(prev => [{ title: formHoras.title, process: formHoras.process, date, hours: `${formHoras.hours}h`, value: formatCurrency(value), rate: parseFloat(formHoras.rate) }, ...prev])
    setFormHoras(emptyHoras)
    setModalHoras(false)
    setSaving(false)
  }

  async function handleSaveFatura() {
    if (!formFatura.client || !formFatura.process || !formFatura.dueDate) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    const num = `FAT-${String(faturas.length + 1).padStart(3, "0")}`
    const today = new Date().toLocaleDateString("pt-BR")
    const due = new Date(formFatura.dueDate).toLocaleDateString("pt-BR")
    setFaturas((prev: any[]) => [...prev, { num, client: formFatura.client, process: formFatura.process, issued: today, due, value: totalReceita - totalFaturado, status: "Pendente", notes: formFatura.notes }])
    setFormFatura(emptyFatura)
    setModalFatura(false)
    setTab("faturas")
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
              <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>Financeiro</h1>
              <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>Controle de horas e faturamento</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setModalHoras(true)} style={{
                display: "flex", alignItems: "center", gap: "8px",
                backgroundColor: "white", color: "#374151",
                padding: "10px 20px", borderRadius: "10px",
                fontSize: "14px", fontWeight: 600, border: "1px solid #e5e7eb", cursor: "pointer",
              }}>
                <Clock size={15} /> Lançar Horas
              </button>
              <button onClick={() => setModalFatura(true)} style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #C9A84C, #9a7a32)",
                color: "white", padding: "10px 20px", borderRadius: "10px",
                fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer",
                boxShadow: "0 4px 12px rgba(201,168,76,0.3)",
              }}>
                <FileText size={15} /> Gerar Fatura
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>{s.title}</p>
                    <p style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>{s.value}</p>
                  </div>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={s.iconColor} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "16px", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "4px", width: "fit-content" }}>
            {(["lancamentos", "faturas"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "8px 20px", borderRadius: "6px", fontSize: "14px", fontWeight: 500,
                border: "none", cursor: "pointer", transition: "all 0.15s",
                backgroundColor: tab === t ? "#f3f4f6" : "transparent",
                color: tab === t ? "#111827" : "#6b7280",
              }}>
                {t === "lancamentos" ? `Lançamentos (${lancamentos.length})` : `Faturas (${faturas.length})`}
              </button>
            ))}
          </div>

          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {tab === "lancamentos" ? lancamentos.map((l, i) => (
              <div key={i} style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Clock size={16} color="#3b82f6" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{l.title}</p>
                    <p style={{ fontSize: "12px", color: "#6b7280" }}>{l.process} • {l.date}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{l.hours}</p>
                    <p style={{ fontSize: "12px", color: "#6b7280" }}>{l.value}</p>
                  </div>
                  <span style={{ backgroundColor: "#d1fae5", color: "#059669", fontSize: "11px", padding: "3px 10px", borderRadius: "999px", fontWeight: 500 }}>Faturável</span>
                </div>
              </div>
            )) : faturas.length === 0 ? (
              <div style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "48px", textAlign: "center" }}>
                <FileText size={32} color="#d1d5db" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontSize: "14px", color: "#9ca3af" }}>Nenhuma fatura gerada ainda</p>
                <button onClick={() => setModalFatura(true)} style={{ marginTop: "12px", padding: "8px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "linear-gradient(135deg, #C9A84C, #9a7a32)", color: "white", border: "none", cursor: "pointer" }}>
                  Gerar primeira fatura
                </button>
              </div>
            ) : faturas.map((f: any, i: number) => (
              <div key={i} style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#fefce8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FileText size={16} color="#f59e0b" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{f.num} — {f.client}</p>
                    <p style={{ fontSize: "12px", color: "#6b7280" }}>{f.process} • Vence: {f.due}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>{formatCurrency(f.value)}</p>
                  <span style={{ backgroundColor: "#fef3c7", color: "#d97706", fontSize: "11px", padding: "3px 10px", borderRadius: "999px", fontWeight: 500 }}>{f.status}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>

      {/* Modal Lançar Horas */}
      {modalHoras && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          onClick={e => { if (e.target === e.currentTarget) setModalHoras(false) }}
        >
          <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "480px", boxShadow: "0 24px 60px rgba(0,0,0,0.15)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Clock size={18} color="#3b82f6" />
                </div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Lançar Horas</h2>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Registre horas trabalhadas</p>
                </div>
              </div>
              <button onClick={() => setModalHoras(false)} style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={15} color="#6b7280" />
              </button>
            </div>

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <Field label="Descrição da Atividade *">
                <input style={inputStyle} placeholder="Ex: Elaboração de recurso" value={formHoras.title} onChange={e => setH("title", e.target.value)} />
              </Field>
              <Field label="Processo *">
                <input style={inputStyle} placeholder="Ex: Ação de Indenização" value={formHoras.process} onChange={e => setH("process", e.target.value)} />
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <Field label="Horas *">
                  <input type="number" step="0.5" min="0.5" style={inputStyle} placeholder="Ex: 2.5" value={formHoras.hours} onChange={e => setH("hours", e.target.value)} />
                </Field>
                <Field label="R$/hora">
                  <input type="number" style={inputStyle} placeholder="350" value={formHoras.rate} onChange={e => setH("rate", e.target.value)} />
                </Field>
                <Field label="Data *">
                  <input type="date" style={inputStyle} value={formHoras.date} onChange={e => setH("date", e.target.value)} />
                </Field>
              </div>

              {/* Preview valor */}
              {previewValue > 0 && (
                <div style={{ padding: "12px 16px", borderRadius: "10px", background: "#f0fdf4", border: "1px solid #86efac", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#15803d", fontWeight: 500 }}>Valor do lançamento</span>
                  <span style={{ fontSize: "18px", fontWeight: 700, color: "#15803d" }}>{formatCurrency(previewValue)}</span>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input type="checkbox" checked={formHoras.billable} onChange={e => setH("billable", e.target.checked)} style={{ width: "16px", height: "16px", accentColor: "#10b981", cursor: "pointer" }} />
                <span style={{ fontSize: "13px", color: "#374151" }}>Marcar como faturável</span>
              </div>
            </div>

            <div style={{ padding: "16px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setModalHoras(false)} style={{ padding: "10px 20px", borderRadius: "9px", fontSize: "13px", fontWeight: 500, background: "#f3f4f6", border: "none", cursor: "pointer", color: "#374151" }}>Cancelar</button>
              <button onClick={handleSaveHoras} disabled={saving || !formHoras.title || !formHoras.process || !formHoras.hours || !formHoras.date} style={{
                padding: "10px 24px", borderRadius: "9px", fontSize: "13px", fontWeight: 600,
                background: saving || !formHoras.title || !formHoras.process || !formHoras.hours || !formHoras.date ? "#e5e7eb" : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                border: "none", cursor: "pointer", color: saving || !formHoras.title || !formHoras.process || !formHoras.hours || !formHoras.date ? "#9ca3af" : "white",
                transition: "all 0.2s",
              }}>
                {saving ? "Salvando..." : "Lançar Horas"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Gerar Fatura */}
      {modalFatura && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          onClick={e => { if (e.target === e.currentTarget) setModalFatura(false) }}
        >
          <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "480px", boxShadow: "0 24px 60px rgba(0,0,0,0.15)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#fefce8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FileText size={18} color="#f59e0b" />
                </div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Gerar Fatura</h2>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Crie uma fatura para o cliente</p>
                </div>
              </div>
              <button onClick={() => setModalFatura(false)} style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={15} color="#6b7280" />
              </button>
            </div>

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <Field label="Cliente *">
                <input style={inputStyle} placeholder="Ex: Maria Oliveira Silva" value={formFatura.client} onChange={e => setF("client", e.target.value)} />
              </Field>
              <Field label="Processo *">
                <input style={inputStyle} placeholder="Ex: Ação de Indenização" value={formFatura.process} onChange={e => setF("process", e.target.value)} />
              </Field>
              <Field label="Vencimento *">
                <input type="date" style={inputStyle} value={formFatura.dueDate} onChange={e => setF("dueDate", e.target.value)} />
              </Field>
              <Field label="Observações">
                <textarea style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }} placeholder="Detalhes da fatura..." value={formFatura.notes} onChange={e => setF("notes", e.target.value)} />
              </Field>

              {/* Valor a faturar */}
              <div style={{ padding: "14px 16px", borderRadius: "10px", background: "linear-gradient(135deg, #fffbeb, #fefce8)", border: "1px solid #fde68a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "12px", color: "#92400e", fontWeight: 500, margin: "0 0 2px" }}>Valor da fatura</p>
                  <p style={{ fontSize: "11px", color: "#b45309", margin: 0 }}>Baseado nos lançamentos pendentes</p>
                </div>
                <span style={{ fontSize: "20px", fontWeight: 700, color: "#92400e" }}>{formatCurrency(totalReceita - totalFaturado)}</span>
              </div>
            </div>

            <div style={{ padding: "16px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setModalFatura(false)} style={{ padding: "10px 20px", borderRadius: "9px", fontSize: "13px", fontWeight: 500, background: "#f3f4f6", border: "none", cursor: "pointer", color: "#374151" }}>Cancelar</button>
              <button onClick={handleSaveFatura} disabled={saving || !formFatura.client || !formFatura.process || !formFatura.dueDate} style={{
                padding: "10px 24px", borderRadius: "9px", fontSize: "13px", fontWeight: 600,
                background: saving || !formFatura.client || !formFatura.process || !formFatura.dueDate ? "#e5e7eb" : "linear-gradient(135deg, #C9A84C, #9a7a32)",
                border: "none", cursor: "pointer",
                color: saving || !formFatura.client || !formFatura.process || !formFatura.dueDate ? "#9ca3af" : "white",
                boxShadow: "0 4px 12px rgba(201,168,76,0.25)", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                {saving ? "Gerando..." : <><CheckCircle size={14} /> Gerar Fatura</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}