"use client"

import Sidebar from "../layout/Sidebar"
import Topbar from "../layout/Topbar"
import StatsCards from "./StatsCards"
import UrgentAlert from "./UrgentAlert"
import ActivityFeed from "./ActivityFeed"
import Deadlines from "./Deadlines"
import ProcessesChart from "./ProcessesChart"
import Footer from "@/components/layout/Footer"

export default function DashboardBase() {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        * { font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 99px; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: "#F7F8FA" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <Topbar />
          <main style={{
            padding: "28px 32px", maxWidth: "1280px", width: "100%",
            margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px",
          }}>

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingBottom: "4px" }}>
              <div>
                <p style={{
                  fontSize: "11px", fontWeight: 500, letterSpacing: "0.5px",
                  marginBottom: "4px", textTransform: "capitalize",
                  color: "#C9A84C",
                }}>{today}</p>
                <h1 style={{
                  fontSize: "26px", fontWeight: 700, color: "#0a0a0f",
                  letterSpacing: "-0.5px", lineHeight: 1,
                }}>Dashboard</h1>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", background: "white", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
                <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 500 }}>Sistema operacional</span>
              </div>
            </div>

            <UrgentAlert />
            <StatsCards />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px" }}>
              <Deadlines />
              <ActivityFeed />
            </div>

            <ProcessesChart />

          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}