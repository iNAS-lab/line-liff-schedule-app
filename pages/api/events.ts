// pages/api/events.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔥 Event API hit!') // 呼び出しログ

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  if (error) {
    console.error('❌ events.ts Supabase Error:', error)
    res.status(500).json({ error: error.message })
  } else {
    console.log('📦 Supabase Events:', data)
    res.status(200).json(data)
  }
}
