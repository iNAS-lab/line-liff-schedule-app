// pages/api/events.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔥 Event API hit!')

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })

    console.log('📦 Supabase Events:', data)

    if (error) {
      console.error('❌ Supabase Error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { title, description, date, created_by } = req.body

    console.log('📝 Creating event:', { title, description, date, created_by })

    const { data, error } = await supabase
      .from('events')
      .insert([{ title, description, date, created_by }])
      .select()

    if (error) {
      console.error('❌ Supabase Error (POST):', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(201).json(data)
  }

  res.status(405).json({ error: 'Method not allowed' })
}
