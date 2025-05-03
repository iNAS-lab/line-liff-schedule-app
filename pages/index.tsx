import { useLiffAuthRedirect } from '@/hooks/useLiffAuthRedirect'

export default function Home() {
  useLiffAuthRedirect()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ホーム画面（管理者用）</h1>
      <p>ここに管理者向けの機能を置きます</p>
    </div>
  )
}
