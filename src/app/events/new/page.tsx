'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function NewEventPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const user_id = '11111111-1111-1111-1111-111111111111' // ※仮：ログイン中のユーザーIDを使用してください

    const { error } = await supabase.from('events').insert([
      {
        title,
        description,
        date,
        created_by: user_id,
      },
    ])

    if (error) {
      alert('作成に失敗しました：' + error.message)
    } else {
      alert('予定を作成しました！')
      router.push('/events') // 予定一覧へ移動
    }
  }

  return (
    <main>
      <h1>新しい予定を作成</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル：</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>説明：</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>日付と時間：</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">作成</button>
      </form>
    </main>
  )
}
