// pages/index.tsx
import { useEffect } from 'react'
import liff from '@line/liff'

export default function HomePage() {
  useEffect(() => {
    liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! }).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login()
      } else {
        console.log('✅ LIFF ログイン済み')
        liff.getProfile().then(profile => {
          console.log('👤 ユーザー情報:', profile)
        })
      }
    })
  }, [])

  return <div className="p-4">LINEミニアプリへようこそ！</div>
}
