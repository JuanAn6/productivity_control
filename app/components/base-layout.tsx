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
  ListChecks,
  User
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { SidebarTrigger } from "./ui/sidebar"

const navItems = [
  { label: "Home", to: "/home", icon: Home, description: "Overview" },
  {
    label: "Reservations",
    to: "/reservas",
    icon: UtensilsCrossed,
    description: "School dining",
  },
  { label: "Table", to: "/tabla", icon: Table2, description: "Data table" },
  { label: "Cards", to: "/cards", icon: LayoutGrid, description: "Cards" },
  {
    label: "Calendar",
    to: "/calendario",
    icon: Calendar,
    description: "Monthly view",
  },
  {
    label: "Notion",
    to: "/notion",
    icon: FilePenLine,
    description: "TipTap editor",
  },
  {
    label: "Tasks",
    to: "/tasks",
    icon: ListChecks,
    description: "Tasks list",
  },
  {
    label: "Users",
    to: "/users/list",
    icon: User,
    description: "Users list",
  },
]

export default function BaseLayout() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login") === "true"
    if (!isLoggedIn) {
      navigate("/login", { replace: true })
      return
    }
    setChecking(false)
  }, [navigate])

  if (checking) {
    return (
        <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-svh w-full">
      <div className="mx-auto flex min-h-svh w-full flex-col gap-6 px-3 py-3 md:flex-row">
        <main className="flex-1 space-y-3 flex flex-col w-full">
          <header className="rounded-md border bg-card p-5 shadow-sm flex gap-6">
            <SidebarTrigger />
            <div>
              {/* TODO:Breadcrumbs */}
            </div>
          </header>
          <section className=" rounded-md border bg-card p-6 shadow-sm flex-1">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  )
}
