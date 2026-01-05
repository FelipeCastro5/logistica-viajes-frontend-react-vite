// src/services/adapters/manifiestos.adapter.ts

import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

export interface Manifiesto {
  id_manifiesto?: number
  fk_vehiculo: number  
  fk_usuario: number
  flete_total: number
  porcentaje_retencion_fuente: number
  porcentaje_ica: number
  anticipo: number
  total_gastos: number
  porcentaje_conductor: number
  // Agrega más campos si tu modelo lo requiere
}

// ✅ Obtener todos los manifiestos
export const getAllManifiestos = async (): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "manifiestos",
    entry: "getAll",
    method: "GET",
  })
}

// ✅ Obtener manifiesto por ID
export const getManifiestoById = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "manifiestos",
    entry: "getById",
    method: "GET",
  }, { id })
}

// ✅ Crear nuevo manifiesto
export const createManifiesto = async (data: Manifiesto): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "manifiestos",
    entry: "create",
    method: "POST",
  })
}

// ✅ Actualizar manifiesto
export const updateManifiesto = async (data: Manifiesto): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "manifiestos",
    entry: "update",
    method: "PUT",
  })
}

// ✅ Eliminar manifiesto
export const deleteManifiesto = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "manifiestos",
    entry: "delete",
    method: "DELETE",
  }, { id })
}

// ✅ Actualizar total_gastos en el manifiesto asociado a un viaje
export const updateTotalGastosByFkViaje = async (fk_viaje: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "manifiestos",
    entry: "updateTotalGastos",
    method: "PUT",
  }, { fk_viaje })
}
