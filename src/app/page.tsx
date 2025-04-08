'use client'

import { useEffect } from 'react'
import liff from '@line/liff'

export default function Home() {
  useEffect(() => {
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
      .then(() => {
        console.log('✅ LIFF initialized')
      })
      .catch((err) => {
        console.error('❌ LIFF init error', err)
      })
  }, [])

  return (
    <main>
      <h1>ようこそ！LINEミニアプリ スケジュール管理へ</h1>
      {/* 今後：予定の一覧、出欠ボタンなどを追加 */}
    </main>
  )
}
