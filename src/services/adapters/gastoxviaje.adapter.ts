import type { ApiResponse } from "../http/ApiRemote"
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
