'use client'

import { useEffect } from 'react'
import { initLiff } from '@/lib/liff'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  useEffect(() => {
    initLiff()
  
    const fetchTest = async () => {
      const { data, error } = await supabase.from('users').select('*')
      if (error) {
        console.error('Supabase接続エラー', error)
      } else {
        console.log('Supabase接続成功', data)
      }
    }
  
    fetchTest()
  }, [])
  

  return (
    <main>
      <h1>ようこそ！LINEミニアプリ スケジュール管理へ</h1>
    </main>
  )
}
