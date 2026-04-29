export type Channel = {
  id: string
  name: string
}

export type Message = {
  id: string
  type: "channel" | "dm"
  parentId: string
  userName: string
  body: string
  createdAt: string
}

export const channels: Channel[] = [
  { id: "general", name: "general" },
  { id: "random", name: "random" },
  { id: "project-a", name: "project-a" },
  { id: "design", name: "design" },
  { id: "announcements", name: "announcements" },
]

export const initialMessages: Message[] = [
  // general
  { id: "g1", type: "channel", parentId: "general", userName: "Hanako Tanaka", body: "おはようございます！今日もよろしくお願いします。", createdAt: "2026-04-29 09:04" },
  { id: "g2", type: "channel", parentId: "general", userName: "Ken Sato", body: "昨日のリリース、特に問題なさそうです 👍", createdAt: "2026-04-29 09:12" },
  { id: "g3", type: "channel", parentId: "general", userName: "Mika Suzuki", body: "デザインレビューを 11時から始めましょう。", createdAt: "2026-04-30 09:31" },
  { id: "g4", type: "channel", parentId: "general", userName: "Mika Suzuki", body: "Zoom リンクは別途共有します。", createdAt: "2026-04-30 09:33" },

  // random
  { id: "r1", type: "channel", parentId: "random", userName: "Aoi Kobayashi", body: "今週末のおすすめランチスポット教えてください 🍱", createdAt: "2026-04-30 10:08" },
  { id: "r2", type: "channel", parentId: "random", userName: "Ryo Yamada", body: "渋谷の「ハナマル」がオススメです。並びますが回転は速いです。", createdAt: "2026-04-30 10:15" },
  { id: "r3", type: "channel", parentId: "random", userName: "Hanako Tanaka", body: "新宿の「ねぎし」も牛タンが美味しくておすすめ！", createdAt: "2026-04-30 10:22" },

  // project-a
  { id: "p1", type: "channel", parentId: "project-a", userName: "Ken Sato", body: "API スキーマのドラフトをアップしました。レビューお願いします。", createdAt: "2026-04-29 11:02" },
  { id: "p2", type: "channel", parentId: "project-a", userName: "Ryo Yamada", body: "確認しました。エンドポイント名で 1点コメントしました。", createdAt: "2026-04-29 11:20" },
  { id: "p3", type: "channel", parentId: "project-a", userName: "Hanako Tanaka", body: "本日の進捗を共有します。E2E テスト完了済み。", createdAt: "2026-04-30 09:50" },
  { id: "p4", type: "channel", parentId: "project-a", userName: "Mika Suzuki", body: "明日のキックオフは 10時開始でよろしくお願いします。", createdAt: "2026-04-30 14:10" },

  // design
  { id: "d1", type: "channel", parentId: "design", userName: "Mika Suzuki", body: "デザインの最終版アップしました。確認お願いします！", createdAt: "2026-04-30 11:30" },
  { id: "d2", type: "channel", parentId: "design", userName: "Mika Suzuki", body: "Figma リンク: https://figma.com/...（ダミー）", createdAt: "2026-04-30 11:31" },
  { id: "d3", type: "channel", parentId: "design", userName: "Aoi Kobayashi", body: "確認しました。アイコンの間隔だけ少し調整したいです。", createdAt: "2026-04-30 12:05" },

  // announcements
  { id: "a1", type: "channel", parentId: "announcements", userName: "Ken Sato", body: "今週のスタンドアップは木曜日に変更します。", createdAt: "2026-04-30 08:00" },
  { id: "a2", type: "channel", parentId: "announcements", userName: "Aoi Kobayashi", body: "全社ミーティングは金曜 16:00 から実施予定です。", createdAt: "2026-04-30 09:15" },
  { id: "a3", type: "channel", parentId: "announcements", userName: "Hanako Tanaka", body: "来週月曜は祝日のためお休みです 🎌", createdAt: "2026-04-30 10:30" },

  // DM: 田中
  { id: "dm-tanaka-1", type: "dm", parentId: "tanaka", userName: "田中", body: "お疲れさまです！例の資料、確認できますか？", createdAt: "2026-04-30 09:00" },
  { id: "dm-tanaka-2", type: "dm", parentId: "tanaka", userName: "You", body: "はい、午後までに目を通します。", createdAt: "2026-04-30 09:05" },
  { id: "dm-tanaka-3", type: "dm", parentId: "tanaka", userName: "田中", body: "助かります！コメントもらえると嬉しいです。", createdAt: "2026-04-30 09:06" },
  { id: "dm-tanaka-4", type: "dm", parentId: "tanaka", userName: "田中", body: "今日のランチ、一緒にどうですか？", createdAt: "2026-04-30 11:45" },

  // DM: 鈴木
  { id: "dm-suzuki-1", type: "dm", parentId: "suzuki", userName: "鈴木", body: "デザインレビューの件、明日でも大丈夫ですか？", createdAt: "2026-04-29 17:20" },
  { id: "dm-suzuki-2", type: "dm", parentId: "suzuki", userName: "You", body: "問題ないです、明日 11時で調整しましょう。", createdAt: "2026-04-29 17:30" },
  { id: "dm-suzuki-3", type: "dm", parentId: "suzuki", userName: "鈴木", body: "ありがとうございます！では明日。", createdAt: "2026-04-29 17:31" },

  // DM: 佐藤
  { id: "dm-sato-1", type: "dm", parentId: "sato", userName: "佐藤", body: "API の実装、レビュー依頼してもいいですか？", createdAt: "2026-04-30 13:00" },
  { id: "dm-sato-2", type: "dm", parentId: "sato", userName: "You", body: "もちろん！PR リンク送ってください。", createdAt: "2026-04-30 13:02" },
  { id: "dm-sato-3", type: "dm", parentId: "sato", userName: "佐藤", body: "https://github.com/example/pr/123 こちらです。", createdAt: "2026-04-30 13:03" },
  { id: "dm-sato-4", type: "dm", parentId: "sato", userName: "佐藤", body: "ご確認お願いします！", createdAt: "2026-04-30 13:04" },
  { id: "dm-sato-5", type: "dm", parentId: "sato", userName: "You", body: "了解！夕方までにレビューします。", createdAt: "2026-04-30 13:10" },
]
