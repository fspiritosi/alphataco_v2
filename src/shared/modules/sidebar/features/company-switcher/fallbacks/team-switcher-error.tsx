"use client"

import { AlertCircle, ChevronsUpDown } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"


export function TeamSwitcherError() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground text-red-400"
          disabled
        >
          <div className="bg-sidebar-primary/50 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Error</span>
            <span className="truncate text-xs">Error al cargar las empresas</span>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}