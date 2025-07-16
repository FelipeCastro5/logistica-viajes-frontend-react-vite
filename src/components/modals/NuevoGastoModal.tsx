import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import GastoForm from "../forms/GastoForm"
import { useGastoForm } from "@/hooks/forms/useGastoForm"
import { createGastoPorViaje } from "@/services/adapters/gastoxviaje.adapter"
import { toast } from "sonner"

export default function NuevoGastoModal({ viajeId }: { viajeId: number }) {
  const [open, setOpen] = useState(false)
  const gastoHook = useGastoForm(viajeId)
  const [loading, setLoading] = useState(false)

  const handleRegistrar = async () => {
    const body = gastoHook.getFormattedBody()

    try {
      setLoading(true)
      const response = await createGastoPorViaje(body)
      if (response.status) {
        toast.success("✅ Gasto registrado correctamente")
        setOpen(false)
        // Aquí puedes hacer un callback al padre si quieres actualizar lista
      } else {
        toast.error("❌ No se pudo registrar el gasto")
      }
    } catch (err) {
      toast.error("⚠️ Error al registrar gasto")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ Nuevo Gasto</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar nuevo gasto</DialogTitle>
        </DialogHeader>

        <GastoForm viajeId={viajeId} hook={gastoHook} />

        <div className="flex justify-end mt-4">
          <Button onClick={handleRegistrar} disabled={loading} className="bg-blue-600 text-white">
            {loading ? "Registrando..." : "Registrar gasto"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
