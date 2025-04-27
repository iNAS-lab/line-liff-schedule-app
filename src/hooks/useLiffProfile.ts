import { useEffect, useState } from 'react'
import liff from '@line/liff'

export const useLiffProfile = () => {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const initLiff = async () => {
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })

      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href }) // ← ここで「今のページ」に戻す
      } else {
        const profile = await liff.getProfile()
        setUserId(profile.userId)
      }
    }

    initLiff()
  }, [])

  return userId
}
