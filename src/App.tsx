import { useState } from "react"
import {
  AtSign,
  Bell,
  Bold,
  Bookmark,
  ChevronDown,
  ChevronRight,
  Code,
  Hash,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Menu,
  MessageSquare,
  MessageSquareReply,
  MoreHorizontal,
  Pin,
  Plus,
  Search,
  Send,
  Smile,
  SmilePlus,
  SquareCode,
  Strikethrough,
  Users,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { dms } from "@/data/dms"
import { channels, initialMessages, type Message } from "@/data/messages"
import { cn } from "@/lib/utils"

function avatarUrl(user: string) {
  return `https://i.pravatar.cc/40?u=${encodeURIComponent(user)}`
}

type SelectedItem =
  | { type: "channel"; id: string }
  | { type: "dm"; id: string }

type SidebarProps = {
  selectedItem: SelectedItem
  onSelect: (item: SelectedItem) => void
}

function SidebarContent({ selectedItem, onSelect }: SidebarProps) {
  const [channelsOpen, setChannelsOpen] = useState(true)

  const navItem = (icon: React.ReactNode, label: string) => (
    <button
      type="button"
      className="w-full flex items-center gap-2 px-2 py-1 rounded text-[15px] text-white/85 hover:bg-white/10"
    >
      <span className="w-4 flex justify-center">{icon}</span>
      <span>{label}</span>
    </button>
  )

  return (
    <div className="h-full w-full flex flex-col bg-[#3F0E40] text-white">
      <button
        type="button"
        className="flex items-center justify-between px-4 py-3 border-b border-white/10 hover:bg-white/5"
      >
        <span className="text-[15px] font-bold">Acme Corp</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
        <div className="space-y-0.5">
          {navItem(<MessageSquare className="h-4 w-4" />, "Threads")}
          {navItem(<Send className="h-4 w-4" />, "Direct Messages")}
          {navItem(<Bell className="h-4 w-4" />, "Activity")}
        </div>

        <div>
          <button
            type="button"
            onClick={() => setChannelsOpen((v) => !v)}
            className="w-full flex items-center gap-1 px-2 py-1 text-xs uppercase tracking-wide text-white/70 hover:text-white"
          >
            {channelsOpen ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
            <span className="ml-0.5">Channels</span>
          </button>
          {channelsOpen && (
            <ul className="mt-0.5 space-y-0.5">
              {channels.map((channel) => {
                const isSelected =
                  selectedItem.type === "channel" && selectedItem.id === channel.id
                return (
                  <li key={channel.id}>
                    <button
                      type="button"
                      onClick={() => onSelect({ type: "channel", id: channel.id })}
                      className={cn(
                        "w-full text-left flex items-center gap-1 px-2 py-1 rounded text-[15px]",
                        isSelected
                          ? "bg-[#1264A3] text-white font-semibold"
                          : "text-white/85 hover:bg-white/10",
                      )}
                    >
                      <Hash className="h-4 w-4 opacity-80" />
                      <span>{channel.name}</span>
                    </button>
                  </li>
                )
              })}
              <li>
                <button
                  type="button"
                  className="w-full text-left flex items-center gap-1 px-2 py-1 rounded text-[15px] text-white/70 hover:bg-white/10"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add channels</span>
                </button>
              </li>
            </ul>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-wide opacity-70 px-3 py-2">
            ダイレクトメッセージ
          </div>
          <ul className="space-y-0.5">
            {dms.map((dm) => {
              const isSelected =
                selectedItem.type === "dm" && selectedItem.id === dm.id
              return (
                <li key={dm.id}>
                  <button
                    type="button"
                    onClick={() => onSelect({ type: "dm", id: dm.id })}
                    className={cn(
                      "w-full text-left h-8 px-3 rounded text-sm flex items-center gap-2 cursor-pointer",
                      isSelected
                        ? "bg-[#1264A3] text-white"
                        : "hover:bg-white/10",
                    )}
                  >
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        dm.status === "online" ? "bg-green-500" : "bg-gray-400",
                      )}
                    />
                    <span>{dm.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </div>
  )
}

type GroupedItem =
  | { type: "date"; key: string; label: string }
  | { type: "message"; key: string; message: Message; showAvatar: boolean }

function formatDateLabel(createdAt: string) {
  return createdAt.slice(0, 10)
}

function formatTimeLabel(createdAt: string) {
  return createdAt.slice(11, 16)
}

function groupMessages(list: Message[]): GroupedItem[] {
  const out: GroupedItem[] = []
  let prevDate = ""
  let prevUser = ""
  for (const m of list) {
    const date = formatDateLabel(m.createdAt)
    if (date !== prevDate) {
      out.push({ type: "date", key: `d-${m.id}`, label: date })
      prevUser = ""
    }
    out.push({
      type: "message",
      key: m.id,
      message: m,
      showAvatar: m.userName !== prevUser,
    })
    prevDate = date
    prevUser = m.userName
  }
  return out
}

function MessageRow({ message, showAvatar }: { message: Message; showAvatar: boolean }) {
  const time = formatTimeLabel(message.createdAt)
  return (
    <article className="group relative flex gap-2 px-4 md:px-6 py-1 hover:bg-[#F8F8F8]">
      <div className="w-9 flex-shrink-0 flex justify-center pt-0.5">
        {showAvatar ? (
          <img
            src={avatarUrl(message.userName)}
            alt={message.userName}
            width={36}
            height={36}
            className="w-9 h-9 rounded-[4px] object-cover"
          />
        ) : (
          <span className="hidden group-hover:block text-[10px] text-[#616061] mt-1.5">
            {time}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        {showAvatar && (
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-[#1D1C1D] text-[15px]">{message.userName}</span>
            <span className="text-xs text-[#616061]">{time}</span>
          </div>
        )}
        <p className="text-[15px] leading-[1.46] text-[#1D1C1D] break-words">{message.body}</p>
      </div>
      <div className="absolute -top-3 right-4 hidden group-hover:flex items-center gap-0.5 bg-white border rounded shadow-sm px-1 py-0.5">
        <button type="button" className="p-1 rounded hover:bg-muted text-[#616061]" aria-label="リアクション追加">
          <SmilePlus className="h-4 w-4" />
        </button>
        <button type="button" className="p-1 rounded hover:bg-muted text-[#616061]" aria-label="スレッドで返信">
          <MessageSquareReply className="h-4 w-4" />
        </button>
        <button type="button" className="p-1 rounded hover:bg-muted text-[#616061]" aria-label="ブックマーク">
          <Bookmark className="h-4 w-4" />
        </button>
        <button type="button" className="p-1 rounded hover:bg-muted text-[#616061]" aria-label="その他">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}

type ComposerProps = {
  placeholderTarget: string
  onSend: (text: string) => void
}

function Composer({ placeholderTarget, onSend }: ComposerProps) {
  const [value, setValue] = useState("")
  const isEmpty = value.trim().length === 0

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEmpty) return
    onSend(value.trim())
    setValue("")
  }

  const fmtBtn = (icon: React.ReactNode, label: string) => (
    <button
      type="button"
      aria-label={label}
      className="p-1.5 rounded hover:bg-muted text-[#616061]"
    >
      {icon}
    </button>
  )

  return (
    <div className="px-4 md:px-6 py-3 bg-background sticky bottom-0">
      <form onSubmit={submit}>
        <div className="border rounded-lg bg-white">
          <div className="flex items-start gap-1 px-2 pt-2">
            <button
              type="button"
              aria-label="ファイルを添付"
              className="h-7 w-7 flex items-center justify-center rounded-full border text-[#616061] hover:bg-muted mt-0.5"
            >
              <Plus className="h-4 w-4" />
            </button>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`${placeholderTarget} へメッセージを送信`}
              className="flex-1 outline-none bg-transparent text-[15px] text-[#1D1C1D] px-2 py-1.5"
            />
          </div>
          <div className="flex items-center justify-between px-2 py-1.5 border-t">
            <div className="flex items-center gap-0.5">
              {fmtBtn(<Bold className="h-4 w-4" />, "Bold")}
              {fmtBtn(<Italic className="h-4 w-4" />, "Italic")}
              {fmtBtn(<Strikethrough className="h-4 w-4" />, "Strikethrough")}
              {fmtBtn(<LinkIcon className="h-4 w-4" />, "Link")}
              {fmtBtn(<ListOrdered className="h-4 w-4" />, "Ordered list")}
              {fmtBtn(<List className="h-4 w-4" />, "Bullet list")}
              {fmtBtn(<Code className="h-4 w-4" />, "Code")}
              {fmtBtn(<SquareCode className="h-4 w-4" />, "Code block")}
            </div>
            <div className="flex items-center gap-0.5">
              {fmtBtn(<Smile className="h-4 w-4" />, "絵文字")}
              {fmtBtn(<AtSign className="h-4 w-4" />, "メンション")}
              <button
                type="submit"
                disabled={isEmpty}
                aria-label="送信"
                className={cn(
                  "ml-1 h-7 w-7 flex items-center justify-center rounded",
                  isEmpty
                    ? "bg-[#DDDDDD] text-white cursor-not-allowed"
                    : "bg-[#007A5A] text-white hover:bg-[#006848]",
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

function App() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    type: "channel",
    id: channels[0].id,
  })
  const [sheetOpen, setSheetOpen] = useState(false)
  const [allMessages, setAllMessages] = useState<Message[]>(initialMessages)

  const selectedChannel =
    selectedItem.type === "channel"
      ? channels.find((c) => c.id === selectedItem.id) ?? channels[0]
      : channels[0]
  const selectedDM =
    selectedItem.type === "dm"
      ? dms.find((d) => d.id === selectedItem.id) ?? null
      : null

  const handleSelect = (item: SelectedItem) => {
    setSelectedItem(item)
    setSheetOpen(false)
  }

  const handleSend = (text: string) => {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, "0")
    const createdAt = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
    setAllMessages((prev) => [
      ...prev,
      {
        id: `you-${now.getTime()}`,
        type: selectedItem.type,
        parentId: selectedItem.id,
        userName: "You",
        body: text,
        createdAt,
      },
    ])
  }

  const visibleMessages = allMessages.filter(
    (m) => m.type === selectedItem.type && m.parentId === selectedItem.id,
  )
  const grouped = groupMessages(visibleMessages)

  const placeholderTarget =
    selectedItem.type === "channel"
      ? `#${selectedChannel.name}`
      : `@${selectedDM?.name ?? ""}`

  return (
    <div className="flex min-h-screen bg-background text-[#1D1C1D]">
      <aside className="hidden md:flex w-[260px] flex-shrink-0">
        <SidebarContent
          selectedItem={selectedItem}
          onSelect={handleSelect}
        />
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-2 px-4 md:px-6 py-3 border-b">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="メニューを開く"
                className="md:hidden p-1.5 rounded hover:bg-muted text-[#1D1C1D]"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[260px] bg-[#3F0E40] border-0 text-white">
              <SheetHeader className="sr-only">
                <SheetTitle>サイドバー</SheetTitle>
              </SheetHeader>
              <SidebarContent
                selectedItem={selectedItem}
                onSelect={handleSelect}
              />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-1 flex-1 min-w-0">
            <h2 className="text-xl font-bold text-[#1D1C1D] truncate">
              {selectedItem.type === "channel"
                ? `# ${selectedChannel.name}`
                : `@ ${selectedDM?.name ?? ""}`}
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#616061]">
            <button type="button" aria-label="メンバー" className="p-1.5 rounded hover:bg-muted">
              <Users className="h-4 w-4" />
            </button>
            <button type="button" aria-label="検索" className="p-1.5 rounded hover:bg-muted">
              <Search className="h-4 w-4" />
            </button>
            <button type="button" aria-label="ピン留め" className="p-1.5 rounded hover:bg-muted">
              <Pin className="h-4 w-4" />
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto py-3">
          {grouped.map((item) =>
            item.type === "date" ? (
              <div
                key={item.key}
                className="flex items-center gap-2 px-4 md:px-6 my-2"
              >
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs font-semibold text-[#616061] border rounded-full px-3 py-0.5 bg-background">
                  {item.label}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
            ) : (
              <MessageRow
                key={item.key}
                message={item.message}
                showAvatar={item.showAvatar}
              />
            ),
          )}
        </section>

        <Composer placeholderTarget={placeholderTarget} onSend={handleSend} />
      </main>
    </div>
  )
}

export default App
