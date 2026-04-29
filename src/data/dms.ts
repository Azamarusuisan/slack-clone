export type DMStatus = "online" | "offline"

export type DM = {
  id: string
  name: string
  status: DMStatus
}

export const dms: DM[] = [
  { id: "tanaka", name: "田中", status: "online" },
  { id: "suzuki", name: "鈴木", status: "offline" },
  { id: "sato", name: "佐藤", status: "online" },
]
