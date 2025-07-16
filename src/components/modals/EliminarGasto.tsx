// src/components/forms/NuevoGastoModal.tsx
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import GastoForm from "../forms/GastoForm"

export default function EliminarGastoModal({ viajeId }: { viajeId: number }) {
  const [open, setOpen] = useState(false)

  const handleGastoCreado = (data: any) => {
    console.log("Gasto registrado:", data)
    setOpen(false)
    // Aquí puedes actualizar una lista, llamar una refetch, etc.
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Eliminar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>¿Esta seguro de eliminar este gasto?</DialogTitle>
          <br/>
          <Button>Eliminar</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
