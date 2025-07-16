// src/components/forms/NuevoGastoModal.tsx
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import GastoForm from "../forms/GastoForm"

export default function EditarGastoModal({ viajeId }: { viajeId: number }) {
  const [open, setOpen] = useState(false)

  const handleGastoCreado = (data: any) => {
    console.log("Gasto registrado:", data)
    setOpen(false)
    // Aquí puedes actualizar una lista, llamar una refetch, etc.
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Actualizar gasto</DialogTitle>
        </DialogHeader>
        <GastoForm viajeId={viajeId} onCreated={handleGastoCreado} />
      </DialogContent>
    </Dialog>
  )
}
