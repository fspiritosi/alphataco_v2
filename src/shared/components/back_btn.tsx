'use client'
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function BackBtn() {
    const router = useRouter();
    return (
        
            <Button variant="ghost" className="mb-4 -ml-2" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          
    )
}