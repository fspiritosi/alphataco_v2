import UsuariosEmpresa from "@/modules/empresa/features/usuarios/usuarios_feat";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Shield } from "lucide-react";
import HeaderModule from "@/shared/components/header-module";


export default function UserPage() {
  return (
    <main className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto">
        <div className="mb-8 flex items-start justify-between">
          <HeaderModule title="Gestión de Usuarios" description="Administra los usuarios de tu empresa desde un solo lugar" />
          <Link href="/dashboard/empresa/permisos">
            <Button variant="outline" className="border-border bg-transparent">
              <Shield className="mr-2 h-4 w-4" />
              Gestionar Permisos
            </Button>
          </Link>
        </div>
        <UsuariosEmpresa />
      </div>
    </main>
  )
}
