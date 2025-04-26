// pages/api/attendances.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('attendances')
      .select('id, status, updated_at, user:user_id(name), event:event_id(title)')
      .order('updated_at', { ascending: false })

    if (error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(200).json(data)
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
