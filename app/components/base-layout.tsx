import { useEffect, useMemo, useState } from "react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router"
import {
  Calendar,
  FilePenLine,
  Home,
  LayoutGrid,
  LogOut,
  Table2,
  UtensilsCrossed,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", to: "/home", icon: Home, description: "Resumen general" },
  {
    label: "Reservas",
    to: "/reservas",
    icon: UtensilsCrossed,
    description: "Comedor escolar",
  },
  { label: "Tabla", to: "/tabla", icon: Table2, description: "Data table" },
  { label: "Cards", to: "/cards", icon: LayoutGrid, description: "Tarjetas" },
  {
    label: "Calendario",
    to: "/calendario",
    icon: Calendar,
    description: "Vista mensual",
  },
  {
    label: "Notion",
    to: "/notion",
    icon: FilePenLine,
    description: "TipTap editor",
  },
]

export default function BaseLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [checking, setChecking] = useState(true)

  const activeLabel = useMemo(() => {
    const current = navItems.find((item) => location.pathname.startsWith(item.to))
    return current?.label ?? "Panel"
  }, [location.pathname])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login") === "true"
    if (!isLoggedIn) {
      navigate("/login", { replace: true })
      return
    }
    setChecking(false)
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem("login")
    navigate("/login", { replace: true })
  }

  if (checking) {
    return (
      <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
        Cargando...
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-muted/30">
      <div className="mx-auto flex min-h-svh w-full flex-col gap-6 px-4 py-6 md:flex-row">
        <aside className="flex w-full shrink-0 flex-col gap-4 rounded-2xl border bg-sidebar p-4 shadow-sm md:w-64">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
              BR
            </div>
            <div>
              <p className="text-sm font-semibold text-sidebar-foreground">Base React</p>
              <p className="text-xs text-muted-foreground">Panel interno</p>
            </div>
          </div>

          <Separator />

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      buttonVariants({
                        variant: isActive ? "secondary" : "ghost",
                        size: "sm",
                      }),
                      "w-full justify-start gap-2 text-sm"
                    )
                  }
                >
                  <Icon className="size-4" />
                  <span className="flex flex-1 items-center justify-between gap-2">
                    <span>{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </span>
                </NavLink>
              )
            })}
          </nav>
        </aside>

        <main className="flex-1 space-y-6 flex flex-col">
          <header className="rounded-2xl border bg-card p-5 shadow-sm flex justify-between">
            <div>
              <h1 className="mt-2 text-2xl font-semibold text-foreground">{activeLabel}</h1>
              <p className="text-sm text-muted-foreground">
                Gestiona los datos principales y revisa el estado general del proyecto.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-3 rounded-xl border bg-background/60 p-3">
              <Avatar className="size-9">
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">admin@baseui.dev</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleLogout}
                aria-label="Cerrar sesion"
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          </header>
          <section className="rounded-2xl border bg-card p-6 shadow-sm flex-1">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  )
}
