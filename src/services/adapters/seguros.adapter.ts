import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

// =====================
// Interface
// =====================
export interface Seguro {
  id?: number
  fk_vehiculo: number
  tipo_seguro: string
  numero_poliza: string
  aseguradora: string
  fecha_vencimiento: string
  valor: number
}

// =====================
// CRUD Seguros
// =====================

// ✅ Obtener todos los seguros
export const getAllSeguros = async (): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "seguros",
    entry: "getAll",
    method: "GET",
  })
}

// ✅ Obtener seguro por ID
export const getSeguroById = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "seguros",
    entry: "getById",
    method: "GET",
  }, { id })
}

// ✅ Obtener seguros por vehículo
export const getSegurosByVehiculo = async (fk_vehiculo: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "seguros",
    entry: "getByVehiculo",
    method: "GET",
  }, { fk_vehiculo })
}

// ✅ Crear nuevo seguro
export const createSeguro = async (data: Seguro): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "seguros",
    entry: "create",
    method: "POST",
  })
}

// ✅ Actualizar seguro
export const updateSeguro = async (data: Seguro): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "seguros",
    entry: "update",
    method: "PUT",
  })
}

// ✅ Eliminar seguro por ID
export const deleteSeguro = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "seguros",
    entry: "delete",
    method: "DELETE",
  }, { id })
}
