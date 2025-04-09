import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Interフォントを使う例（安全）
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LINEミニアプリ スケジュール管理",
  description: "Supabase連携 & 出欠管理",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
