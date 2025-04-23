// pages/api/events/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid event ID' })
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('❌ Supabase Error:', error)
    return res.status(500).json({ message: error.message })
  }

  if (!data) {
    return res.status(404).json({ message: 'Event not found' })
  }

  res.status(200).json(data)
}
