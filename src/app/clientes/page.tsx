"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"
import Footer from "@/components/layout/Footer"
import { Users, Building2, Search, Plus, Mail, Phone, Pencil, X } from "lucide-react"


const initialClients = [
  { name: "Maria Oliveira Silva", type: "PF", email: "maria@email.com", phone: "(11) 99999-1234", cpfCnpj: "123.456.789-00", processes: 0, status: "Ativo" },
  { name: "TechBrasil Ltda", type: "PJ", email: "juridico@techbrasil.com.br", phone: "(11) 3456-7890", cpfCnpj: "12.345.678/0001-90", processes: 0, status: "Ativo" },
  { name: "João Carlos Mendes", type: "PF", email: "joao.mendes@email.com", phone: "(21) 98888-5678", cpfCnpj: "987.654.321-00", processes: 0, status: "Ativo" },
  { name: "Construtora Horizonte S.A.", type: "PJ", email: "legal@horizonte.com.br", phone: "(31) 3333-4444", cpfCnpj: "98.765.432/0001-10", processes: 0, status: "Ativo" },
  { name: "Ana Paula Ferreira", type: "PF", email: "ana.ferreira@email.com", phone: "(41) 97777-3456", cpfCnpj: "456.789.123-00", processes: 0, status: "Ativo" },
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

const emptyForm = { name: "", type: "PF", email: "", phone: "", cpfCnpj: "", address: "", notes: "" }

export default function ClientesPage() {
  const [clients, setClients] = useState(initialClients)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState("")

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.cpfCnpj?.includes(search)
  )

  async function handleSave() {
    if (!form.name || !form.email) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    setClients(prev => [...prev, { ...form, processes: 0, status: "Ativo" }])
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
              <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>Clientes</h1>
              <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>{filtered.length} clientes</p>
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
              <Plus size={16} /> Novo Cliente
            </button>
          </div>

          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 14px", marginBottom: "20px" }}>
            <Search size={15} color="#9ca3af" />
            <input
              placeholder="Buscar por nome, CPF/CNPJ ou email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ border: "none", outline: "none", fontSize: "14px", color: "#374151", width: "100%", backgroundColor: "transparent" }}
            />
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {filtered.map((c, i) => (
              <div key={i} style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", cursor: "pointer", transition: "box-shadow 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: c.type === "PJ" ? "#eff6ff" : "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {c.type === "PJ" ? <Building2 size={18} color="#3b82f6" /> : <Users size={18} color="#10b981" />}
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{c.name}</p>
                      <p style={{ fontSize: "11px", color: "#9ca3af" }}>{c.type} {c.cpfCnpj ? `• ${c.cpfCnpj}` : ""}</p>
                    </div>
                  </div>
                  <button style={{ border: "none", background: "none", cursor: "pointer", color: "#9ca3af" }}>
                    <Pencil size={15} />
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280" }}>
                    <Mail size={13} /> {c.email}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280" }}>
                    <Phone size={13} /> {c.phone}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #f3f4f6" }}>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>{c.processes} processos</span>
                  <span style={{ backgroundColor: "#d1fae5", color: "#059669", fontSize: "11px", padding: "2px 10px", borderRadius: "999px", fontWeight: 500 }}>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>

      {/* Modal Novo Cliente */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "520px", boxShadow: "0 24px 60px rgba(0,0,0,0.15)", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Users size={18} color="#10b981" />
                </div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Novo Cliente</h2>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Cadastre um novo cliente</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={15} color="#6b7280" />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Tipo PF/PJ */}
              <Field label="Tipo de Cliente">
                <div style={{ display: "flex", gap: "8px" }}>
                  {["PF", "PJ"].map(t => (
                    <button key={t} onClick={() => set("type", t)} style={{
                      flex: 1, padding: "10px", borderRadius: "9px", fontSize: "14px", fontWeight: 600,
                      border: form.type === t ? "2px solid #C9A84C" : "2px solid #e5e7eb",
                      background: form.type === t ? "#fffbeb" : "white",
                      color: form.type === t ? "#92400e" : "#6b7280",
                      cursor: "pointer", transition: "all 0.15s",
                    }}>
                      {t === "PF" ? "👤 Pessoa Física" : "🏢 Pessoa Jurídica"}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label={form.type === "PF" ? "Nome Completo *" : "Razão Social *"}>
                <input style={inputStyle} placeholder={form.type === "PF" ? "Ex: Maria Oliveira Silva" : "Ex: TechBrasil Ltda"} value={form.name} onChange={e => set("name", e.target.value)} />
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <Field label={form.type === "PF" ? "CPF" : "CNPJ"}>
                  <input style={inputStyle} placeholder={form.type === "PF" ? "000.000.000-00" : "00.000.000/0001-00"} value={form.cpfCnpj} onChange={e => set("cpfCnpj", e.target.value)} />
                </Field>
                <Field label="Telefone">
                  <input style={inputStyle} placeholder="(00) 00000-0000" value={form.phone} onChange={e => set("phone", e.target.value)} />
                </Field>
              </div>

              <Field label="Email *">
                <input type="email" style={inputStyle} placeholder="email@exemplo.com" value={form.email} onChange={e => set("email", e.target.value)} />
              </Field>

              <Field label="Endereço">
                <input style={inputStyle} placeholder="Rua, número, cidade - Estado" value={form.address} onChange={e => set("address", e.target.value)} />
              </Field>

              <Field label="Observações">
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} placeholder="Notas internas sobre o cliente..." value={form.notes} onChange={e => set("notes", e.target.value)} />
              </Field>
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setOpen(false)} style={{ padding: "10px 20px", borderRadius: "9px", fontSize: "13px", fontWeight: 500, background: "#f3f4f6", border: "none", cursor: "pointer", color: "#374151" }}>
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.email}
                style={{
                  padding: "10px 24px", borderRadius: "9px", fontSize: "13px", fontWeight: 600,
                  background: saving || !form.name || !form.email ? "#e5e7eb" : "linear-gradient(135deg, #C9A84C, #9a7a32)",
                  border: "none", cursor: saving ? "not-allowed" : "pointer",
                  color: saving || !form.name || !form.email ? "#9ca3af" : "white",
                  boxShadow: "0 4px 12px rgba(201,168,76,0.25)", transition: "all 0.2s",
                }}
              >
                {saving ? "Salvando..." : "Cadastrar Cliente"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}