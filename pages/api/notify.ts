// pages/api/notify.ts
import type { NextApiRequest, NextApiResponse } from 'next'

const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { to, message } = req.body

  const result = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      to, // LINEのユーザーID
      messages: [{ type: 'text', text: message }],
    }),
  })

  if (!result.ok) {
    const err = await result.json()
    console.error('❌ LINE送信失敗', err)
    return res.status(500).json({ error: 'LINE通知に失敗しました' })
  }

  res.status(200).json({ message: '送信しました ✅' })
}
