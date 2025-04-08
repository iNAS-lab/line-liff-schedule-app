// src/app/layout.tsx
export const metadata = {
    title: 'LINE LIFF スケジュール管理',
    description: 'LINE ミニアプリでスケジュールを管理しよう',
  }
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="ja">
        <body>{children}</body>
      </html>
    )
  }
  