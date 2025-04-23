// pages/api/events/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req

  // ID が無効な場合のエラーハンドリング
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid ID' })
  }

  // Supabase から特定のイベントを取得
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('❌ Supabase Error (GET /events/[id]):', error)
    return res.status(500).json({ message: 'Supabase fetch error' })
  }

  return res.status(200).json(data)
}
