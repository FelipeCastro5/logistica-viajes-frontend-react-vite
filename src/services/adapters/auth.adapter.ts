// src/services/adapters/auth.adapter.ts
import { RequestHttp } from "../http/HttpRequest"

// Login
export const loginUser = async (correo: string, contrasena: string): Promise<any> => {
  return await RequestHttp(null, {
    base: "auth",
    entry: "login",
    method: "GET"
  }, { correo, contrasena })
}

// Cambiar contraseña
export const updatePassword = async (id: number, contrasena: string): Promise<any> => {
  return await RequestHttp({ id, contrasena }, {
    base: "auth",
    entry: "updatePassword",
    method: "PUT"
  })
}
