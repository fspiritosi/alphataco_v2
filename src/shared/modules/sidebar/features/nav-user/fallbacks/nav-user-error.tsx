import { AlertCircle } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import { ChevronsUpDown } from "lucide-react"

export function NavUserError() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="opacity-60 hover:opacity-100 transition-opacity"
          disabled
        >
          <div className="bg-destructive/20 text-destructive flex aspect-square size-8 items-center justify-center rounded-lg">
            <AlertCircle className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium text-muted-foreground">
              Error al cargar
            </span>
            <span className="truncate text-xs text-muted-foreground/60">
              Intente nuevamente
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4 text-muted-foreground/60" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}