// src/components/modals/NuevoClienteModal.tsx
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ClienteForm from "../forms/ClienteForm"

export default function NuevoClienteModal({
  onClienteCreado,
}: {
  onClienteCreado?: (data: any) => void
}) {
  const [open, setOpen] = useState(false)

  const handleClienteCreado = (data: any) => {
    console.log("Cliente creado desde modal:", data)
    onClienteCreado?.(data) // opcional para que el padre pueda recibirlo
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ Nuevo Cliente</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar nuevo cliente</DialogTitle>
        </DialogHeader>
        <ClienteForm onCreated={handleClienteCreado} />
      </DialogContent>
    </Dialog>
  )
}
