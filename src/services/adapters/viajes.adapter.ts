import { RequestHttp } from "../http/HttpRequest"

export interface Viaje {
  id_viaje?: number
  fk_usuario: number
  fk_manifiesto: number
  fk_cliente: number
  fk_origen: number
  fk_destino: number
  codigo: string
  observaciones?: string
  estado_viaje: boolean
  producto: string
  detalle_producto?: string
  direccion_llegada: string
  fecha_salida: string
  fecha_llegada: string
}

// Obtener todos los viajes
export const getAllViajes = async (): Promise<any> => {
  return await RequestHttp(null, {
    base: "viajes",
    entry: "getAll",
    method: "GET"
  })
}

// Obtener viaje por ID
export const getViajeById = async (id: number): Promise<any> => {
  return await RequestHttp(null, {
    base: "viajes",
    entry: "getById",
    method: "GET"
  }, { id })
}

// Crear viaje
export const createViaje = async (data: Viaje): Promise<any> => {
  return await RequestHttp(data, {
    base: "viajes",
    entry: "create",
    method: "POST"
  })
}

// Actualizar viaje
export const updateViaje = async (data: Viaje): Promise<any> => {
  return await RequestHttp(data, {
    base: "viajes",
    entry: "update",
    method: "PUT"
  })
}

// Eliminar viaje
export const deleteViaje = async (id: number): Promise<any> => {
  return await RequestHttp(null, {
    base: "viajes",
    entry: "delete",
    method: "DELETE"
  }, { id })
}

export const getPaginatedViajesByUsuario = async (
  id_usuario: number,
  page = 1,
  limit = 5,
): Promise<any> => {
  return await RequestHttp(null, {
    base: "viajes",
    entry: "getPaginatedByUsuario",
    method: "GET"
  }, {
    id_usuario,
    page,
    limit
  })
}

export const createNewViaje = async (data: any): Promise<any> => {
  return await RequestHttp(data, {
    base: "viajes",
    entry: "createNewViaje",
    method: "POST"
  })
}

export interface CreateNewViajeDto {
  fk_usuario: number
  fk_cliente: number
  fk_origen: number
  fk_destino: number
  codigo: string
  observaciones?: string
  estado_viaje: boolean
  producto: string
  detalle_producto?: string
  direccion_llegada: string
  fecha_salida: string // formato ISO (e.g., 2025-07-08T10:00:00Z)
  fecha_llegada: string

  // Manifiesto
  flete_total: number
  porcentaje_retencion_fuente: number
  valor_retencion_fuente: number
  porcentaje_ica: number
  valor_ica: number
  deduccion_fiscal: number
  neto_a_pagar: number
  anticipo: number
  saldo_a_pagar: number
  total_gastos: number
  queda_al_carro: number
  a_favor_del_carro: number
  porcentaje_conductor: number
  ganancia_conductor: number
}