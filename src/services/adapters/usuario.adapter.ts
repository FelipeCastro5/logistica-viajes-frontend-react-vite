import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

export interface Usuario {
  id_usuario?: number
  fk_tipodoc: number
  num_doc: string
  fk_rol: number
  fk_contador?: number
  p_nombre: string
  s_nombre?: string
  p_apellido: string
  s_apellido?: string
  telefono: string
  correo: string
  contrasena?: string
}

// ✅ Obtener usuarios conductores con filtro y paginación
export const getConductoresByFilter = async (
  filter: string = "",
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "usuarios",
    entry: "getConductoresByFilter",
    method: "GET"
  }, { filter, page, limit })
}

// ✅ Crear usuario
export const createUsuario = async (data: Usuario): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "usuarios",
    entry: "create",
    method: "POST"
  })
}

// ✅ Actualizar usuario
export const updateUsuario = async (data: Usuario): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "usuarios",
    entry: "update",
    method: "PUT"
  })
}

// ✅ Eliminar usuario
export const deleteUsuario = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "usuarios",
    entry: "delete",
    method: "DELETE"
  }, { id })
}

// ✅ Obtener usuario por ID
export const getUsuarioById = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "usuarios",
    entry: "getById",
    method: "GET"
  }, { id })
}
