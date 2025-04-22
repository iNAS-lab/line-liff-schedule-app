'use client'

import { useEffect, useState } from 'react'
import liff from '@line/liff'

type Props = {
  eventId: string
  userId: string
}

export const AttendanceButtons = ({ eventId, userId }: Props) => {
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const initializeLiff = async () => {
      if (typeof window !== 'undefined' && liff && !liff.isInClient()) {
        try {
          await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || '' })
        } catch (err) {
          console.error('LIFF init failed:', err)
        }
      }
    }

    initializeLiff()
  }, [])

  const handleClick = async (newStatus: string) => {
    setStatus(newStatus)

    const res = await fetch('/api/attend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId,
        userId,
        status: newStatus,
      }),
    })

    const result = await res.json()
    console.log('✅ 登録結果:', result)
  }

  return (
    <div className="mt-4 space-x-2">
      <button onClick={() => handleClick('参加')} className="px-4 py-2 bg-green-500 text-white rounded">参加</button>
      <button onClick={() => handleClick('不参加')} className="px-4 py-2 bg-red-500 text-white rounded">不参加</button>
      <button onClick={() => handleClick('保留')} className="px-4 py-2 bg-gray-500 text-white rounded">保留</button>
      {status && <p className="mt-2">📌 現在の出欠: {status}</p>}
    </div>
  )
}
