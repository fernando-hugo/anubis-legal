import type { Metadata } from "next"
import Providers from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Anubis Legal",
  description: "Sistema de gestão jurídica",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
    other: [
      { rel: "icon", url: "/icon-512.png", sizes: "512x512" },
    ],
  },
  themeColor: "#C9A84C",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Anubis Legal",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
