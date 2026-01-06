// src/services/adapters/vehiculos.adapter.ts

import type { ApiResponse } from "../http/ApiRemote"
import { RequestHttp } from "../http/HttpRequest"

// =====================
// Interface
// =====================
export interface Vehiculo {
  id?: number
  fk_usuario: number
  placa?: string
  marca?: string
  configuracion?: string
  tipo_vehiculo?: string
  peso_vacio?: number
  peso_remolque?: number
}

// =====================
// CRUD Vehículos
// =====================

// ✅ Obtener todos los vehículos
export const getAllVehiculos = async (): Promise<ApiResponse<any>> => {
  return await RequestHttp(null, {
    base: "vehiculos",
    entry: "getAll",
    method: "GET",
  })
}

// ✅ Obtener vehículo por ID
export const getVehiculoById = async (id: number): Promise<ApiResponse<any>> => {
  return await RequestHttp(
    null,
    {
      base: "vehiculos",
      entry: "getById",
      method: "GET",
    },
    { id }
  )
}

export const getVehiculosByUsuario = async (
  fk_usuario: number
): Promise<ApiResponse<any>> => {
  return await RequestHttp(
    null,
    {
      base: "vehiculos",
      entry: "getByUsuario",
      method: "GET",
    },
    { fk_usuario }
  )
}

// ✅ Crear nuevo vehículo
export const createVehiculo = async (
  data: Vehiculo
): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "vehiculos",
    entry: "create",
    method: "POST",
  })
}

// ✅ Actualizar vehículo
export const updateVehiculo = async (
  data: Vehiculo
): Promise<ApiResponse<any>> => {
  return await RequestHttp(data, {
    base: "vehiculos",
    entry: "update",
    method: "PUT",
  })
}

// ✅ Eliminar vehículo
export const deleteVehiculo = async (
  id: number
): Promise<ApiResponse<any>> => {
  return await RequestHttp(
    null,
    {
      base: "vehiculos",
      entry: "delete",
      method: "DELETE",
    },
    { id }
  )
}
