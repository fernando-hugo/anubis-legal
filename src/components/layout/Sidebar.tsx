"use client"

import {
  LayoutDashboard, Briefcase, CalendarClock, FileText,
  Users, BarChart3, DollarSign, LogOut, ChevronRight, Menu, X,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signOut } from "next-auth/react"

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Processos", icon: Briefcase, href: "/processos" },
  { title: "Prazos", icon: CalendarClock, href: "/prazos", badge: 3 },
  { title: "Documentos", icon: FileText, href: "/documentos" },
  { title: "Financeiro", icon: DollarSign, href: "/financeiro" },
  { title: "Clientes", icon: Users, href: "/clientes" },
  { title: "Analytics", icon: BarChart3, href: "/analytics" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Fechar ao navegar no mobile
  function navigate(href: string) {
    router.push(href)
    setMobileOpen(false)
  }

  const sidebarContent = (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        .nav-btn { transition: all 0.18s cubic-bezier(0.4,0,0.2,1); }
        .nav-btn:hover:not(.active) {
          background: rgba(201,168,76,0.08) !important;
          color: #C9A84C !important;
        }
        .nav-btn.active {
          background: linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08)) !important;
          color: #C9A84C !important;
          border: 1px solid rgba(201,168,76,0.25) !important;
        }
        .logout-btn:hover {
          background: rgba(255,255,255,0.05) !important;
          color: #fff !important;
        }
      `}</style>

      {/* Subtle gold glow top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "200px",
        background: "radial-gradient(ellipse at 50% -20%, rgba(201,168,76,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{
        padding: "20px 20px 16px",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
        display: "flex", flexDirection: "column", alignItems: "center",
        position: "relative",
      }}>
        {/* Close button mobile */}
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} style={{
            position: "absolute", top: "16px", right: "16px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px", width: "32px", height: "32px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "rgba(255,255,255,0.5)",
          }}>
            <X size={16} />
          </button>
        )}

        <div style={{
          width: "160px", height: "90px", borderRadius: "16px",
          overflow: "hidden", marginBottom: "10px",
          boxShadow: "0 0 32px rgba(201,168,76,0.3), 0 0 12px rgba(59,142,234,0.15)",
          border: "1px solid rgba(201,168,76,0.2)",
        }}>
          <Image src="/logo-anubis.jpeg" alt="Anubis Tech" width={160} height={90}
            style={{ objectFit: "cover", objectPosition: "center", width: "100%", height: "100%" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "15px", fontWeight: 700, letterSpacing: "2px",
            background: "linear-gradient(135deg, #C9A84C, #E8C96A, #C9A84C)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            textTransform: "uppercase",
          }}>Anubis Tech</div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "1.5px", marginTop: "2px", textTransform: "uppercase" }}>Legal OS</div>
        </div>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
        <div style={{
          fontSize: "9px", fontWeight: 600, color: "rgba(201,168,76,0.35)",
          letterSpacing: "1.5px", padding: "0 12px", marginBottom: "8px", marginTop: "4px",
        }}>NAVEGAÇÃO</div>

        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <button key={item.title} onClick={() => navigate(item.href)}
              className={`nav-btn ${isActive ? "active" : ""}`}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "10px 12px", borderRadius: "9px",
                fontSize: "13px", fontWeight: isActive ? 500 : 400,
                border: "1px solid transparent", cursor: "pointer",
                background: "transparent",
                color: isActive ? "#C9A84C" : "rgba(255,255,255,0.4)",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon size={16} strokeWidth={isActive ? 2 : 1.75} />
                {item.title}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {item.badge && (
                  <span style={{
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    color: "white", fontSize: "10px", borderRadius: "999px",
                    minWidth: "18px", height: "18px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, padding: "0 4px",
                    boxShadow: "0 2px 6px rgba(239,68,68,0.4)",
                  }}>{item.badge}</span>
                )}
                {isActive && <ChevronRight size={12} strokeWidth={2.5} />}
              </div>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <button className="logout-btn"
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            display: "flex", alignItems: "center", gap: "10px",
            width: "100%", padding: "10px 12px", borderRadius: "9px",
            fontSize: "13px", border: "none", cursor: "pointer",
            background: "transparent", color: "rgba(255,255,255,0.25)",
            transition: "all 0.18s",
          }}
        >
          <LogOut size={15} strokeWidth={1.75} />
          Sair da conta
        </button>
      </div>
    </>
  )

  // DESKTOP
  if (!isMobile) {
    return (
      <aside style={{
        width: "280px", minWidth: "280px",
        background: "linear-gradient(180deg, #050508 0%, #0a0a10 50%, #070709 100%)",
        minHeight: "100vh", display: "flex", flexDirection: "column",
        borderRight: "1px solid rgba(201,168,76,0.12)",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
      }}>
        {sidebarContent}
      </aside>
    )
  }

  // MOBILE — botão hamburguer + drawer
  return (
    <>
      {/* Botão hamburguer fixo */}
      <button
        onClick={() => setMobileOpen(true)}
        style={{
          position: "fixed", top: "12px", left: "16px", zIndex: 100,
          width: "40px", height: "40px", borderRadius: "10px",
          background: "linear-gradient(135deg, #050508, #0a0a10)",
          border: "1px solid rgba(201,168,76,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        <Menu size={18} color="#C9A84C" />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 90,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* Drawer */}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 95,
        width: "280px",
        background: "linear-gradient(180deg, #050508 0%, #0a0a10 50%, #070709 100%)",
        display: "flex", flexDirection: "column",
        borderRight: "1px solid rgba(201,168,76,0.12)",
        fontFamily: "'DM Sans', sans-serif",
        transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        overflowY: "auto",
      }}>
        {sidebarContent}
      </aside>
    </>
  )
}