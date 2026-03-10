"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, Search, LogOut, Scale, Users, Clock, FileText, X } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const allData = [
  { type: "Processo", title: "Ação de Indenização por Danos Morais", sub: "Maria Oliveira Silva", href: "/processos", icon: Scale, color: "#3b82f6", bg: "#eff6ff" },
  { type: "Processo", title: "Reclamatória Trabalhista", sub: "João Carlos Mendes", href: "/processos", icon: Scale, color: "#3b82f6", bg: "#eff6ff" },
  { type: "Processo", title: "Execução Fiscal - ICMS", sub: "TechBrasil Ltda", href: "/processos", icon: Scale, color: "#3b82f6", bg: "#eff6ff" },
  { type: "Processo", title: "Ação de Divórcio Litigioso", sub: "Ana Paula Ferreira", href: "/processos", icon: Scale, color: "#3b82f6", bg: "#eff6ff" },
  { type: "Processo", title: "Defesa Criminal - Estelionato", sub: "João Carlos Mendes", href: "/processos", icon: Scale, color: "#3b82f6", bg: "#eff6ff" },
  { type: "Cliente", title: "Maria Oliveira Silva", sub: "CPF: 123.456.789-00", href: "/clientes", icon: Users, color: "#10b981", bg: "#f0fdf4" },
  { type: "Cliente", title: "TechBrasil Ltda", sub: "CNPJ: 12.345.678/0001-90", href: "/clientes", icon: Users, color: "#10b981", bg: "#f0fdf4" },
  { type: "Cliente", title: "João Carlos Mendes", sub: "CPF: 987.654.321-00", href: "/clientes", icon: Users, color: "#10b981", bg: "#f0fdf4" },
  { type: "Cliente", title: "Ana Paula Ferreira", sub: "CPF: 456.789.123-00", href: "/clientes", icon: Users, color: "#10b981", bg: "#f0fdf4" },
  { type: "Prazo", title: "Réplica à Contestação", sub: "Vence Hoje", href: "/prazos", icon: Clock, color: "#ef4444", bg: "#fee2e2" },
  { type: "Prazo", title: "Audiência de Conciliação", sub: "Vence em 5 dias", href: "/prazos", icon: Clock, color: "#f59e0b", bg: "#fef3c7" },
  { type: "Documento", title: "Petição Inicial - Indenização", sub: "Finalizado", href: "/documentos", icon: FileText, color: "#9333ea", bg: "#f3e8ff" },
  { type: "Documento", title: "Recurso de Apelação - ICMS", sub: "Em Revisão", href: "/documentos", icon: FileText, color: "#9333ea", bg: "#f3e8ff" },
]

const typeColors: Record<string, { color: string; bg: string }> = {
  Processo:  { color: "#3b82f6", bg: "#eff6ff" },
  Cliente:   { color: "#10b981", bg: "#f0fdf4" },
  Prazo:     { color: "#ef4444", bg: "#fee2e2" },
  Documento: { color: "#9333ea", bg: "#f3e8ff" },
}

export default function Topbar() {
  const { data: session } = useSession()
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const results = query.trim().length >= 1
    ? allData.filter(d =>
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.sub.toLowerCase().includes(query.toLowerCase()) ||
        d.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Atalho ⌘K / Ctrl+K
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (e.key === "Escape") { setOpen(false); setQuery("") }
      if (e.key === "ArrowDown") setSelected(s => Math.min(s + 1, results.length - 1))
      if (e.key === "ArrowUp") setSelected(s => Math.max(s - 1, 0))
      if (e.key === "Enter" && selected >= 0 && results[selected]) {
        router.push(results[selected].href)
        setOpen(false); setQuery("")
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [results, selected])

  function handleSelect(item: typeof allData[0]) {
    router.push(item.href)
    setOpen(false)
    setQuery("")
  }

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : "AF"

  const role = session?.user?.role === "admin" ? "Administrador" :
               session?.user?.role === "lawyer" ? "Advogado" : "Assistente"

  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "60px", padding: "0 32px",
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      position: "sticky", top: 0, zIndex: 50,
    }}>

      {/* Search */}
      <div style={{ position: "relative" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          background: open ? "white" : "#F4F4F6",
          borderRadius: "10px", padding: "8px 14px", width: "320px",
          border: open ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(0,0,0,0.06)",
          boxShadow: open ? "0 0 0 3px rgba(201,168,76,0.1)" : "none",
          transition: "all 0.2s",
        }}>
          <Search size={14} color={open ? "#C9A84C" : "#9ca3af"} strokeWidth={2} />
          <input
            ref={inputRef}
            placeholder="Buscar processos, clientes..."
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); setSelected(-1) }}
            onFocus={() => setOpen(true)}
            style={{
              border: "none", outline: "none", background: "transparent",
              fontSize: "13px", color: "#374151", width: "100%", fontFamily: "inherit",
            }}
          />
          {query ? (
            <button onClick={() => { setQuery(""); setOpen(false) }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
              <X size={13} color="#9ca3af" />
            </button>
          ) : (
            <span style={{ fontSize: "11px", color: "#c4c4c8", background: "#ebebed", padding: "2px 6px", borderRadius: "4px", fontWeight: 500, whiteSpace: "nowrap" }}>⌘K</span>
          )}
        </div>

        {/* Dropdown */}
        {open && results.length > 0 && (
          <div ref={dropdownRef} style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0, width: "380px",
            background: "white", borderRadius: "14px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.06)",
            overflow: "hidden", zIndex: 100,
          }}>
            <div style={{ padding: "8px 12px 4px", borderBottom: "1px solid #f3f4f6" }}>
              <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500 }}>{results.length} resultado{results.length !== 1 ? "s" : ""}</span>
            </div>
            {results.map((item, i) => {
              const Icon = item.icon
              const tc = typeColors[item.type]
              return (
                <div key={i}
                  onClick={() => handleSelect(item)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "10px 14px", cursor: "pointer",
                    background: selected === i ? "#fafafa" : "white",
                    borderBottom: i < results.length - 1 ? "1px solid #f9fafb" : "none",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#fafafa"; setSelected(i) }}
                  onMouseLeave={e => { e.currentTarget.style.background = selected === i ? "#fafafa" : "white" }}
                >
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={15} color={item.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</p>
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{item.sub}</p>
                  </div>
                  <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "999px", background: tc.bg, color: tc.color, flexShrink: 0 }}>
                    {item.type}
                  </span>
                </div>
              )
            })}
            <div style={{ padding: "8px 14px", borderTop: "1px solid #f3f4f6", background: "#fafafa" }}>
              <span style={{ fontSize: "11px", color: "#9ca3af" }}>↑↓ navegar · Enter selecionar · Esc fechar</span>
            </div>
          </div>
        )}

        {/* Empty state */}
        {open && query.trim().length >= 1 && results.length === 0 && (
          <div ref={dropdownRef} style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0, width: "380px",
            background: "white", borderRadius: "14px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.06)",
            padding: "24px", textAlign: "center", zIndex: 100,
          }}>
            <Search size={24} color="#d1d5db" style={{ margin: "0 auto 8px" }} />
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>Nenhum resultado para "<strong>{query}</strong>"</p>
          </div>
        )}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={16} color="#6b7280" strokeWidth={1.75} />
          </div>
          <span style={{ position: "absolute", top: "-4px", right: "-4px", background: "#ef4444", color: "white", fontSize: "9px", borderRadius: "999px", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, border: "2px solid white" }}>3</span>
        </div>

        <div style={{ width: "1px", height: "24px", background: "#e5e7eb" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #C9A84C, #9a7a32)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "white", boxShadow: "0 2px 8px rgba(201,168,76,0.35)" }}>{initials}</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827", lineHeight: 1.2 }}>{session?.user?.name ?? "Dr. Advogado"}</div>
            <div style={{ fontSize: "11px", color: "#9ca3af" }}>{role}</div>
          </div>
        </div>

        <div style={{ width: "1px", height: "24px", background: "#e5e7eb" }} />

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          title="Sair"
          style={{ width: "36px", height: "36px", borderRadius: "9px", background: "#FEF2F2", border: "1px solid rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#FEE2E2"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.3)" }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#FEF2F2"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.15)" }}
        >
          <LogOut size={15} color="#ef4444" strokeWidth={2} />
        </button>
      </div>
    </header>
  )
}