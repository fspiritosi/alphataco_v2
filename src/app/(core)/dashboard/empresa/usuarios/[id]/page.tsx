"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Card } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { ArrowLeft, Save, Shield, Mail, Building2, Calendar, UserIcon } from "lucide-react"
import type { User } from "@/modules/empresa/features/usuarios/usuarios_feat"
import type { Permission, UserPermission } from "@/modules/empresa/features/permisos/permisos_feat"

const mockUsers: User[] = [
  {
    id: "1",
    name: "Ana García",
    email: "ana.garcia@empresa.com",
    role: "Administrador",
    department: "Tecnología",
    status: "active",
    joinedDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@empresa.com",
    role: "Desarrollador",
    department: "Tecnología",
    status: "active",
    joinedDate: "2023-03-20",
  },
  {
    id: "3",
    name: "María López",
    email: "maria.lopez@empresa.com",
    role: "Diseñador",
    department: "Diseño",
    status: "active",
    joinedDate: "2023-02-10",
  },
]

const mockPermissions: Permission[] = [
  {
    id: "1",
    name: "Ver Usuarios",
    description: "Permite visualizar la lista de usuarios",
    module: "Usuarios",
    category: "read",
    createdDate: "2023-01-10",
  },
  {
    id: "2",
    name: "Crear Usuarios",
    description: "Permite crear nuevos usuarios en el sistema",
    module: "Usuarios",
    category: "write",
    createdDate: "2023-01-10",
  },
  {
    id: "3",
    name: "Editar Usuarios",
    description: "Permite modificar información de usuarios existentes",
    module: "Usuarios",
    category: "write",
    createdDate: "2023-01-10",
  },
  {
    id: "4",
    name: "Eliminar Usuarios",
    description: "Permite eliminar usuarios del sistema",
    module: "Usuarios",
    category: "delete",
    createdDate: "2023-01-10",
  },
  {
    id: "5",
    name: "Ver Reportes",
    description: "Permite acceder a los reportes del sistema",
    module: "Reportes",
    category: "read",
    createdDate: "2023-02-15",
  },
  {
    id: "6",
    name: "Generar Reportes",
    description: "Permite crear y exportar reportes",
    module: "Reportes",
    category: "write",
    createdDate: "2023-02-15",
  },
  {
    id: "7",
    name: "Administrador Total",
    description: "Acceso completo a todas las funcionalidades",
    module: "Sistema",
    category: "admin",
    createdDate: "2023-01-01",
  },
]

const mockUserPermissions: UserPermission[] = [
  { userId: "1", userName: "Ana García", permissionIds: ["1", "2", "3", "4", "5", "6", "7"] },
  { userId: "2", userName: "Carlos Rodríguez", permissionIds: ["1", "5"] },
  { userId: "3", userName: "María López", permissionIds: ["1", "5", "6"] },
]

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const user = mockUsers.find((u) => u.id === id)
  const userPermissions = mockUserPermissions.find((up) => up.userId === id)

  const [formData, setFormData] = useState<User>(
    user || {
      id: "",
      name: "",
      email: "",
      role: "",
      department: "",
      status: "active",
      joinedDate: "",
    },
  )

  if (!user) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-7xl">
          <Card className="border-border bg-card p-12 text-center">
            <h1 className="text-2xl font-semibold text-foreground">Usuario no encontrado</h1>
            <p className="mt-2 text-muted-foreground">El usuario que buscas no existe</p>
            <Button onClick={() => router.back()} className="mt-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Usuarios
            </Button>
            </Card>
            </div>
      </div>
    )
  }

  const assignedPermissions = mockPermissions.filter((p) => userPermissions?.permissionIds.includes(p.id))

  const handleSave = () => {
    console.log("[v0] Guardando usuario:", formData)
    setIsEditing(false)
  }

  const getStatusBadge = (status: User["status"]) => {
    const variants = {
      active: "bg-primary/20 text-primary border-primary/30",
      inactive: "bg-muted text-muted-foreground border-border",
      pending: "bg-chart-4/20 text-chart-4 border-chart-4/30",
    }
    const labels = {
      active: "Activo",
      inactive: "Inactivo",
      pending: "Pendiente",
    }
    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  const getCategoryBadge = (category: Permission["category"]) => {
    const variants = {
      read: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      write: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      delete: "bg-destructive/20 text-destructive border-destructive/30",
      admin: "bg-primary/20 text-primary border-primary/30",
    }
    const labels = {
      read: "Lectura",
      write: "Escritura",
      delete: "Eliminación",
      admin: "Administrador",
    }
    return (
      <Badge variant="outline" className={variants[category]}>
        {labels[category]}
      </Badge>
    )
  }

  const groupedPermissions = assignedPermissions.reduce(
    (acc, permission) => {
      if (!acc[permission.module]) {
        acc[permission.module] = []
      }
      acc[permission.module].push(permission)
      return acc
    },
    {} as Record<string, Permission[]>,
  )

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto  space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a Usuarios
          </Button>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Editar Usuario
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="border-border">
                Cancelar
              </Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          )}
        </div>

        <Card className="border-border bg-card p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary text-3xl font-medium">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-foreground">{user.name}</h1>
              <p className="mt-1 text-muted-foreground">{user.email}</p>
              <div className="mt-3">{getStatusBadge(user.status)}</div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Nombre Completo
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-border"
                />
              ) : (
                <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-foreground">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  {user.name}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Correo Electrónico
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-border"
                />
              ) : (
                <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-foreground">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {user.email}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground">
                Rol
              </Label>
              {isEditing ? (
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="bg-background border-border"
                />
              ) : (
                <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-foreground">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  {user.role}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-foreground">
                Departamento
              </Label>
              {isEditing ? (
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="bg-background border-border"
                />
              ) : (
                <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-foreground">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  {user.department}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground">
                Estado
              </Label>
              {isEditing ? (
                <Select
                  value={formData.status}
                  onValueChange={(value: User["status"]) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
                  {getStatusBadge(user.status)}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="joinedDate" className="text-foreground">
                Fecha de Ingreso
              </Label>
              <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-foreground">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {new Date(user.joinedDate).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Permisos Asignados</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {assignedPermissions.length}{" "}
                {assignedPermissions.length === 1 ? "permiso asignado" : "permisos asignados"}
              </p>
            </div>
            <Button
              variant="outline"
              className="border-border bg-transparent"
              onClick={() => router.push("/dashboard/empresa/permisos")}
            >
              Gestionar Permisos
            </Button>
          </div>

          {assignedPermissions.length === 0 ? (
            <div className="rounded-lg border border-border bg-muted/30 p-12 text-center">
              <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium text-foreground">Sin permisos asignados</h3>
              <p className="mt-2 text-sm text-muted-foreground">Este usuario no tiene permisos asignados actualmente</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(([module, permissions]) => (
                <div key={module}>
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">{module}</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                          <Shield className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-foreground">{permission.name}</h4>
                            {getCategoryBadge(permission.category)}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
