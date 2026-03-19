import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type LoginPayload = {
  email: string
  password: string
}

async function loginRequest(payload: LoginPayload) {
  console.log("login request", payload)
  return { ok: true }
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    await loginRequest({ email, password })
    localStorage.setItem("login", "true")
    setLoading(false)
    navigate("/home", { replace: true })
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="space-y-1">
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </div>
            <CardAction>
              <Button type="button" variant="link">
                Sign Up
              </Button>
            </CardAction>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className="flex items-center">
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button className="w-full" disabled={loading} type="submit">
              {loading ? "Entrando..." : "Login"}
            </Button>
            <Button className="w-full" type="button" variant="outline">
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
