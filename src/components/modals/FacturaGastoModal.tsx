import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  deleteFacturaGastoPorViaje,
  updateFacturaGastoPorViaje,
} from "@/services/adapters/gastoxviaje.adapter"

type GastoFactura = {
  id_gastoxviaje: number
  nombre_gasto?: string
  url_factura?: string | null
  id_factura?: string | null
}

type Props = {
  gasto: GastoFactura
  onFacturaActualizada?: () => void
}

export default function FacturaGastoModal({ gasto, onFacturaActualizada }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (!open) {
      setFile(null)
    }
  }, [open])

  const handleSubirFactura = async () => {
    if (!file) {
      toast.warning("Selecciona un archivo antes de subir la factura")
      return
    }

    try {
      setLoading(true)
      const response = await updateFacturaGastoPorViaje(gasto.id_gastoxviaje, file)

      if (response.status === 200) {
        toast.success(response.msg || "Factura subida correctamente")
        onFacturaActualizada?.()
        setOpen(false)
      } else {
        toast.error(response.msg || "No se pudo subir la factura")
      }
    } catch (error) {
      console.error("Error al subir la factura:", error)
      toast.error("Error de red o del servidor al subir la factura")
    } finally {
      setLoading(false)
    }
  }

  const handleEliminarFactura = async () => {
    try {
      setLoading(true)
      const response = await deleteFacturaGastoPorViaje(gasto.id_gastoxviaje)

      if (response.status === 200) {
        toast.success(response.msg || "Factura eliminada correctamente")
        onFacturaActualizada?.()
        setOpen(false)
      } else {
        toast.error(response.msg || "No se pudo eliminar la factura")
      }
    } catch (error) {
      console.error("Error al eliminar la factura:", error)
      toast.error("Error de red o del servidor al eliminar la factura")
    } finally {
      setLoading(false)
    }
  }

  const hasFactura = Boolean(gasto.url_factura)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="text-sm ml-2">
          Factura
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Factura del gasto</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border p-3 text-sm bg-muted/30">
            <p className="font-medium">Gasto: {gasto.nombre_gasto ?? "Sin nombre"}</p>
            <p className="text-muted-foreground">ID gasto por viaje: {gasto.id_gastoxviaje}</p>
            {gasto.id_factura && (
              <p className="text-muted-foreground break-all">ID factura: {gasto.id_factura}</p>
            )}
            {gasto.url_factura && (
              <p className="text-muted-foreground break-all">URL factura: {gasto.url_factura}</p>
            )}
          </div>

          {!hasFactura ? (
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Seleccionar factura</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSubirFactura} disabled={loading}>
                  {loading ? "Subiendo..." : "Subir factura"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Esta factura ya está asociada al gasto. Por ahora solo puedes eliminarla desde aquí.
              </p>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cerrar
                </Button>
                <Button variant="destructive" onClick={handleEliminarFactura} disabled={loading}>
                  {loading ? "Eliminando..." : "Eliminar factura"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}