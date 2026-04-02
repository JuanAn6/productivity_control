import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { ChevronDown, Calendar, FilePenLine, Home, LayoutGrid, LogOut, Table2, UtensilsCrossed, ListChecks, User } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", to: "/home", icon: Home, description: "Overview" },
  { label: "Reservations", to: "/reservas", icon: UtensilsCrossed, description: "School dining",},
  { label: "Table", to: "/tabla", icon: Table2, description: "Data table" },
  { label: "Cards", to: "/cards", icon: LayoutGrid, description: "Cards" },
  { label: "Calendar", to: "/calendario", icon: Calendar, description: "Monthly view",},
  { label: "Notion", to: "/notion", icon: FilePenLine, description: "TipTap editor",},
  { label: "Tasks", to: "/tasks", icon: ListChecks, description: "Tasks list",},
  { label: "Users", to: "/users/list", icon: User, description: "Users list",},
]
export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [checking, setChecking] = useState(true)

  const activeLabel = useMemo(() => {
    const current = navItems.find((item) => location.pathname.startsWith(item.to))
    return current?.label ?? "Dashboard"
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
  return (
    <Sidebar>
       <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Select Workspace
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <SidebarMenuButton>
                <NavLink key={item.to} to={item.to} className={({ isActive }) =>
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
              </SidebarMenuButton>
            )
          })}
        </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}