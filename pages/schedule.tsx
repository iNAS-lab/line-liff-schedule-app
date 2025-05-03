import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLiffAuthRedirect } from '@/hooks/useLiffAuthRedirect'

type Event = {
  id: string
  title: string
  date: string
}

export default function Schedule() {
  useLiffAuthRedirect()

  const [events, setEvents] = useState<Event[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events')
      const data = await res.json()
      setEvents(data)
    }
    fetchEvents()
  }, [])

  const goToDetail = (id: string) => {
    router.push(`/events/${id}`)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">イベント一覧</h1>
      {events.map((event) => (
        <div
          key={event.id}
          className="p-2 mb-2 border rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => goToDetail(event.id)}
        >
          <p>📅 {event.date}</p>
          <p>📝 {event.title}</p>
        </div>
      ))}
    </div>
  )
}
