'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Event = {
  id: string
  title: string
  description: string
  date: string
}

export default function EventsListPage() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (error) {
        console.error('取得エラー:', error)
      } else {
        setEvents(data)
      }
    }

    fetchEvents()
  }, [])

  return (
    <main>
      <h1>イベント一覧</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{new Date(event.date).toLocaleString()}</strong> - {event.title}
            <br />
            <small>{event.description}</small>
          </li>
        ))}
      </ul>
    </main>
  )
}
