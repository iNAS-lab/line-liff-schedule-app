// pages/schedule.tsx
import { useEffect, useState } from 'react'
import { fetchEvents } from '@/lib/api'

type Event = {
  id: string
  title: string
  description: string
  date: string
}

export default function SchedulePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEvents()
        setEvents(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p>読み込み中...</p>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📅 スケジュール一覧</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">📆 {new Date(event.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
