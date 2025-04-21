// pages/attendances.tsx
import { useEffect, useState } from 'react'

type Attendance = {
  id: string
  status: string
  updated_at: string
  user: {
    name: string
  }
  event: {
    title: string
  }
}

export default function AttendanceList() {
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAttendances = async () => {
      const res = await fetch('/api/attendances')
      const data = await res.json()

      if (res.ok) {
        setAttendances(data)
      } else {
        setError(data.error || '読み込みエラー')
      }
    }

    fetchAttendances()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📋 出欠一覧</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="space-y-4">
        {attendances.map((a) => (
          <li key={a.id} className="border p-4 rounded">
            <h2 className="font-semibold text-lg">📅 {a.event.title}</h2>
            <p>🙋‍♂️ {a.user.name}</p>
            <p>✅ ステータス: {a.status}</p>
            <p className="text-sm text-gray-500">🕒 更新: {new Date(a.updated_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
