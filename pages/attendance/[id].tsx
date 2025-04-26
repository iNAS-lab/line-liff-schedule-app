import { useRouter } from 'next/router'

export default function AttendanceDetail() {
  const router = useRouter()
  const { id } = router.query

  // 本当は APIから出欠データを取得する
  const attendanceData = {
    date: '2025/04/01',
    time: '8:00',
    duration: '120分',
    place: '〇〇コート',
    participants: [
      { created_at: '2025/03/01 15:00', name: '田中', status: '参加' },
      { created_at: '2025/03/10 12:00', name: '佐藤', status: '参加' },
      { created_at: '2025/03/11 12:00', name: '石井', status: '保留' },
    ],
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">出欠一覧詳細画面</h1>

      <div className="mb-4">
        <p>📅 {attendanceData.date}</p>
        <p>🕗 {attendanceData.time}</p>
        <p>⌛ {attendanceData.duration}</p>
        <p>🏟 {attendanceData.place}</p>
      </div>

      <table className="w-full border mb-4">
        <thead>
          <tr>
            <th>登録日</th>
            <th>ユーザ名</th>
            <th>参加ステータス</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.participants.map((user, index) => (
            <tr key={index}>
              <td>{user.created_at}</td>
              <td>{user.name}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button 
        className="p-2 bg-gray-400 text-white rounded"
        onClick={() => router.back()}
      >
        戻る
      </button>
    </div>
  )
}
