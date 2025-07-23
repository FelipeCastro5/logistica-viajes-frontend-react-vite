import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

// 🧠 Endpoint: /ia/conversacion-simple
export const iaConversacionSimple = async (
  fk_user: number,
  pregunta: string,
  fk_chat: number
): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "ia",
    entry: "conversacionSimple",
    method: "GET"
  }, {
    fk_user,
    fk_chat,
    pregunta
  })
}

// 🧠 Endpoint: /ia/generar-sql
export const iaGenerarSQL = async (
  fk_user: number,
  pregunta: string,
  fk_chat: number
): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "ia",
    entry: "generarSQL",
    method: "GET"
  }, {
    fk_user,
    fk_chat,
    pregunta
  })
}

// 🧠 Endpoint: /ia/mixto
export const iaMixto = async (
  fk_user: number,
  pregunta: string,
  fk_chat: number
): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "ia",
    entry: "mixto",
    method: "GET"
  }, {
    fk_user,
    fk_chat,
    pregunta
  })
}

// 🧠 Endpoint: /ia/inteligente
export const iaInteligente = async (
  fk_user: number,
  pregunta: string,
  fk_chat: number
): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "ia",
    entry: "inteligente",
    method: "GET"
  }, {
    fk_user,
    fk_chat,
    pregunta
  })
}
