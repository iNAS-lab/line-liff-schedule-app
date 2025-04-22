// pages/events/[id].tsx
import { GetServerSideProps } from 'next'
import { useLiffProfile } from '@/hooks/useLiffProfile'
import { AttendanceButtons } from '@/components/AttendanceButtons'

export default function EventDetailPage({ eventId }: { eventId: string }) {
  const userId = useLiffProfile()

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
