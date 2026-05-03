import type { ApiResponse } from "../http/ApiRemote"
import { BASE_URL } from "../http/config"
import { RequestHttp } from "../http/HttpRequest"

export interface GastoPorViaje {
  id?: number
  fk_viaje: number
  fk_gasto: number
  valor: number
  detalles: string
}

// ✅ Obtener todos los gastos por viaje
export const getAllGastosPorViaje = async (): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "gastoxviaje",
    entry: "getAll",
    method: "GET",
  })
}

// ✅ Obtener gasto por viaje por ID
export const getGastoPorViajeById = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "gastoxviaje",
    entry: "getById",
    method: "GET",
  }, { id })
}

// ✅ Crear un nuevo gasto por viaje
export const createGastoPorViaje = async (data: GastoPorViaje): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "gastoxviaje",
    entry: "create",
    method: "POST",
  })
}

// ✅ Actualizar gasto por viaje
export const updateGastoPorViaje = async (data: GastoPorViaje): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "gastoxviaje",
    entry: "update",
    method: "PUT",
  })
}

// ✅ Eliminar gasto por viaje por ID
export const deleteGastoPorViaje = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "gastoxviaje",
    entry: "delete",
    method: "DELETE",
  }, { id })
}

// ✅ Obtener todos los gastos de un viaje por ID
export const getGastosPorViajeByViajeId = async (fk_viaje: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "gastoxviaje",
    entry: "getByViaje",
    method: "GET",
  }, { fk_viaje }) // 🔍 Lo enviás como query param
}

// ✅ Subir factura asociada a un gasto por viaje
export const updateFacturaGastoPorViaje = async (
  id_gastoxviaje: number,
  file: File | Blob
): Promise<ApiResponse<any>> => {
  const formData = new FormData()
  formData.append("id_gastoxviaje", String(id_gastoxviaje))
  formData.append(
    "file",
    file,
    file instanceof File ? file.name : "factura"
  )

  return await RequestHttp(formData, {
    base: "gastoxviaje",
    entry: "updateFactura",
    method: "PUT",
  })
}

// ✅ Eliminar factura asociada a un gasto por viaje
export const deleteFacturaGastoPorViaje = async (
  id_gastoxviaje: number
): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "gastoxviaje",
    entry: "deleteFactura",
    method: "DELETE",
  }, { id_gastoxviaje })
}

// ✅ Descargar factura asociada a un gasto por viaje o referencia de Drive
export const downloadFacturaGastoPorViaje = async (reference: string) => {
  const endpoint = `${BASE_URL.replace(/\/$/, "")}/gastoxviaje/download-factura?reference=${encodeURIComponent(reference)}`

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      accept: "*/*",
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || "No se pudo descargar la factura")
  }

  const blob = await response.blob()
  const contentDisposition = response.headers.get("content-disposition") || ""
  const fileNameMatch = contentDisposition.match(/filename=\"?([^\";]+)\"?/i)
  const fileName = fileNameMatch?.[1] ? decodeURIComponent(fileNameMatch[1]) : "factura"

  const objectUrl = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = objectUrl
  anchor.download = fileName
  anchor.rel = "noopener noreferrer"
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(objectUrl)
}
