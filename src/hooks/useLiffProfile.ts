// src/hooks/useLiffProfile.ts
import { useEffect, useState } from 'react'
import liff from '@line/liff'

export function useLiffProfile() {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
      if (!liff.isLoggedIn()) liff.login()

      const profile = await liff.getProfile()
      setUserId(profile.userId)
    }

    fetchProfile()
  }, [])

  return userId
}
