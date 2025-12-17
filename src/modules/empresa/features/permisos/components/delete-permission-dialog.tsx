"use client"

import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

type DeletePermissionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  permissionName: string
  onConfirm: () => void
}

export function DeletePermissionDialog({ open, onOpenChange, permissionName, onConfirm }: DeletePermissionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/20">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle className="text-foreground">Eliminar Permiso</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground pt-2">
            ¿Estás seguro de que deseas eliminar el permiso{" "}
            <span className="font-semibold text-foreground">{permissionName}</span>? Esta acción no se puede deshacer y
            se removerá de todos los usuarios que lo tengan asignado.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border">
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar Permiso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
