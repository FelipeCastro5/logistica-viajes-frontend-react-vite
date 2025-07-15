// src/services/adapters/clientes.adapter.ts

import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

export interface Cliente {
    id_cliente?: number
    nombre: string
    direccion?: string
    telefono?: string
    email?: string
    // Agrega más campos según tu modelo real
}

// ✅ Obtener todos los clientes
export const getAllClientes = async (): Promise<ApiResponse<any>> => {
    return await RequestHttp(null, {
        base: "clientes",
        entry: "getAll",
        method: "GET"
    })
}

// ✅ Obtener cliente por ID
export const getClienteById = async (id: number): Promise<ApiResponse<any>> => {
    return await RequestHttp(null, {
        base: "clientes",
        entry: "getById",
        method: "GET"
    }, { id })
}

// ✅ Crear nuevo cliente
export const createCliente = async (data: Cliente): Promise<ApiResponse<any>> => {
    return await RequestHttp(data, {
        base: "clientes",
        entry: "create",
        method: "POST"
    })
}

// ✅ Actualizar cliente
export const updateCliente = async (data: Cliente): Promise<ApiResponse<any>> => {
    return await RequestHttp(data, {
        base: "clientes",
        entry: "update",
        method: "PUT"
    })
}

// ✅ Eliminar cliente
export const deleteCliente = async (id: number): Promise<ApiResponse<any>> => {
    return await RequestHttp(null, {
        base: "clientes",
        entry: "delete",
        method: "DELETE"
    }, { id })
}

// ✅ Obtener clientes por usuario
export const getClientesByUsuario = async (fk_usuario: number): Promise<ApiResponse<any>> => {
    return await RequestHttp(null, {
        base: "clientes",
        entry: "getClientesByUsuario",
        method: "GET"
    }, { fk_usuario })
}
