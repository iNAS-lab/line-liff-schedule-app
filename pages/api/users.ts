// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')  // ← これ追加！
  res.status(200).json({ message: 'API is working 🎉' })
}
