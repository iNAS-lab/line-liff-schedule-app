import { useRouter } from 'next/router'

export default function Admin() {
  const router = useRouter()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">管理者画面</h1>
      
      <h2 className="text-xl font-semibold mb-2">出欠一覧</h2>
      {/* 出欠一覧テーブル（ここに追加予定） */}

      <h2 className="text-xl font-semibold mt-6 mb-2">イベント作成</h2>
      {/* イベント作成フォーム（ここに追加予定） */}

      <button 
        className="mt-6 p-2 bg-gray-400 text-white rounded"
        onClick={() => router.push('/')}
      >
        戻る
      </button>
    </div>
  )
}
