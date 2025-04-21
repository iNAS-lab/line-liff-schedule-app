// pages/api/attendances.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { event_id, user_id, status } = req.body

    const { data, error } = await supabase
      .from('attendances')
      .insert([{ event_id, user_id, status }])

    if (error) {
      console.error('❌ Supabase Error (POST):', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  }

  // 🔽 ここから GET 処理を追加
  if (req.method === 'GET') {
    const { event_id } = req.query

    const { data, error } = await supabase
      .from('attendances')
      .select('*, users(name)')
      .eq('event_id', event_id)

    if (error) {
      console.error('❌ Supabase Error (GET):', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
