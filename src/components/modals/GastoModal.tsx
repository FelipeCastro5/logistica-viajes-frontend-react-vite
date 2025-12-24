// src/components/modals/GastoModal.tsx
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import GastoForm from "../forms/GastoForm"
import { useGastoForm } from "@/hooks/forms/useGastoForm"
import { createGastoPorViaje, updateGastoPorViaje } from "@/services/adapters/gastoxviaje.adapter"
import { toast } from "sonner"
import { updateTotalGastosByFkViaje } from "@/services/adapters/manifiestos.adapter"
import { useAuth } from "@/hooks/useAuth"

type Modo = "crear" | "editar"

interface Props {
  viajeId: number
  modo?: Modo
  trigger?: React.ReactNode
  initialData?: Partial<ReturnType<typeof useGastoForm>["gasto"]>
  onGastoGuardado?: () => void
}

export default function GastoModal({
  viajeId,
  modo = "crear",
  trigger,
  initialData,
  onGastoGuardado,
}: Props) {

  const { user } = useAuth()
  const isContador = user?.nombre_rol === "Contador"
  // ⛔ El contador no puede crear ni editar gastos
  if (isContador) {
    return null
  }

  const [open, setOpen] = useState(false)
  const gastoHook = useGastoForm({ viajeId, initialData, modo })
  const [loading, setLoading] = useState(false)

  const handleGuardar = async () => {
    const body = gastoHook.getFormattedBody()

    if (!body.fk_gasto) {
      toast.warning("⚠️ Debes seleccionar un tipo de gasto")
      return
    }

    if (!body.valor || isNaN(body.valor)) {
      toast.warning("⚠️ El valor del gasto debe ser un número válido mayor a 0")
      return
    }

    if (modo === "editar" && initialData?.id_gastoxviaje) {
      body.id_gastoxviaje = initialData.id_gastoxviaje
    }

    try {
      setLoading(true)
      let response

      if (modo === "crear") {
        response = await createGastoPorViaje(body)
      } else {
        response = await updateGastoPorViaje(body)
      }

      if (response.status) {
        toast.success(`✅ Gasto ${modo === "crear" ? "registrado" : "actualizado"} correctamente`)
        // 🔄 Actualizar total_gastos del manifiesto
        const gastosResponse = await updateTotalGastosByFkViaje(viajeId)
        if (gastosResponse.status) {
          const total = gastosResponse.data?.total_gastos
          toast.info(`ℹ️ Total de gastos actualizado: $${parseFloat(total).toLocaleString()}`)
        } else {
          toast.warning("⚠️ No se pudo actualizar el total de gastos del manifiesto")
        }
        gastoHook.resetForm()
        setOpen(false)
        onGastoGuardado?.()


        window.location.reload()
      }


      if (response.status) {
        toast.success(`✅ Gasto ${modo === "crear" ? "registrado" : "actualizado"} correctamente`)
        gastoHook.resetForm()
        setOpen(false)
        onGastoGuardado?.()
      } else {
        toast.error(`❌ No se pudo ${modo === "crear" ? "registrar" : "actualizar"} el gasto`)
      }
    } catch (err) {
      toast.error("⚠️ Error al guardar gasto")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="outline">{modo === "crear" ? "+ Nuevo Gasto" : "Editar"}</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{modo === "crear" ? "Registrar nuevo gasto" : "Editar gasto"}</DialogTitle>
        </DialogHeader>

        <GastoForm hook={gastoHook} />

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleGuardar}
            disabled={loading}
            className="bg-blue-600 text-white"
          >
            {loading
              ? modo === "crear" ? "Registrando..." : "Guardando..."
              : modo === "crear" ? "Registrar gasto" : "Guardar cambios"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
