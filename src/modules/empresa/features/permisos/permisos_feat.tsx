"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Badge } from "@/shared/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import { Card } from "@/shared/components/ui/card"
import { PermissionDialog } from "@/modules/empresa/features/permisos/components/permission-dialog"
import { DeletePermissionDialog } from "@/modules/empresa/features/permisos/components/delete-permission-dialog"
import { AssignPermissionsDialog } from "@/modules/empresa/features/permisos/components/assign-permissions-dialog"
import { Search, Plus, MoreVertical, Pencil, Trash2, Shield, UserPlus } from "lucide-react"

export type Permission = {
  id: string
  name: string
  description: string
  module: "Usuarios" | "Reportes" | "Sistema" | "Empleados" | "Equipos"
  category: "read" | "write" | "delete" | "admin"
  createdDate: string
}

export type UserPermission = {
  userId: string
  userName: string
  permissionIds: string[]
}

const initialPermissions: Permission[] = [
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
  {
    id: "8",
    name: "Ver Empleados",
    description: "Permite visualizar la lista de empleados",
    module: "Empleados",
    category: "read",
    createdDate: "2023-01-10",
  },
  {
    id: "9",
    name: "Crear Empleados",
    description: "Permite crear nuevos empleados en el sistema",
    module: "Empleados",
    category: "write",
    createdDate: "2023-01-10",
  },
  {
    id: "10",
    name: "Editar Empleados",
    description: "Permite modificar información de empleados existentes",
    module: "Empleados",
    category: "write",
    createdDate: "2023-01-10",
  },
  {
    id: "11",
    name: "Eliminar Empleados",
    description: "Permite eliminar empleados del sistema",
    module: "Empleados",
    category: "delete",
    createdDate: "2023-01-10",
  },
]

const initialUserPermissions: UserPermission[] = [
  { userId: "1", userName: "Ana García", permissionIds: ["1", "2", "3", "4", "5", "6", "7"] },
  { userId: "2", userName: "Carlos Rodríguez", permissionIds: ["1", "5"] },
  { userId: "3", userName: "María López", permissionIds: ["1", "5", "6"] },
]

export function PermissionsTable() {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions)
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>(initialUserPermissions)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null)

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.module.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddPermission = (permissionData: Omit<Permission, "id">) => {
    const newPermission: Permission = {
      ...permissionData,
      id: Math.random().toString(36).substr(2, 9),
    }
    setPermissions([...permissions, newPermission])
  }

  const handleEditPermission = (permissionData: Omit<Permission, "id">) => {
    if (selectedPermission) {
      setPermissions(
        permissions.map((permission) =>
          permission.id === selectedPermission.id ? { ...permissionData, id: permission.id } : permission,
        ),
      )
    }
  }

  const handleDeletePermission = () => {
    if (selectedPermission) {
      setPermissions(permissions.filter((permission) => permission.id !== selectedPermission.id))
      setUserPermissions(
        userPermissions.map((up) => ({
          ...up,
          permissionIds: up.permissionIds.filter((id) => id !== selectedPermission.id),
        })),
      )
      setIsDeleteDialogOpen(false)
      setSelectedPermission(null)
    }
  }

  const handleAssignPermissions = (userId: string, permissionIds: string[]) => {
    const existingIndex = userPermissions.findIndex((up) => up.userId === userId)
    if (existingIndex >= 0) {
      const updated = [...userPermissions]
      updated[existingIndex] = { ...updated[existingIndex], permissionIds }
      setUserPermissions(updated)
    } else {
      const user = { userId, userName: "Usuario", permissionIds }
      setUserPermissions([...userPermissions, user])
    }
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

  const getModuleIcon = (module: Permission["module"]) => {
    const variants = {
      Usuarios: "bg-chart-2/20 text-chart-2 border-chart-2/30 dark:bg-chart-2/20 dark:text-chart-2 dark:border-chart-2/30",
      Reportes: "bg-chart-4/20 text-chart-4 border-chart-4/30 dark:bg-chart-4/20 dark:text-chart-4 dark:border-chart-4/30",
      Sistema: "bg-destructive/20 text-destructive border-destructive/30 dark:bg-destructive/20 dark:text-destructive dark:border-destructive/30",
      Empleados: "bg-indigo-200 text-indigo-600 border-indigo-300/30 dark:bg-indigo-800 dark:text-indigo-200 dark:border-indigo-700",
      Equipos: "bg-emerald-200 text-emerald-600 border-emerald-300/30 dark:bg-emerald-800 dark:text-emerald-200 dark:border-emerald-700",
      
    }
    return (
      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-primary ${variants[module]} ` }>       
        <Shield className="h-5 w-5" />
      </div>
      
    )
  }

  const getUsersWithPermission = (permissionId: string) => {
    return userPermissions.filter((up) => up.permissionIds.includes(permissionId)).length
  }

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar permisos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background border-border"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsAssignDialogOpen(true)} variant="outline" className="border-border">
              <UserPlus className="mr-2 h-4 w-4" />
              Asignar Permisos
            </Button>
            <Button
              onClick={() => {
                setSelectedPermission(null)
                setIsDialogOpen(true)
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Crear Permiso
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Permiso</TableHead>
                <TableHead className="text-muted-foreground">Módulo</TableHead>
                <TableHead className="text-muted-foreground">Categoría</TableHead>
                <TableHead className="text-muted-foreground">Usuarios Asignados</TableHead>
                <TableHead className="text-muted-foreground">Fecha de Creación</TableHead>
                <TableHead className="text-right text-muted-foreground">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No se encontraron permisos
                  </TableCell>
                </TableRow>
              ) : (
                filteredPermissions.map((permission) => (
                  <TableRow key={permission.id} className="border-border hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                      {getModuleIcon(permission.module) }
                        
                        <div>
                          <div className="font-medium text-foreground">{permission.name}</div>
                          <div className="text-sm text-muted-foreground">{permission.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{permission.module}</TableCell>
                    <TableCell>{getCategoryBadge(permission.category)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-muted/50 text-foreground border-border">
                        {getUsersWithPermission(permission.id)} usuarios
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(permission.createdDate).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border-border">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPermission(permission)
                              setIsDialogOpen(true)
                            }}
                            className="cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPermission(permission)
                              setIsDeleteDialogOpen(true)
                            }}
                            className="cursor-pointer text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <PermissionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        permission={selectedPermission}
        onSave={selectedPermission ? handleEditPermission : handleAddPermission}
      />

      <DeletePermissionDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        permissionName={selectedPermission?.name || ""}
        onConfirm={handleDeletePermission}
      />

      <AssignPermissionsDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        permissions={permissions}
        userPermissions={userPermissions}
        onSave={handleAssignPermissions}
      />
    </div>
  )
}
