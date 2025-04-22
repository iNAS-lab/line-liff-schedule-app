// pages/api/attend.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { eventId, userId, status } = req.body

  if (!eventId || !userId || !status) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  console.log('📝 出欠登録:', { eventId, userId, status })

  const { data, error } = await supabase
    .from('attendances')
    .upsert(
      [
        {
          event_id: eventId,
          user_id: userId,
          status,
          updated_at: new Date().toISOString(),
        },
      ],
      {
        onConflict: 'event_id,user_id', // ✅ カンマ区切りで指定（string 型にする）
      }
    )

  if (error) {
    console.error('❌ Supabase Error:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }

  res.status(200).json({ message: '出欠登録成功', data })
}
