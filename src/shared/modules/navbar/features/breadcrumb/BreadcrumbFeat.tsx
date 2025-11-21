"use client"
import Link from "next/link"
import { ChevronDownIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

import { usePathname } from "next/navigation"
import { Fragment } from "react"
import { sidebarItems } from "../../../sidebar/constants/sidebar-items"

export const BreadcrumbFeat = () => {
  const pathname = usePathname()
  const paths = pathname.split("/").filter(Boolean) // Remove empty strings

  // Skip first path segment if it's dashboard
  const pathSegments = paths[0] === 'dashboard' ? paths.slice(1) : paths

  // Build cumulative paths for links
  const buildPath = (index: number) => {
    return '/dashboard/' + pathSegments.slice(0, index + 1).join('/')
  }

  // Función para obtener los submódulos de un segmento de ruta
  const getSubmenuItems = (segment: string) => {
    // Buscar en navMain el item que corresponde al segmento actual
    const navItem = sidebarItems.navMain.find(
      (item) => {
        const urlSegment = item.url.split('/').filter(Boolean)[1] // Obtener el segmento después de /dashboard/
        return urlSegment === segment || item.title.toLowerCase() === segment.toLowerCase()
      }
    )

    return navItem?.items || []
  }

  if (pathSegments.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Siempre mostrar Dashboard como primer elemento */}
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />

        {/* Mapear los segmentos de ruta */}
        {pathSegments.map((segment, index) => {
          const submenuItems = getSubmenuItems(segment)
          const isLastItem = index === pathSegments.length - 1

          return (
            <Fragment key={segment}>
              <BreadcrumbItem className="hidden md:block capitalize">
                {isLastItem ? (
                  <BreadcrumbPage>{segment.replace(/-/g, ' ')}</BreadcrumbPage>
                ) : submenuItems.length > 0 ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                      {segment.replace(/-/g, ' ')}
                      <ChevronDownIcon className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {submenuItems.map((subItem) => (
                        <DropdownMenuItem key={subItem.title} asChild>
                          <Link href={subItem.url}>{subItem.title}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <BreadcrumbLink href={buildPath(index)}>
                    {segment.replace(/-/g, ' ')}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < pathSegments.length - 1 && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}