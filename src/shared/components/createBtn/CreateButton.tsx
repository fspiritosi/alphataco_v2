'use client'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export function CreateButton({title, onClick, }: {title: string, onClick: () => void}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
  <Button
            onClick={onClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            {title}
  </Button>
  )
}

