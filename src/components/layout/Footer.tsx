"use client"

import { Instagram, Mail, Phone, Shield, FileText, Lock } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <>
      <div style={{ height: "52px" }} />

      <footer style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
        height: "52px",
        background: "rgba(5,5,8,0.80)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        display: "flex", alignItems: "center",
        padding: "0 32px",
      }}>
        <div style={{
          maxWidth: "1200px", width: "100%", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "12px",
        }}>

          {/* Left */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "rgba(201,168,76,0.8)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Anubis Tech
            </span>
            <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
              CNPJ: 42.804.763/0001-35
            </span>
            <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.1)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Lock size={11} color="rgba(201,168,76,0.6)" />
              <span style={{ fontSize: "11px", color: "rgba(201,168,76,0.5)", fontWeight: 500 }}>SSL</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Shield size={11} color="rgba(201,168,76,0.6)" />
              <span style={{ fontSize: "11px", color: "rgba(201,168,76,0.5)", fontWeight: 500 }}>LGPD</span>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <a href="https://www.instagram.com/anubis.tec?igsh=MTZyajRydWdzZTdmNg==" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(201,168,76,0.8)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              <Instagram size={12} /> @anubis.tec
            </a>
            <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.1)" }} />
            <a href="mailto:fernandohugoferreira@gmail.com"
              style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(201,168,76,0.8)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              <Mail size={12} /> fernandohugoferreira@gmail.com
            </a>
            <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.1)" }} />
            <a href="tel:+5511962104871"
              style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(201,168,76,0.8)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              <Phone size={12} /> (11) 96210-4871
            </a>
            <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.1)" }} />
            <Link href="/privacidade"
              style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "rgba(255,255,255,0.2)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(201,168,76,0.6)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
            >
              <FileText size={11} /> Privacidade
            </Link>
            <Link href="/termos"
              style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "rgba(255,255,255,0.2)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(201,168,76,0.6)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
            >
              <FileText size={11} /> Termos
            </Link>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.15)" }}>
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}