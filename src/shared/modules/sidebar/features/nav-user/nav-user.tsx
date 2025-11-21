import {
  SidebarMenu,

  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"

import {currentUser} from '@clerk/nextjs/server'
import { NavUserError } from "./fallbacks/nav-user-error"
import { SignedIn, UserButton } from "@clerk/nextjs"

export async function NavUser() {
  const user = await currentUser();
  if (!user) return <NavUserError />

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SignedIn>
          <div className="w-full px-4 py-2 flex items-center justify-around gap-2">
            <UserButton />
            <div>
              <p className="text-xs font-semibold">{user?.fullName}</p>
              <span className="text-xs text-gray-400">
                {user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses?.[0]?.emailAddress}
              </span>
            </div>
          </div>
        </SignedIn>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
