// pages/index.tsx
import { useEffect, useState } from 'react'

type Event = {
  id: number
  title: string
  date: string
}

export default function Home() {
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
    <div style={{ padding: '1rem' }}>
      <h1>イベント一覧</h1>
      {events.length === 0 ? (
        <p>イベントがまだありません。</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              📅 {event.date} | 📝 {event.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
