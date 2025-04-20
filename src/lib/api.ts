// lib/api.ts（新規作成してもOK）
export async function fetchEvents() {
    const res = await fetch('/api/events')
    if (!res.ok) throw new Error('イベント取得に失敗しました')
    return await res.json()
  }
  