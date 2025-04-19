// pages/schedule.tsx
import { useEffect, useState } from 'react'

type Event = {
  id: string
  title: string
  description: string
  scheduled_date: string
}

export default function SchedulePage() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events')
      const data = await res.json()
      setEvents(data)
    }
    fetchEvents()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📅 スケジュール一覧</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">📅 {event.scheduled_date}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
