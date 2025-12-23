// src/types/viajes.ts
export type ViajeData = {
  id_viaje?: number
  fk_manifiesto?: number
  estado_viaje?: boolean
  fk_usuario?: number
  fk_cliente?: number
  fk_origen?: number
  fk_destino?: number
  codigo?: string
  producto?: string
  detalle_producto?: string
  direccion_llegada?: string
  fecha_salida?: string
  fecha_llegada?: string
  observaciones?: string
}
