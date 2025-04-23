// pages/events/[id].tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLiffProfile } from '@/hooks/useLiffProfile'
import { AttendanceButtons } from '@/components/AttendanceButtons'

type Event = {
  id: string
  title: string
  description: string
  date: string
}

export default function EventDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const userId = useLiffProfile()
  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    if (!id) return
    const fetchEvent = async () => {
      const res = await fetch(`/api/events/${id}`)
      const data = await res.json()
      setEvent(data)
    }
    fetchEvent()
  }, [id])

  if (!event) return <div>読み込み中...</div>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">イベント詳細</h1>
      <p>📅 {event.date}</p>
      <p>📝 {event.title}</p>
      <p>{event.description}</p>
      {userId && <AttendanceButtons eventId={event.id} userId={userId} />}
    </div>
  )
}
