"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff, LogIn, Building2 } from "lucide-react"
import Footer from "@/components/layout/Footer"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orgSlug = searchParams.get("org") ?? ""

  const [form, setForm] = useState({ email: "", password: "", slug: orgSlug })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin() {
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      slug: form.slug,
      redirect: false,
    })

    if (res?.error) {
      setError("Email, senha ou escritório inválidos.")
      setLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
        .input-field:focus { border-color: rgba(201,168,76,0.6) !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.1) !important; }
        .login-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,168,76,0.35) !important; }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>

      <div style={{
        minHeight: "100vh", display: "flex",
        background: "linear-gradient(135deg, #050508 0%, #0a0a10 50%, #070709 100%)",
      }}>

        {/* Left — branding */}
        <div style={{
          width: "45%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", padding: "60px",
          borderRight: "1px solid rgba(201,168,76,0.1)",
          position: "relative", overflow: "hidden",
        }}>
          {/* Glow effects */}
          <div style={{
            position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "10%", left: "20%",
            width: "200px", height: "200px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,142,234,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{
              width: "160px", height: "90px", borderRadius: "16px",
              overflow: "hidden", margin: "0 auto 28px",
              boxShadow: "0 0 40px rgba(201,168,76,0.3), 0 0 16px rgba(59,142,234,0.15)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}>
              <Image src="/logo-anubis.jpeg" alt="Anubis Tech" width={160} height={90}
                style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>

            <h1 style={{
              fontSize: "28px", fontWeight: 700, letterSpacing: "3px",
              background: "linear-gradient(135deg, #C9A84C, #E8C96A, #C9A84C)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              textTransform: "uppercase", marginBottom: "8px",
            }}>Anubis Tech</h1>

            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "48px" }}>
              Legal OS
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
              {[
                { emoji: "⚖️", title: "Gestão de Processos", desc: "Controle total dos seus casos" },
                { emoji: "⏰", title: "Controle de Prazos", desc: "Nunca perca um prazo importante" },
                { emoji: "💰", title: "Faturamento Automático", desc: "Horas e receitas organizadas" },
              ].map((f, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "14px 18px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,76,0.08)",
                }}>
                  <span style={{ fontSize: "22px" }}>{f.emoji}</span>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: "2px" }}>{f.title}</p>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px",
        }}>
          <div style={{ width: "100%", maxWidth: "400px" }}>

            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "8px", letterSpacing: "-0.3px" }}>
                Bem-vindo de volta
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                Entre com suas credenciais para acessar o sistema
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Slug */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>
                  ESCRITÓRIO
                </label>
                <div style={{ position: "relative" }}>
                  <Building2 size={15} color="rgba(255,255,255,0.25)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    className="input-field"
                    placeholder="slug-do-escritorio"
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value })}
                    style={{
                      width: "100%", padding: "12px 14px 12px 40px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px", fontSize: "14px",
                      color: "white", outline: "none",
                      transition: "all 0.2s",
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>
                  EMAIL
                </label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{
                    width: "100%", padding: "12px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px", fontSize: "14px",
                    color: "white", outline: "none", transition: "all 0.2s",
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>
                  SENHA
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className="input-field"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    onKeyDown={e => e.key === "Enter" && handleLogin()}
                    style={{
                      width: "100%", padding: "12px 44px 12px 14px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px", fontSize: "14px",
                      color: "white", outline: "none", transition: "all 0.2s",
                    }}
                  />
                  <button onClick={() => setShowPassword(!showPassword)} style={{
                    position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)",
                  }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{
                  padding: "12px 14px", borderRadius: "10px",
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                  fontSize: "13px", color: "#f87171",
                }}>{error}</div>
              )}

              {/* Button */}
              <button
                className="login-btn"
                onClick={handleLogin}
                disabled={loading}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  width: "100%", padding: "14px",
                  background: "linear-gradient(135deg, #C9A84C, #9a7a32)",
                  border: "none", borderRadius: "10px",
                  fontSize: "14px", fontWeight: 600, color: "white",
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: "0 4px 16px rgba(201,168,76,0.25)",
                  marginTop: "4px",
                }}
              >
                {loading ? (
                  <div style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                ) : (
                  <><LogIn size={16} /> Entrar no sistema</>
                )}
              </button>
            </div>

            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "32px" }}>
              © 2026 Anubis Tech · Legal OS
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  )
}