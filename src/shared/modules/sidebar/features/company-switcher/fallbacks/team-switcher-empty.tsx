import { Building2, Plus } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import Link from "next/link"

export function TeamSwitcherEmpty() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="opacity-60 hover:opacity-100 transition-opacity"
          asChild
        >
          <Link href="/dashboard/empresa/nueva">
            <div className="bg-sidebar-primary/20 text-sidebar-primary-foreground/60 flex aspect-square size-8 items-center justify-center rounded-lg border-2 border-dashed border-sidebar-primary/30">
              <Building2 className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium text-muted-foreground">
                Sin empresa
              </span>
              <span className="truncate text-xs text-muted-foreground/60">
                Crear empresa
              </span>
            </div>
            <Plus className="ml-auto size-4 text-muted-foreground/60" />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}