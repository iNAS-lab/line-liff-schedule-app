import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type Event = {
  id: string
  title: string
  description: string
  date: string
}

export default function SchedulePage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events')
        const data = await res.json()
        setEvents(data)
      } catch (error) {
        console.error('❌ イベント取得エラー:', error)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">スケジュール一覧</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow" onClick={() => router.push(`/events/${event.id}`)}>
            <p>📅 {event.date}</p>
            <p>📝 {event.title}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
