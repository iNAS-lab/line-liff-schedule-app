// pages/events/[id].tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AttendanceButtons } from '@/components/AttendanceButtons'
import { useLiffProfile } from '@/hooks/useLiffProfile'

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
    if (!id || typeof id !== 'string') return

    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`)
        const json = await res.json()
        setEvent(json)
      } catch (err) {
        console.error('❌ イベント取得エラー:', err)
      }
    }

    fetchEvent()
  }, [id])

  if (!id) return <div>URLパラメータが不正です</div>
  if (!event) return <div>イベント情報を読み込み中...</div>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">{event.title}</h1>
      <p>📅 {event.date}</p>
      <p className="mb-4">{event.description}</p>
      {userId && <AttendanceButtons eventId={event.id} userId={userId} />}
    </div>
  )
}
