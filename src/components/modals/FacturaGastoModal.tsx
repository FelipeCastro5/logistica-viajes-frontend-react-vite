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
  downloadFacturaGastoPorViaje,
  updateFacturaGastoPorViaje,
} from "@/services/adapters/gastoxviaje.adapter"

const extractGoogleDriveFileId = (url: string) => {
  const match = url.match(/\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/)
  return match?.[1] ?? null
}

const getFacturaPreviewUrl = (url: string) => {
  const fileId = extractGoogleDriveFileId(url)
  if (!fileId) return url
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}

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
  const [previewMode, setPreviewMode] = useState<"img" | "iframe" | "link">("img")
  const facturaPreviewUrl = gasto.url_factura ? getFacturaPreviewUrl(gasto.url_factura) : ""
  const facturaDrivePreviewUrl = gasto.url_factura
    ? (() => {
        const fileId = extractGoogleDriveFileId(gasto.url_factura)
        return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : gasto.url_factura
      })()
    : ""
  const openFacturaEnNuevaPestana = () => {
    if (!gasto.url_factura) return
    window.open(gasto.url_factura, "_blank", "noopener,noreferrer")
  }

  useEffect(() => {
    if (!open) {
      setFile(null)
      setPreviewMode("img")
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

  const handleDescargarFactura = async () => {
    if (!gasto.url_factura) {
      toast.warning("No hay referencia de factura para descargar")
      return
    }

    try {
      setLoading(true)
      await downloadFacturaGastoPorViaje(gasto.url_factura)
      toast.success("Descarga iniciada correctamente")
    } catch (error) {
      console.error("Error al descargar la factura:", error)
      toast.error("No se pudo descargar la factura")
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

      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden p-0">
        <DialogHeader>
          <DialogTitle className="px-6 pt-6">Factura del gasto</DialogTitle>
        </DialogHeader>

        <div className="max-h-[calc(85vh-4.5rem)] overflow-y-auto px-6 pb-6 pt-4 space-y-4">
          <div className="rounded-md border p-3 text-sm bg-muted/30">
            {/* <p className="font-medium">Gasto: {gasto.nombre_gasto ?? "Sin nombre"}</p> */}
            {/* <p className="text-muted-foreground">ID gasto por viaje: {gasto.id_gastoxviaje}</p> */}
            {/* {gasto.id_factura && (
              <p className="text-muted-foreground break-all">ID factura: {gasto.id_factura}</p>
            )} */}
            {gasto.url_factura && (
                <p className="text-muted-foreground break-all">
                URL factura: 
                {gasto.url_factura ? (
                    <a 
                    href={gasto.url_factura} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                    >
                    {gasto.url_factura}
                    </a>
                ) : (
                    <span className="text-gray-400 ml-1">No disponible</span>
                )}
                </p>
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
              <div className="rounded-md border bg-white p-3 space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-sm font-medium">Vista previa</p>
                  <Button variant="outline" size="sm" onClick={openFacturaEnNuevaPestana}>
                    Abrir en Drive
                  </Button>
                </div>

                <div className="overflow-hidden rounded-md border bg-muted/20 min-h-[360px]">
                  {previewMode === "img" && (
                    <img
                      src={facturaPreviewUrl}
                      alt={`Factura de ${gasto.nombre_gasto ?? "gasto por viaje"}`}
                      className="max-h-[65vh] w-full object-contain"
                      onError={() => setPreviewMode("iframe")}
                    />
                  )}

                  {previewMode === "iframe" && (
                    <iframe
                      title={`Factura de ${gasto.nombre_gasto ?? "gasto por viaje"}`}
                      src={facturaDrivePreviewUrl}
                      className="h-[65vh] w-full"
                      onError={() => setPreviewMode("link")}
                    />
                  )}

                  {previewMode === "link" && (
                    <div className="flex h-[360px] items-center justify-center p-6 text-center">
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          No fue posible mostrar la factura embebida.
                        </p>
                        <Button variant="outline" onClick={openFacturaEnNuevaPestana}>
                          Abrir factura en una pestaña nueva
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Esta factura ya está asociada al gasto. Si la vista previa no carga, ábrela en Drive o elimina la factura desde aquí.
              </p>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cerrar
                </Button>
                <Button variant="secondary" onClick={handleDescargarFactura} disabled={loading}>
                  Descargar factura
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