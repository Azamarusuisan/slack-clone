import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { channels, messages } from "@/data/messages"

type SidebarProps = {
  selectedChannelId: string
  onSelect: (id: string) => void
}

function SidebarContent({ selectedChannelId, onSelect }: SidebarProps) {
  return (
    <div className="h-full flex flex-col bg-[#611f69] text-white">
      <div className="px-4 py-4 border-b border-white/10">
        <h1 className="text-lg font-bold">My Workspace</h1>
      </div>
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        <p className="px-2 mb-1 text-xs uppercase tracking-wide text-white/70">
          チャンネル
        </p>
        <ul>
          {channels.map((channel) => {
            const isSelected = channel.id === selectedChannelId
            return (
              <li key={channel.id}>
                <button
                  type="button"
                  onClick={() => onSelect(channel.id)}
                  className={
                    "w-full text-left px-2 py-1.5 rounded text-sm transition-colors " +
                    (isSelected
                      ? "bg-[#3f0e47] text-white font-semibold"
                      : "text-white/90 hover:bg-white/10")
                  }
                >
                  <span className="text-white/70 mr-1">#</span>
                  {channel.name}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

function App() {
  const [selectedChannelId, setSelectedChannelId] = useState(channels[0].id)
  const [sheetOpen, setSheetOpen] = useState(false)
  const selectedChannel =
    channels.find((c) => c.id === selectedChannelId) ?? channels[0]

  const handleSelect = (id: string) => {
    setSelectedChannelId(id)
    setSheetOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden md:flex w-[260px] flex-shrink-0">
        <SidebarContent
          selectedChannelId={selectedChannelId}
          onSelect={handleSelect}
        />
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-2 px-4 md:px-6 py-4 border-b">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="メニューを開く"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[260px] bg-[#611f69] border-0">
              <SheetHeader className="sr-only">
                <SheetTitle>サイドバー</SheetTitle>
              </SheetHeader>
              <SidebarContent
                selectedChannelId={selectedChannelId}
                onSelect={handleSelect}
              />
            </SheetContent>
          </Sheet>
          <h2 className="text-xl font-bold"># {selectedChannel.name}</h2>
        </header>

        <section className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4">
          {messages.map((m) => (
            <article key={m.id} className="flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-[#611f69] text-white text-xs">
                  {m.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{m.user}</span>
                  <span className="text-xs text-muted-foreground">{m.time}</span>
                </div>
                <p className="text-sm leading-relaxed break-words">{m.body}</p>
              </div>
            </article>
          ))}
        </section>

        <footer className="sticky bottom-0 bg-background border-t px-4 md:px-6 py-3">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <Input
              placeholder={`#${selectedChannel.name} へメッセージを送信`}
              className="flex-1"
            />
            <Button type="submit">送信</Button>
          </form>
        </footer>
      </main>
    </div>
  )
}

export default App
