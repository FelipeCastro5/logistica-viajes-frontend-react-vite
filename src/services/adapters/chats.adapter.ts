import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

export interface Chat {
  id_chat: number
  fk_usuario: number
  nombre_chat: string
}

// ✅ Obtener chats por usuario
export const getChatsByUsuario = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "chats",
    entry: "getByUsuario",
    method: "GET",
  }, { id })
}

// ✅ Crear un nuevo chat
export const createChat = async (data: Chat): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "chats",
    entry: "create",
    method: "POST",
  })
}

// ✅ Actualizar un chat existente
export const updateChat = async (data: Chat): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "chats",
    entry: "update",
    method: "PUT",
  })
}

// ✅ Eliminar un chat por ID
export const deleteChat = async (id_chat: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "chats",
    entry: "delete",
    method: "DELETE",
  }, { id_chat })
}
