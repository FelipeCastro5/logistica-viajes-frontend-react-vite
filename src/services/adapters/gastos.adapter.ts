import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

export interface Gasto {
  id_gasto?: number
  nombre_gasto: string
}

// ✅ Obtener todos los gastos con tipado
export const getAllGastos = async (): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "gastos",
    entry: "getAll",
    method: "GET"
  })
}

// ✅ Obtener gasto por ID
export const getGastoById = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "gastos",
    entry: "getById",
    method: "GET"
  }, { id })
}

// ✅ Crear nuevo gasto
export const createGasto = async (data: Gasto): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "gastos",
    entry: "create",
    method: "POST"
  })
}

// ✅ Actualizar gasto
export const updateGasto = async (data: Gasto): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "gastos",
    entry: "update",
    method: "PUT"
  })
}

// ✅ Eliminar gasto
export const deleteGasto = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "gastos",
    entry: "delete",
    method: "DELETE"
  }, { id })
}
