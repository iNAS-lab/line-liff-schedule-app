// src/lib/liff.ts
import liff from '@line/liff'

export const initLiff = async () => {
  try {
    await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || '' })
    console.log('LIFF初期化成功')
    if (!liff.isLoggedIn()) {
      liff.login()
    }
  } catch (error) {
    console.error('LIFF初期化エラー:', error)
  }
}
