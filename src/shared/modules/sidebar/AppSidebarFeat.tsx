import { NavMain } from "@/shared/modules/sidebar/components/nav-main"
import { NavUser } from "@/shared/modules/sidebar/features/nav-user/nav-user"
import { TeamSwitcher } from "@/shared/modules/sidebar/features/company-switcher/team_switcher_feat"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/components/ui/sidebar"
import { Suspense } from "react"

import { TeamSwitcherSkeleton } from "./features/company-switcher/fallbacks/team-switcher-skeleton"
import { NavUserSkeleton } from "./features/nav-user/fallbacks/nav-user-skeleton"


export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Suspense fallback={<TeamSwitcherSkeleton />}>
          <TeamSwitcher />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<NavUserSkeleton />}>
          <NavUser />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
