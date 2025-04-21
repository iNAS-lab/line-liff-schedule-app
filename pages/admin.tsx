// pages/admin.tsx
import { useState } from 'react'

export default function AdminPage() {
  const [isSending, setIsSending] = useState(false)

  const handleNotify = async () => {
    setIsSending(true)

    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'Uxxxxxxxxxxxx', // LINEのユーザーID（仮）
        message: '📅 出欠確認のお願いです！',
      }),
    })

    const result = await res.json()
    console.log('✅ 通知結果:', result)

    setIsSending(false)
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">管理者メニュー</h1>

      <button
        onClick={handleNotify}
        disabled={isSending}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {isSending ? '送信中...' : '保留ユーザーに通知'}
      </button>
    </div>
  )
}
