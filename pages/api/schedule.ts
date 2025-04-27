// pages/api/schedule.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string

  if (!userId) {
    return res.status(400).json({ message: 'userId が必要です' })
  }

  // イベント一覧取得
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('id, title, description, date')
    .order('date', { ascending: true })

  if (eventsError) {
    console.error('❌ イベント取得エラー:', eventsError)
    return res.status(500).json({ message: 'イベント取得失敗' })
  }

  // 出欠状況取得
  const { data: attendances, error: attendancesError } = await supabase
    .from('attendances')
    .select('event_id, status')
    .eq('user_id', userId)

  if (attendancesError) {
    console.error('❌ 出欠取得エラー:', attendancesError)
    return res.status(500).json({ message: '出欠取得失敗' })
  }

  // イベントと出欠をマージ
  const eventsWithStatus = events.map((event) => {
    const attendance = attendances.find((a) => a.event_id === event.id)
    return {
      ...event,
      status: attendance?.status || '未回答',
    }
  })

  res.status(200).json(eventsWithStatus)
}
