"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { Label } from "@/shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Badge } from "@/shared/components/ui/badge"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import type { Permission, UserPermission } from "../permisos_feat"

type AssignPermissionsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  permissions: Permission[]
  userPermissions: UserPermission[]
  onSave: (userId: string, permissionIds: string[]) => void
}

const mockUsers = [
  { id: "1", name: "Ana García" },
  { id: "2", name: "Carlos Rodríguez" },
  { id: "3", name: "María López" },
  { id: "4", name: "Juan Martínez" },
  { id: "5", name: "Laura Sánchez" },
]

export function AssignPermissionsDialog({
  open,
  onOpenChange,
  permissions,
  userPermissions,
  onSave,
}: AssignPermissionsDialogProps) {
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  useEffect(() => {
    if (selectedUserId) {
      const userPerms = userPermissions.find((up) => up.userId === selectedUserId)
      setSelectedPermissions(userPerms?.permissionIds || [])
    } else {
      setSelectedPermissions([])
    }
  }, [selectedUserId, userPermissions])

  useEffect(() => {
    if (!open) {
      setSelectedUserId("")
      setSelectedPermissions([])
    }
  }, [open])

  const handleTogglePermission = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId) ? prev.filter((id) => id !== permissionId) : [...prev, permissionId],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedUserId) {
      onSave(selectedUserId, selectedPermissions)
      onOpenChange(false)
    }
  }

  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.module]) {
        acc[permission.module] = []
      }
      acc[permission.module].push(permission)
      return acc
    },
    {} as Record<string, Permission[]>,
  )

  const getCategoryColor = (category: Permission["category"]) => {
    const colors = {
      read: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      write: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      delete: "bg-destructive/20 text-destructive border-destructive/30",
      admin: "bg-primary/20 text-primary border-primary/30",
    }
    return colors[category]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">Asignar Permisos a Usuario</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Selecciona un usuario y marca los permisos que deseas asignarle
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="user" className="text-foreground">
                Usuario
              </Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedUserId && (
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground">Permisos</Label>
                  <Badge variant="outline" className="bg-muted/50 text-foreground border-border">
                    {selectedPermissions.length} seleccionados
                  </Badge>
                </div>
                <ScrollArea className="h-[300px] rounded-md border border-border bg-background p-4">
                  <div className="space-y-4">
                    {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
                      <div key={module} className="space-y-2">
                        <h4 className="font-medium text-sm text-foreground">{module}</h4>
                        <div className="space-y-2 pl-2">
                          {modulePermissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/50"
                            >
                              <Checkbox
                                id={permission.id}
                                checked={selectedPermissions.includes(permission.id)}
                                onCheckedChange={() => handleTogglePermission(permission.id)}
                                className="mt-1"
                              />
                              <div className="flex-1 space-y-1">
                                <Label
                                  htmlFor={permission.id}
                                  className="text-sm font-medium text-foreground cursor-pointer leading-none"
                                >
                                  {permission.name}
                                </Label>
                                <p className="text-xs text-muted-foreground">{permission.description}</p>
                                <Badge variant="outline" className={`text-xs ${getCategoryColor(permission.category)}`}>
                                  {permission.category === "read" && "Lectura"}
                                  {permission.category === "write" && "Escritura"}
                                  {permission.category === "delete" && "Eliminación"}
                                  {permission.category === "admin" && "Administrador"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-border">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!selectedUserId}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Asignar Permisos
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
