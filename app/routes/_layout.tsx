import BaseLayout from "@/components/base-layout"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/app-sidebar"

export default function AppLayout() {
  return( 
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <BaseLayout />
      </SidebarProvider>
    </TooltipProvider>
  )
}
