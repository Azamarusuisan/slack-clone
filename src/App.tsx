import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">SC</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">Slack Clone</h1>
            <p className="text-sm text-muted-foreground">Vite + React + Tailwind + shadcn/ui</p>
          </div>
        </header>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>shadcn/ui components with Slack purple theme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Type a message..." />
            <div className="flex gap-2">
              <Button>Send</Button>
              <Button variant="outline" asChild>
                <Link to="/about">About</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">About</h1>
        <p className="text-muted-foreground">react-router-dom is wired up.</p>
        <Button asChild>
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
