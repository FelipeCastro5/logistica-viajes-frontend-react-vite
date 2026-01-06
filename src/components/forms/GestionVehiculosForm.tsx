// components/GestionVehiculosForm.tsx
// 👉 Diseño conceptual (UI + estado local). Sin adapters ni backend.

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// =====================
// Tipos conceptuales
// =====================

type Vehiculo = {
  id_vehiculo: number
  placa: string
  marca: string
  tipo_vehiculo: string
  configuracion: string
  peso_vacio: number
  peso_remolque: number
}

type Seguro = {
  id_seguro: number
  tipo_seguro: string
  numero_poliza: string
  aseguradora: string
  fecha_vencimiento: string
  valor: number
}

// =====================
// Data mock (ejemplo)
// =====================

const VEHICULOS: Vehiculo[] = [
  {
    id_vehiculo: 1,
    placa: "ABC123",
    marca: "Kenworth",
    tipo_vehiculo: "Camión",
    configuracion: "6x4",
    peso_vacio: 8500,
    peso_remolque: 12000,
  },
]

const SEGUROS: Seguro[] = [
  {
    id_seguro: 1,
    tipo_seguro: "SOAT",
    numero_poliza: "SOAT-2024-001",
    aseguradora: "Seguros Bolívar",
    fecha_vencimiento: "2024-12-31",
    valor: 850000,
  },
  {
    id_seguro: 2,
    tipo_seguro: "Póliza de carga",
    numero_poliza: "PC-2023-778",
    aseguradora: "Sura",
    fecha_vencimiento: "2023-10-15",
    valor: 3200000,
  },
]

// =====================
// Componente
// =====================

export default function GestionVehiculosForm() {
  const [filtroPlaca, setFiltroPlaca] = useState("")
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<Vehiculo | null>(null)
  const [seguroActivo, setSeguroActivo] = useState<Seguro | null>(null)

  const buscarVehiculo = () => {
    const vehiculo = VEHICULOS.find(v => v.placa === filtroPlaca.toUpperCase())
    setVehiculoSeleccionado(vehiculo ?? null)
    setSeguroActivo(SEGUROS[0]) // conceptual: seguro activo
  }

  return (
    <div className="grid gap-6 max-w-5xl mx-auto">

      {/* ===================== */}
      {/* Buscador por placa */}
      {/* ===================== */}
      <Card>
        <CardContent className="grid gap-4 pt-6">
          <Label>Buscar vehículo por placa</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Ej: ABC123"
              value={filtroPlaca}
              onChange={(e) => setFiltroPlaca(e.target.value)}
            />
            <button
              onClick={buscarVehiculo}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Buscar
            </button>
          </div>
        </CardContent>
      </Card>

      {/* ===================== */}
      {/* Info del vehículo */}
      {/* ===================== */}
      {vehiculoSeleccionado && (
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <h2 className="md:col-span-2 text-lg font-semibold">Información del vehículo</h2>

            <div>
              <Label>Placa</Label>
              <Input readOnly value={vehiculoSeleccionado.placa} />
            </div>
            <div>
              <Label>Marca</Label>
              <Input readOnly value={vehiculoSeleccionado.marca} />
            </div>
            <div>
              <Label>Tipo</Label>
              <Input readOnly value={vehiculoSeleccionado.tipo_vehiculo} />
            </div>
            <div>
              <Label>Configuración</Label>
              <Input readOnly value={vehiculoSeleccionado.configuracion} />
            </div>
            <div>
              <Label>Peso vacío (kg)</Label>
              <Input readOnly value={vehiculoSeleccionado.peso_vacio} />
            </div>
            <div>
              <Label>Peso remolque (kg)</Label>
              <Input readOnly value={vehiculoSeleccionado.peso_remolque} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===================== */}
      {/* Gestión de seguros */}
      {/* ===================== */}
      {seguroActivo && (
        <Card>
          <CardContent className="grid gap-4 pt-6">
            <h2 className="text-lg font-semibold">Seguro del vehículo</h2>

            <Select
              onValueChange={(val) => {
                const seguro = SEGUROS.find(s => s.id_seguro === Number(val))
                setSeguroActivo(seguro ?? null)
              }}
              value={seguroActivo.id_seguro.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una póliza" />
              </SelectTrigger>
              <SelectContent>
                {SEGUROS.map(s => (
                  <SelectItem key={s.id_seguro} value={s.id_seguro.toString()}>
                    {s.tipo_seguro} · vence {s.fecha_vencimiento}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Aseguradora</Label>
                <Input readOnly value={seguroActivo.aseguradora} />
              </div>
              <div>
                <Label>Número póliza</Label>
                <Input readOnly value={seguroActivo.numero_poliza} />
              </div>
              <div>
                <Label>Fecha vencimiento</Label>
                <Input type="date" readOnly value={seguroActivo.fecha_vencimiento} />
              </div>
              <div>
                <Label>Valor</Label>
                <Input readOnly value={seguroActivo.valor} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  )
}
