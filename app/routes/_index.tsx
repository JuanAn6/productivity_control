import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export default function Index() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login") === "true"
    navigate(isLoggedIn ? "/home" : "/login", { replace: true })
    setChecking(false)
  }, [navigate])

  if (checking) {
    return (
      <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    )
  }

  return null
}
