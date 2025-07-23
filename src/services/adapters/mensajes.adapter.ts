import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

export interface Mensaje {
  id_mensaje: number
  fk_chat: number
  pregunta: string
  respuesta: string
  fecha: string
}

// ✅ Obtener todos los mensajes (si llegas a necesitarlo)
export const getAllMensajes = async (): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "mensajes",
    entry: "getAll",
    method: "GET",
  })
}

// ✅ Obtener mensajes por chat ID
export const getMensajesByChat = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "mensajes",
    entry: "getByChat",
    method: "GET",
  }, { id })
}
