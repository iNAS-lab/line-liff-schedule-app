// pages/events/[id].tsx
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useLiffProfile } from '@/hooks/useLiffProfile'
import { AttendanceButtons } from '@/components/AttendanceButtons'

type Event = {
  id: string
  title: string
  description: string
  date: string
}

export default function EventDetailPage({ event }: { event: Event }) {
  const userId = useLiffProfile()

  return (
    <div className="p-4">
      <Link href="/schedule">
        <span className="text-blue-500 hover:underline">⏪ 戻る</span>
      </Link>

      <h1 className="text-xl font-bold mb-4 mt-4">イベント詳細</h1>
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
  if (!res.ok) {
    return {
      notFound: true,
    }
  }

  const event = await res.json()

  return {
    props: {
      event,
    },
  }
}
