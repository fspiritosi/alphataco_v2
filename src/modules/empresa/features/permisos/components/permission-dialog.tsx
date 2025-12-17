"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Textarea } from "@/shared/components/ui/textarea"
import type { Permission } from "../permisos_feat"

type PermissionDialogProps = {
  open: boolean
  onOpenChange: (_open: boolean) => void
  permission: Permission | null
  onSave: (_permission: Omit<Permission, "id">) => void
}

export function PermissionDialog({ open, onOpenChange, permission, onSave }: PermissionDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    module: "" as Permission["module"],
    category: "read" as Permission["category"],
    createdDate: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    if (permission) {
      setFormData({
        name: permission.name,
        description: permission.description,
        module: permission.module,
        category: permission.category,
        createdDate: permission.createdDate,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        module: "" as Permission["module"],
        category: "read" as Permission["category"],
        createdDate: new Date().toISOString().split("T")[0],
      })
    }
  }, [permission, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">{permission ? "Editar Permiso" : "Crear Nuevo Permiso"}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {permission
              ? "Modifica la información del permiso existente"
              : "Completa los datos para crear un nuevo permiso"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-foreground">
                Nombre del Permiso
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Ver Usuarios"
                required
                className="bg-background border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-foreground">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe qué permite hacer este permiso"
                required
                className="bg-background border-border resize-none"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="module" className="text-foreground">
                Módulo
              </Label>
              <Input
                id="module"
                value={formData.module}
                onChange={(e) => setFormData({ ...formData, module: e.target.value as Permission["module"] })}
                placeholder="Ej: Usuarios, Reportes, Sistema"
                required
                className="bg-background border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category" className="text-foreground">
                Categoría
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value: Permission["category"]) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="read">Lectura</SelectItem>
                  <SelectItem value="write">Escritura</SelectItem>
                  <SelectItem value="delete">Eliminación</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-border">
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {permission ? "Guardar Cambios" : "Crear Permiso"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
