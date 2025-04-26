import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">ホーム画面</h1>
      <div className="flex flex-col space-y-4">
        <button 
          className="p-3 bg-blue-500 text-white rounded"
          onClick={() => router.push('/admin')}
        >
          管理者メニュー
        </button>
        <button 
          className="p-3 bg-green-500 text-white rounded"
          onClick={() => router.push('/schedule')}
        >
          イベント一覧
        </button>
      </div>
    </div>
  )
}
