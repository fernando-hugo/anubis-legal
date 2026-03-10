"use client"

import { useState, useRef } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"
import { FileText, Search, Upload, X, CloudUpload, CheckCircle } from "lucide-react"
import Footer from "@/components/layout/Footer"

const initialDocuments = [
  { title: "Petição Inicial - Indenização", process: "Ação de Indenização por Danos Morais", status: "Finalizado", statusColor: "#10b981", statusBg: "#d1fae5", type: "Petição Inicial", version: "v1", date: "09/03/2026", size: "245 KB" },
  { title: "Procuração Ad Judicia", process: "Reclamatória Trabalhista", status: "Aprovado", statusColor: "#10b981", statusBg: "#d1fae5", type: "Procuração", version: "v1", date: "09/03/2026", size: "128 KB" },
  { title: "Recurso de Apelação - ICMS", process: "Execução Fiscal - ICMS", status: "Em Revisão", statusColor: "#f59e0b", statusBg: "#fef3c7", type: "Recurso", version: "v2", date: "09/03/2026", size: "512 KB" },
  { title: "Contrato Social - Horizonte", process: "Ação Revisional de Contrato", status: "Aprovado", statusColor: "#10b981", statusBg: "#d1fae5", type: "Contrato", version: "v1", date: "09/03/2026", size: "380 KB" },
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

const emptyForm = { title: "", process: "", type: "Petição Inicial", status: "Rascunho" }

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

export default function DocumentosPage() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  function handleFile(f: File) {
    setFile(f)
    if (!form.title) setForm(prev => ({ ...prev, title: f.name.replace(/\.[^/.]+$/, "") }))
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  function closeModal() {
    setOpen(false)
    setForm(emptyForm)
    setFile(null)
    setUploaded(false)
  }

  async function handleSave() {
    if (!form.title || !form.process || !file) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    setUploaded(true)
    await new Promise(r => setTimeout(r, 800))
    const today = new Date().toLocaleDateString("pt-BR")
    setDocuments(prev => [...prev, {
      title: form.title, process: form.process,
      status: form.status, type: form.type,
      statusColor: form.status === "Aprovado" ? "#10b981" : form.status === "Em Revisão" ? "#f59e0b" : "#6b7280",
      statusBg: form.status === "Aprovado" ? "#d1fae5" : form.status === "Em Revisão" ? "#fef3c7" : "#f3f4f6",
      version: "v1", date: today, size: formatBytes(file.size),
    }])
    setSaving(false)
    closeModal()
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
              <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>Documentos</h1>
              <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>Gestão eletrônica de documentos</p>
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
              <Upload size={16} /> Upload
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 14px" }}>
              <Search size={15} color="#9ca3af" />
              <input placeholder="Buscar documentos..." style={{ border: "none", outline: "none", fontSize: "14px", color: "#374151", width: "100%", backgroundColor: "transparent" }} />
            </div>
            <select style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", color: "#374151", backgroundColor: "white", cursor: "pointer" }}>
              <option>Todos os Tipos</option>
              <option>Petição Inicial</option><option>Procuração</option>
              <option>Recurso</option><option>Contrato</option>
            </select>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {documents.map((d, i) => (
              <div key={i} style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", cursor: "pointer", transition: "box-shadow 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FileText size={16} color="#9333ea" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "2px" }}>{d.title}</p>
                    <p style={{ fontSize: "12px", color: "#6b7280" }}>{d.process}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <span style={{ backgroundColor: d.statusBg, color: d.statusColor, fontSize: "11px", padding: "2px 8px", borderRadius: "999px", fontWeight: 500 }}>{d.status}</span>
                  <span style={{ backgroundColor: "#f3f4f6", color: "#374151", fontSize: "11px", padding: "2px 8px", borderRadius: "999px", fontWeight: 500 }}>{d.type}</span>
                  <span style={{ backgroundColor: "#f3f4f6", color: "#374151", fontSize: "11px", padding: "2px 8px", borderRadius: "999px", fontWeight: 500 }}>{d.version}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "12px", color: "#9ca3af" }}>{d.date}</p>
                  <p style={{ fontSize: "12px", color: "#9ca3af" }}>{d.size}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>

      {/* Modal Upload */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "520px", boxShadow: "0 24px 60px rgba(0,0,0,0.15)", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Upload size={18} color="#9333ea" />
                </div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Upload de Documento</h2>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Envie e classifique o documento</p>
                </div>
              </div>
              <button onClick={closeModal} style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={15} color="#6b7280" />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                style={{
                  border: `2px dashed ${dragging ? "#C9A84C" : file ? "#10b981" : "#e5e7eb"}`,
                  borderRadius: "12px", padding: "32px 20px",
                  textAlign: "center", cursor: "pointer", transition: "all 0.2s",
                  background: dragging ? "#fffbeb" : file ? "#f0fdf4" : "#fafafa",
                }}
              >
                <input ref={fileRef} type="file" style={{ display: "none" }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} accept=".pdf,.doc,.docx,.png,.jpg" />
                {file ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <CheckCircle size={32} color="#10b981" />
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{file.name}</p>
                    <p style={{ fontSize: "12px", color: "#6b7280" }}>{formatBytes(file.size)}</p>
                    <button onClick={e => { e.stopPropagation(); setFile(null) }} style={{ fontSize: "12px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                      Remover arquivo
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <CloudUpload size={32} color={dragging ? "#C9A84C" : "#9ca3af"} />
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#374151" }}>
                      {dragging ? "Solte o arquivo aqui" : "Arraste ou clique para enviar"}
                    </p>
                    <p style={{ fontSize: "12px", color: "#9ca3af" }}>PDF, DOC, DOCX, PNG, JPG — até 10MB</p>
                  </div>
                )}
              </div>

              <Field label="Título do Documento *">
                <input style={inputStyle} placeholder="Ex: Petição Inicial - Ação de Indenização" value={form.title} onChange={e => set("title", e.target.value)} />
              </Field>

              <Field label="Processo Vinculado *">
                <input style={inputStyle} placeholder="Ex: Ação de Indenização por Danos Morais" value={form.process} onChange={e => set("process", e.target.value)} />
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <Field label="Tipo">
                  <select style={inputStyle} value={form.type} onChange={e => set("type", e.target.value)}>
                    <option>Petição Inicial</option>
                    <option>Procuração</option>
                    <option>Recurso</option>
                    <option>Contrato</option>
                    <option>Decisão Judicial</option>
                    <option>Outros</option>
                  </select>
                </Field>
                <Field label="Status">
                  <select style={inputStyle} value={form.status} onChange={e => set("status", e.target.value)}>
                    <option>Rascunho</option>
                    <option>Em Revisão</option>
                    <option>Aprovado</option>
                    <option>Finalizado</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={closeModal} style={{ padding: "10px 20px", borderRadius: "9px", fontSize: "13px", fontWeight: 500, background: "#f3f4f6", border: "none", cursor: "pointer", color: "#374151" }}>
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.process || !file}
                style={{
                  padding: "10px 24px", borderRadius: "9px", fontSize: "13px", fontWeight: 600,
                  background: saving || !form.title || !form.process || !file ? "#e5e7eb" : "linear-gradient(135deg, #C9A84C, #9a7a32)",
                  border: "none", cursor: saving ? "not-allowed" : "pointer",
                  color: saving || !form.title || !form.process || !file ? "#9ca3af" : "white",
                  boxShadow: "0 4px 12px rgba(201,168,76,0.25)", transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: "8px",
                }}
              >
                {saving ? (
                  uploaded ? <><CheckCircle size={14} /> Enviado!</> : "Enviando..."
                ) : (
                  <><Upload size={14} /> Enviar Documento</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}