import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 🔥 APIが呼び出されたことを示すログ（確実に出力される）
  console.log('🔥 Event API hit!')

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true }) // ← 日付順に並び替え

  // 📦 Supabase から取得したイベント一覧
  console.log('📦 Supabase Events:', data)

  if (error) {
    console.error('❌ Supabase Error:', error)
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json(data)
  }
}
