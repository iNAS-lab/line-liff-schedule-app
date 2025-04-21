// pages/attendance.tsx
import { useState } from 'react'

export default function AttendanceForm() {
  const [eventId, setEventId] = useState('')
  const [userId, setUserId] = useState('')
  const [status, setStatus] = useState('保留')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    const res = await fetch('/api/attendances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_id: eventId,
        user_id: userId,
        status,
      }),
    })

    const result = await res.json()
    if (res.ok) {
      setMessage('✅ 出欠を登録しました！')
    } else {
      setMessage(`❌ エラー: ${result.error}`)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📝 出欠登録フォーム</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">イベントID</label>
          <input
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">ユーザーID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">出欠ステータス</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="参加">参加</option>
            <option value="不参加">不参加</option>
            <option value="保留">保留</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          登録
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}
