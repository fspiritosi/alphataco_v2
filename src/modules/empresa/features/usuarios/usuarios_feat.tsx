"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Badge } from "@/shared/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import { Card } from "@/shared/components/ui/card"
import { UserDialog } from "@/modules/empresa/features/usuarios/componentes/user-dialog"
import {  DeleteUserDialog } from  "@/modules/empresa/features/usuarios/componentes/delete-user-dialog"
import { Search, Plus, MoreVertical, Pencil, Trash2, Mail, Building2, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export type User = {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive" | "pending"
  joinedDate: string
}

const initialUsers: User[] = [
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
  {
    id: "4",
    name: "Juan Martínez",
    email: "juan.martinez@empresa.com",
    role: "Gerente",
    department: "Ventas",
    status: "inactive",
    joinedDate: "2022-11-05",
  },
  {
    id: "5",
    name: "Laura Sánchez",
    email: "laura.sanchez@empresa.com",
    role: "Analista",
    department: "Marketing",
    status: "pending",
    joinedDate: "2024-01-08",
  },
]

export function UsuariosEmpresa() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddUser = (userData: Omit<User, "id">) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
    }
    setUsers([...users, newUser])
  }

  const handleEditUser = (userData: Omit<User, "id">) => {
    if (selectedUser) {
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...userData, id: user.id } : user)))
    }
  }

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      setIsDeleteDialogOpen(false)
      setSelectedUser(null)
    }
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

  return (
    <>
      <Card className="border-border bg-card">
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background border-border"
            />
          </div>
          <Button
            onClick={() => {
              setSelectedUser(null)
              setIsDialogOpen(true)
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Usuario
          </Button>
        </div>

        <div className="overflow-x-auto p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Usuario</TableHead>
                <TableHead className="text-muted-foreground">Rol</TableHead>
                <TableHead className="text-muted-foreground">Departamento</TableHead>
                <TableHead className="text-muted-foreground">Estado</TableHead>
                <TableHead className="text-muted-foreground">Fecha de Ingreso</TableHead>
                <TableHead className="text-right text-muted-foreground">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No se encontraron usuarios
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-border hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{user.role}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-foreground">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {user.department}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.joinedDate).toLocaleDateString("es-ES", {
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
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/empresa/usuarios/${user.id}`)} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user)
                              setIsDialogOpen(true)
                            }}
                            className="cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user)
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

      <UserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        user={selectedUser}
        onSave={selectedUser ? handleEditUser : handleAddUser}
      />

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        userName={selectedUser?.name || ""}
        onConfirm={handleDeleteUser}
      />
    </>
  )
}


export default UsuariosEmpresa;

