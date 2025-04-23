// pages/schedule.tsx
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Event = {
  id: string
  title: string
  description: string
  date: string
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
      <h1 className="text-xl font-bold mb-4">📅 イベント一覧</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded">
            <Link href={`/events/${event.id}`} className="block hover:underline">
              <h2 className="text-lg font-semibold">🗓 {event.date}</h2>
              <p className="text-base">📝 {event.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
