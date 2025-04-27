// pages/events/[id].tsx
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useLiffProfile } from '@/hooks/useLiffProfile'
import { AttendanceButtons } from '@/components/AttendanceButtons'

type Event = {
  id: string
  title: string
  description: string
  date: string
}

export default function EventDetailPage({ event }: { event: Event }) {
  const router = useRouter()
  const userId = useLiffProfile()

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">イベント詳細</h1>

      {/* 戻るボタン */}
      <button
        className="mb-4 px-4 py-2 bg-gray-300 rounded"
        onClick={() => router.back()}
      >
        ← 戻る
      </button>

      <p>📅 {event.date}</p>
      <p>📝 {event.title}</p>
      <p>{event.description}</p>

      {userId && <AttendanceButtons eventId={event.id} userId={userId} />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const eventId = context.params?.id as string

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${eventId}`)
  const event = await res.json()

  return {
    props: {
      event,
    },
  }
}
