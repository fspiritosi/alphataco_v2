"use client";

import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/shared/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    router.push("/");
  };

  return SignedOut({
    children: (
      <Button variant={'ghost'} size={'sm'} onClick={logout}><LogOut className="text-red-400" />Cerrar session</Button>
    )
  })
    
}
