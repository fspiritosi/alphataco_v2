'use client'
// import { getTeamsType, updateUserCurrentCompany } from "@/shared/actions/auth-actions"
import { Company } from "@/generated/client"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "@/shared/components/ui/dropdown-menu"
import { useSidebar } from "@/shared/components/ui/sidebar"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { updateUserCurrentCompany } from "@/shared/actions/auth-actions"

function TeamSwitcherMenuContent({ companies }: { companies: Company[] }) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const handleCompanyChange = async (companyId: string) => {
    await updateUserCurrentCompany(companyId);
    router.refresh();
  }
  return (
    <DropdownMenuContent
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      align="start"
      side={isMobile ? "bottom" : "right"}
      sideOffset={4}
    >
      <DropdownMenuLabel className="text-muted-foreground text-xs">
        Empresas
      </DropdownMenuLabel>
      {companies?.map((company, index) => (
        <DropdownMenuItem
          key={company.name}
          onClick={() => handleCompanyChange(company.id || "")}
          className="gap-2 p-2"
        >
          <div className="relative size-8 overflow-hidden rounded-md">
            {company.logo ? (
              <Image
                src={company.logo}
                alt={company.name || ""}
                width={32}
                height={32}
                className="size-full object-contain p-1"
              />
            ) : (
              <div className="flex size-full items-center justify-center rounded-md border bg-muted text-sm font-semibold">
                {company.name?.charAt(0).toUpperCase() || 'E'}
              </div>
            )}
          </div>
          {company.name}
          <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
        </DropdownMenuItem>
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem className="gap-2 p-2" onClick={() => router.push("/dashboard/empresa/nueva")}>

        <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
          <Plus className="size-4" />
        </div>
        <div className="text-muted-foreground font-medium">Nueva Empresa</div>

      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}

export default TeamSwitcherMenuContent
