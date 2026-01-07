import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

/* ===============================
   INTERFACE
================================ */

export interface MercanciaPeligrosa {
  id?: number
  fk_remesa: number
  codigo_un: string
  grupo_riesgo?: string
  caracteristica_peligrosidad?: string
  embalaje_envase?: string
}

/* ===============================
   ENDPOINTS
================================ */

// ✅ Obtener toda la mercancía peligrosa
export const getAllMercanciaPeligrosa = async (): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "mercanciaPeligrosa",
    entry: "getAll",
    method: "GET"
  })
}

// ✅ Obtener mercancía peligrosa por ID
export const getMercanciaPeligrosaById = async (
  id: number
): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "mercanciaPeligrosa",
    entry: "getById",
    method: "GET"
  }, { id })
}

// ✅ Obtener mercancía peligrosa por remesa
export const getMercanciaPeligrosaByRemesa = async (
  fk_remesa: number
): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "mercanciaPeligrosa",
    entry: "getByRemesa",
    method: "GET"
  }, { fk_remesa })
}

// ✅ Crear mercancía peligrosa
export const createMercanciaPeligrosa = async (
  data: MercanciaPeligrosa
): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "mercanciaPeligrosa",
    entry: "create",
    method: "POST"
  })
}

// ✅ Actualizar mercancía peligrosa
export const updateMercanciaPeligrosa = async (
  data: MercanciaPeligrosa
): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "mercanciaPeligrosa",
    entry: "update",
    method: "PUT"
  })
}

// ✅ Eliminar mercancía peligrosa
export const deleteMercanciaPeligrosa = async (
  id: number
): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "mercanciaPeligrosa",
    entry: "delete",
    method: "DELETE"
  }, { id })
}
