// import { BasicInfoCard } from "./BasicCardInfo"
// import { ContactCard } from "./ContactCard"
// import { LocationCard } from "./LocationCard"
// import { StatusCard } from "./StatusCard"
import { getCompanyData } from "@/modules/empresa/actions/general_actions"


import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Separator } from "@/shared/components/ui/separator"
import { Building2, Globe, Mail, Phone, MapPin, Edit, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
// import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog"
import { ensureUserFromClerk } from "@/shared/actions/user";


export const GridCards = async () => {
  const user = await ensureUserFromClerk();
  const company = await getCompanyData({user});

  // Obtener el nombre de la provincia
  let provinceName = '';
  if (company?.province) {
    provinceName = company.province.name || '';
  }

  // Formatear el CUIT para mejor legibilidad (XX-XXXXXXXX-X)
  const formattedCuit = company?.cuit ?
    `${company.cuit.slice(0, 2)}-${company.cuit.slice(2, 10)}-${company.cuit.slice(10, 11)}` :
    'No disponible';

  // Formatear el teléfono internacional
  const formattedPhone = company?.phone || 'No disponible';

  // Estado con badge colorizado
  const statusConfig = company?.is_active ?
    { text: 'Activa', variant: 'default' as const } :
    { text: 'Inactiva', variant: 'secondary' as const };
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div className="grid  gap-6 mb-8">
      {/* <BasicInfoCard companyData={company} />
      <LocationCard companyData={company} />
      <ContactCard companyData={company} />
      <StatusCard companyData={company} /> */}

      <div className="min-h-screen bg-background">
        <div className="">
          {/* Header Section */}
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-6">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-card">
                <Image
                  src={company?.logo || "/placeholder.svg"}
                  alt={`${company?.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground">{company?.name}</h1>
                  <Badge variant={statusConfig.variant} className="text-xs">
                    {statusConfig.text}
                  </Badge>
                </div>
                <p className="text-base text-muted-foreground">{company?.description}</p>

              </div>
            </div>
            <Link href={`/dashboard/empresa/editar/${company?.id}`}>
              <Button className="gap-2">
                <Edit className="h-4 w-4" />
                Editar
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            {/* Company Information Card */}
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-medium text-foreground">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                Información General
              </h2>
              <Separator className="mb-4" />
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">CUIT</dt>
                  <dd className="mt-1 text-base text-foreground">{formattedCuit}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Ubicación</dt>
                  <dd className="mt-1 text-base text-foreground">
                    {company?.city?.name}, {provinceName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">País</dt>
                  <dd className="mt-1 text-base text-foreground">{company?.country}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Estado</dt>
                  <dd className="mt-1 text-base text-foreground">{statusConfig.text}</dd>
                </div>
              </dl>
            </Card>

            {/* Contact Information Card */}
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-medium text-foreground">
                <Globe className="h-5 w-5 text-muted-foreground" />
                Información de Contacto
              </h2>
              <Separator className="mb-4" />
              <dl className="space-y-4">
                <div className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <dt className="text-sm font-medium text-muted-foreground">Website</dt>
                    <dd className="mt-1">
                      <a
                        href={company?.website!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-foreground hover:underline"
                      >
                        {company?.website}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${company?.email}`} className="text-base text-foreground hover:underline">
                        {company?.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <dt className="text-sm font-medium text-muted-foreground">Teléfono</dt>
                    <dd className="mt-1">
                      <a href={`tel:${company?.phone}`} className="text-base text-foreground hover:underline">
                        {formattedPhone}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <dt className="text-sm font-medium text-muted-foreground">Dirección</dt>
                    <dd className="mt-1 text-base text-foreground">
                      {company?.address}
                      <br />
                      {company?.city?.name}, {provinceName}
                      <br />
                      {company?.country}
                    </dd>
                  </div>
                </div>
              </dl>
            </Card>

            {/* Critical Actions Card */}
            <Card className="border-destructive/20 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div className="flex-1">
                  <h2 className="mb-1 text-lg font-medium text-foreground">Acciones Críticas</h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Eliminar esta empresa es permanente y no se puede deshacer. Todos los datos asociados serán eliminados del sistema.
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Eliminar Empresa
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                          <p>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente{" "}
                            <span className="font-semibold text-foreground">{company?.name}</span> y removerá todos
                            los datos asociados de nuestros servidores.
                          </p>
                          <p className="text-destructive">Toda la información de la empresa, contactos e historial se perderán.</p>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          // onClick={handleDelete}
                          // disabled={isDeleting}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {"Eliminar Empresa"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


/*

  user: {
  ...user,
  curretCompany: id
  }

*/