import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

/* ===============================
   INTERFACE
================================ */

export interface Remesa {
  id?: number
  fk_viaje: number
  numero_remesa: string
  numero_autorizacion?: string
  tipo_empaque?: string
  naturaleza_carga?: string
  codigo_armonizado?: string
  cantidad?: number
  unidad_medida?: string
  peso_total?: number
  mercancia_peligrosa?: boolean
  observaciones?: string
}

/* ===============================
   ENDPOINTS
================================ */

// ✅ Obtener todas las remesas
export const getAllRemesas = async (): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "remesas",
    entry: "getAll",
    method: "GET"
  })
}

// ✅ Obtener remesa por ID
export const getRemesaById = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "remesas",
    entry: "getById",
    method: "GET"
  }, { id })
}

// ✅ Obtener remesas por viaje
export const getRemesasByViaje = async (fk_viaje: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "remesas",
    entry: "getByViaje",
    method: "GET"
  }, { fk_viaje })
}

// ✅ Crear remesa
export const createRemesa = async (data: Remesa): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "remesas",
    entry: "create",
    method: "POST"
  })
}

// ✅ Actualizar remesa
export const updateRemesa = async (data: Remesa): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "remesas",
    entry: "update",
    method: "PUT"
  })
}

// ✅ Eliminar remesa
export const deleteRemesa = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "remesas",
    entry: "delete",
    method: "DELETE"
  }, { id })
}
