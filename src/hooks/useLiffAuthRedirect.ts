import { useEffect } from 'react'
import liff from '@line/liff'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'

export const useLiffAuthRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    const initLiff = async () => {
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })

      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href })
        return
      }

      const profile = await liff.getProfile()
      const userId = profile.userId

      console.log('✅ LIFF Login User ID:', userId)

      // Supabaseからユーザー情報を取得
      const { data: user, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single()

      if (error || !user) {
        console.error('❌ ユーザー情報取得エラー', error)
        return
      }

      console.log('✅ User Role:', user.role)

      // roleに応じてリダイレクト
      if (user.role === 'admin') {
        router.push('/')
      } else {
        router.push('/schedule')
      }
    }

    initLiff()
  }, [router])
}
