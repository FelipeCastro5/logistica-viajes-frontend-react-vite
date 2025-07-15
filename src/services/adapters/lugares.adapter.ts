import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

export interface Lugar {
  id_lugar?: number
  nombre_lugar: string
  // Agrega más campos si tu modelo los incluye
}

// ✅ Obtener todos los lugares
export const getAllLugares = async (): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "lugares",
    entry: "getAll",
    method: "GET"
  })
}

// ✅ Obtener lugar por ID
export const getLugarById = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "lugares",
    entry: "getById",
    method: "GET"
  }, { id })
}

// ✅ Crear un nuevo lugar
export const createLugar = async (data: Lugar): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "lugares",
    entry: "create",
    method: "POST"
  })
}

// ✅ Actualizar un lugar existente
export const updateLugar = async (data: Lugar): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "lugares",
    entry: "update",
    method: "PUT"
  })
}

// ✅ Eliminar un lugar por ID
export const deleteLugar = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "lugares",
    entry: "delete",
    method: "DELETE"
  }, { id })
}
