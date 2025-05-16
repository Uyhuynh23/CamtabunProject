import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"

interface AuthCardProps {
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  error: string
  registerMode: boolean
  setRegisterMode: (v: boolean) => void
  handleLogin: () => void
  handleRegister: () => void
}

export default function AuthCard({
  email,
  setEmail,
  password,
  setPassword,
  error,
  registerMode,
  setRegisterMode,
  handleLogin,
  handleRegister,
}: AuthCardProps) {
  return (
    <Card className="rounded-3xl shadow-2xl border-0 bg-white/10 backdrop-blur-lg ring-1 ring-cyan-400/30 w-full">
      <CardContent className="p-10 space-y-8">
        <div className="flex items-center gap-3 justify-center">
          <User className="w-8 h-8 text-cyan-400 drop-shadow" />
          <h2 className="text-3xl font-bold text-white">Welcome to VoSo</h2>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Email"
            className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          {!registerMode ? (
            <>
              <Button className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition" onClick={handleLogin}>Login</Button>
              <Button variant="outline" className="w-full rounded-xl border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 transition" onClick={() => setRegisterMode(true)}>Register</Button>
            </>
          ) : (
            <>
              <Button className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition" onClick={handleRegister}>Register</Button>
              <Button variant="outline" className="w-full rounded-xl border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 transition" onClick={() => setRegisterMode(false)}>Back to Login</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}