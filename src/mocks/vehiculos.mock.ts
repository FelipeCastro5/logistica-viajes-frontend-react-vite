// src/mocks/vehiculos.mock.ts

// =====================
// Tipos (alineados a BD)
// =====================

export type Vehiculo = {
  id_vehiculo: number
  fk_usuario: number
  placa: string
  marca: string
  configuracion: string
  tipo_vehiculo: string
  peso_vacio: number
  peso_remolque: number
}

export type Seguro = {
  id_seguro: number
  fk_vehiculo: number
  tipo_seguro: string
  numero_poliza: string
  aseguradora: string
  fecha_vencimiento: string
  valor: number
}

// =====================
// Vehículos (6 total)
// =====================

export const VEHICULOS: Vehiculo[] = [
  // 🔹 Usuario 1
  {
    id_vehiculo: 1,
    fk_usuario: 1,
    placa: "ABC-101",
    marca: "Volvo",
    configuracion: "6x4",
    tipo_vehiculo: "Camión",
    peso_vacio: 8200,
    peso_remolque: 12000,
  },
  {
    id_vehiculo: 2,
    fk_usuario: 1,
    placa: "ABC-202",
    marca: "Scania",
    configuracion: "4x2",
    tipo_vehiculo: "Tráiler",
    peso_vacio: 9100,
    peso_remolque: 15000,
  },
  {
    id_vehiculo: 3,
    fk_usuario: 1,
    placa: "ABC-303",
    marca: "MAN",
    configuracion: "6x2",
    tipo_vehiculo: "Remolque",
    peso_vacio: 7000,
    peso_remolque: 13000,
  },

  // 🔹 Usuario 2
  {
    id_vehiculo: 4,
    fk_usuario: 2,
    placa: "XYZ-404",
    marca: "Kenworth",
    configuracion: "6x4",
    tipo_vehiculo: "Camión",
    peso_vacio: 8800,
    peso_remolque: 14000,
  },
  {
    id_vehiculo: 5,
    fk_usuario: 2,
    placa: "XYZ-505",
    marca: "Freightliner",
    configuracion: "4x2",
    tipo_vehiculo: "Tráiler",
    peso_vacio: 9300,
    peso_remolque: 15500,
  },
  {
    id_vehiculo: 6,
    fk_usuario: 2,
    placa: "XYZ-606",
    marca: "Iveco",
    configuracion: "4x4",
    tipo_vehiculo: "Camión",
    peso_vacio: 7600,
    peso_remolque: 12500,
  },
]

// =====================
// Seguros (18 total)
// =====================

export const SEGUROS: Seguro[] = [
  // 🚚 Vehículo 1
  {
    id_seguro: 1,
    fk_vehiculo: 1,
    tipo_seguro: "SOAT",
    numero_poliza: "SOAT-1-2024",
    aseguradora: "Seguros Bolívar",
    fecha_vencimiento: "2024-12-31",
    valor: 850000,
  },
  {
    id_seguro: 2,
    fk_vehiculo: 1,
    tipo_seguro: "Póliza de carga",
    numero_poliza: "PC-1-2024",
    aseguradora: "Sura",
    fecha_vencimiento: "2024-10-15",
    valor: 3200000,
  },
  {
    id_seguro: 3,
    fk_vehiculo: 1,
    tipo_seguro: "Todo riesgo",
    numero_poliza: "TR-1-2024",
    aseguradora: "Mapfre",
    fecha_vencimiento: "2025-03-01",
    valor: 5100000,
  },

  // 🚚 Vehículo 2
  {
    id_seguro: 4,
    fk_vehiculo: 2,
    tipo_seguro: "SOAT",
    numero_poliza: "SOAT-2-2024",
    aseguradora: "AXA Colpatria",
    fecha_vencimiento: "2024-11-20",
    valor: 870000,
  },
  {
    id_seguro: 5,
    fk_vehiculo: 2,
    tipo_seguro: "Póliza de carga",
    numero_poliza: "PC-2-2024",
    aseguradora: "Sura",
    fecha_vencimiento: "2024-09-10",
    valor: 3400000,
  },
  {
    id_seguro: 6,
    fk_vehiculo: 2,
    tipo_seguro: "Todo riesgo",
    numero_poliza: "TR-2-2024",
    aseguradora: "Liberty",
    fecha_vencimiento: "2025-01-18",
    valor: 4800000,
  },

  // 🚚 Vehículo 3
  {
    id_seguro: 7,
    fk_vehiculo: 3,
    tipo_seguro: "SOAT",
    numero_poliza: "SOAT-3-2024",
    aseguradora: "Seguros del Estado",
    fecha_vencimiento: "2024-08-30",
    valor: 820000,
  },
  {
    id_seguro: 8,
    fk_vehiculo: 3,
    tipo_seguro: "Póliza de carga",
    numero_poliza: "PC-3-2024",
    aseguradora: "Sura",
    fecha_vencimiento: "2024-12-05",
    valor: 3100000,
  },
  {
    id_seguro: 9,
    fk_vehiculo: 3,
    tipo_seguro: "Todo riesgo",
    numero_poliza: "TR-3-2024",
    aseguradora: "Allianz",
    fecha_vencimiento: "2025-06-12",
    valor: 4700000,
  },

  // 🚚 Vehículo 4
  {
    id_seguro: 10,
    fk_vehiculo: 4,
    tipo_seguro: "SOAT",
    numero_poliza: "SOAT-4-2024",
    aseguradora: "Mapfre",
    fecha_vencimiento: "2024-07-19",
    valor: 880000,
  },
  {
    id_seguro: 11,
    fk_vehiculo: 4,
    tipo_seguro: "Póliza de carga",
    numero_poliza: "PC-4-2024",
    aseguradora: "Sura",
    fecha_vencimiento: "2024-11-02",
    valor: 3600000,
  },
  {
    id_seguro: 12,
    fk_vehiculo: 4,
    tipo_seguro: "Todo riesgo",
    numero_poliza: "TR-4-2024",
    aseguradora: "Liberty",
    fecha_vencimiento: "2025-02-22",
    valor: 5200000,
  },

  // 🚚 Vehículo 5
  {
    id_seguro: 13,
    fk_vehiculo: 5,
    tipo_seguro: "SOAT",
    numero_poliza: "SOAT-5-2024",
    aseguradora: "AXA Colpatria",
    fecha_vencimiento: "2024-09-14",
    valor: 900000,
  },
  {
    id_seguro: 14,
    fk_vehiculo: 5,
    tipo_seguro: "Póliza de carga",
    numero_poliza: "PC-5-2024",
    aseguradora: "Seguros Bolívar",
    fecha_vencimiento: "2024-12-28",
    valor: 3500000,
  },
  {
    id_seguro: 15,
    fk_vehiculo: 5,
    tipo_seguro: "Todo riesgo",
    numero_poliza: "TR-5-2024",
    aseguradora: "Allianz",
    fecha_vencimiento: "2025-05-10",
    valor: 4900000,
  },

  // 🚚 Vehículo 6
  {
    id_seguro: 16,
    fk_vehiculo: 6,
    tipo_seguro: "SOAT",
    numero_poliza: "SOAT-6-2024",
    aseguradora: "Seguros del Estado",
    fecha_vencimiento: "2024-10-01",
    valor: 830000,
  },
  {
    id_seguro: 17,
    fk_vehiculo: 6,
    tipo_seguro: "Póliza de carga",
    numero_poliza: "PC-6-2024",
    aseguradora: "Sura",
    fecha_vencimiento: "2024-08-18",
    valor: 3000000,
  },
  {
    id_seguro: 18,
    fk_vehiculo: 6,
    tipo_seguro: "Todo riesgo",
    numero_poliza: "TR-6-2024",
    aseguradora: "Mapfre",
    fecha_vencimiento: "2025-04-07",
    valor: 4600000,
  },
]
