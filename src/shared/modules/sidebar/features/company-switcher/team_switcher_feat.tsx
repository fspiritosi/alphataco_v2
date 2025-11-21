export const dynamic = "force-dynamic";
import { ChevronsUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import Image from "next/image"
import { TeamSwitcherError } from "./fallbacks/team-switcher-error"
import { TeamSwitcherEmpty } from "./fallbacks/team-switcher-empty"
import TeamSwitcherMenuContent from "./components/_team-switcher-menu-content"
import { getCompaniesUser } from "@/shared/actions/auth-actions"
import { GetCompaniesUserType } from "@/shared/actions/auth-actions"




export async function TeamSwitcher() {

  const { companies, user } = await getCompaniesUser() as GetCompaniesUserType;

  const activeTeam =
    companies?.find((company) => company.id === user.current_company_id) ||
    companies?.[0];

  if (!companies || !user) return <TeamSwitcherError />

  if (companies?.length === 0 || companies?.[0].owner_id !== user.id) return <TeamSwitcherEmpty />
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="relative size-12 overflow-hidden rounded-lg">
                {activeTeam?.logo ? (
                  <Image
                    src={activeTeam?.logo || ""}
                    alt={activeTeam?.name || ""}
                    width={48}
                    height={48}
                    className="size-full object-contain p-2"
                  />
                ) : ( 
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-full items-center justify-center rounded-lg text-xl font-semibold">
                    {activeTeam?.name?.charAt(0).toUpperCase() || "E"}
                  </div>
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam?.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <TeamSwitcherMenuContent companies={companies} />

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
