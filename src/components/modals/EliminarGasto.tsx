// src/components/modals/EliminarGastoModal.tsx
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteGastoPorViaje } from "@/services/adapters/gastoxviaje.adapter"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

interface Props {
  gastoId: number
  onGastoEliminado?: () => void
}

export default function EliminarGastoModal({ gastoId, onGastoEliminado }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEliminar = async () => {
    setLoading(true)
    try {
      const response = await deleteGastoPorViaje(gastoId)
      if (response.status) {
        toast.success("🗑️ Gasto eliminado correctamente")
        setOpen(false) // 👈 cerrar modal primero
        onGastoEliminado?.() // 👈 actualizar la tabla
      } else {
        toast.error("❌ No se pudo eliminar el gasto")
      }
    } catch (error) {
      toast.error("⚠️ Error al eliminar gasto")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-red-600 hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>¿Está seguro de eliminar este gasto?</DialogTitle>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleEliminar}
            disabled={loading}
            className="bg-red-600 text-white"
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
