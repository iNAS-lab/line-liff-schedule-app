// pages/events/[id].tsx
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { AttendanceButtons } from '@/components/AttendanceButtons'
import { useLiffProfile } from '@/hooks/useLiffProfile'

export default function EventDetailPage({ eventId }: { eventId: string }) {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const getProfile = async () => {
      const id = await useLiffProfile()
      setUserId(id)
    }
    getProfile()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">イベント詳細</h1>
      {userId && <AttendanceButtons eventId={eventId} userId={userId} />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const eventId = context.params?.id as string

  return {
    props: {
      eventId,
    },
  }
}
