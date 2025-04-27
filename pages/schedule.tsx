// pages/schedule.tsx
import { useEffect, useState } from 'react'
import liff from '@line/liff'
import { useRouter } from 'next/router'

type Event = {
  id: string
  title: string
  description: string
  date: string
  status?: '参加' | '不参加' | '保留' | '未回答'
}

export default function SchedulePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const initLiff = async () => {
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
      if (!liff.isLoggedIn()) {
        liff.login()
      } else {
        const profile = await liff.getProfile()
        setUserId(profile.userId)
      }
    }
    initLiff()
  }, [])

  useEffect(() => {
    if (!userId) return
    const fetchEvents = async () => {
      const res = await fetch('/api/schedule?userId=' + userId)
      const data = await res.json()
      setEvents(data)
    }
    fetchEvents()
  }, [userId])

  if (!userId) return <div>ログイン確認中...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">イベント一覧</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="p-4 border rounded cursor-pointer"
            onClick={() => router.push(`/events/${event.id}`)}
          >
            <div>📅 {event.date}</div>
            <div>📝 {event.title}</div>
            <div>🙋 出欠: {event.status ?? '未回答'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
