export type Channel = {
  id: string
  name: string
}

export type Message = {
  id: string
  user: string
  initials: string
  time: string
  body: string
}

export const channels: Channel[] = [
  { id: "general", name: "general" },
  { id: "random", name: "random" },
  { id: "project-a", name: "project-a" },
  { id: "design", name: "design" },
  { id: "announcements", name: "announcements" },
]

export const messages: Message[] = [
  {
    id: "m1",
    user: "Hanako Tanaka",
    initials: "HT",
    time: "9:04 AM",
    body: "おはようございます！今日もよろしくお願いします。",
  },
  {
    id: "m2",
    user: "Ken Sato",
    initials: "KS",
    time: "9:12 AM",
    body: "昨日のリリース、特に問題なさそうです 👍",
  },
  {
    id: "m3",
    user: "Mika Suzuki",
    initials: "MS",
    time: "9:31 AM",
    body: "デザインレビューを 11時から始めましょう。",
  },
  {
    id: "m4",
    user: "Hanako Tanaka",
    initials: "HT",
    time: "9:45 AM",
    body: "了解です。資料を共有しておきます。",
  },
  {
    id: "m5",
    user: "Ryo Yamada",
    initials: "RY",
    time: "10:02 AM",
    body: "API のレスポンス時間が改善しました（平均 320ms → 180ms）。",
  },
  {
    id: "m6",
    user: "Aoi Kobayashi",
    initials: "AK",
    time: "10:18 AM",
    body: "ナイス！どこを変更したの？",
  },
  {
    id: "m7",
    user: "Ryo Yamada",
    initials: "RY",
    time: "10:21 AM",
    body: "DB のインデックス追加と N+1 の解消です。",
  },
  {
    id: "m8",
    user: "Ken Sato",
    initials: "KS",
    time: "10:55 AM",
    body: "今週のスタンドアップは木曜日に変更します。",
  },
  {
    id: "m9",
    user: "Mika Suzuki",
    initials: "MS",
    time: "11:30 AM",
    body: "デザインの最終版アップしました。確認お願いします！",
  },
  {
    id: "m10",
    user: "Aoi Kobayashi",
    initials: "AK",
    time: "12:08 PM",
    body: "ランチ行ってきます 🍱",
  },
]
