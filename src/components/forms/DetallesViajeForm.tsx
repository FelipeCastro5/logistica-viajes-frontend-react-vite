// DetallesViajeForm.tsx
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import NuevoClienteModal from "../modals/NuevoClienteModal"
import { useDetallesViajeForm } from "@/hooks/forms/useDetallesViajeForm"
import { useEffect } from "react"

import type { ViajeData } from "@/hooks/forms/viaje"

type DetallesViajeFormProps = {
  id_viaje?: number | null
  initialData?: Partial<ViajeData>
  modo?: "crear" | "editar" // <- AÑADE ESTE
  onChange?: (newData: ViajeData) => void
}

export default function DetallesViajeForm({ id_viaje, initialData, modo = "crear", onChange }: DetallesViajeFormProps) {
  const {
    form,
    setForm,
    clientes,
    noClientes,
    lugaresOrigen,
    lugaresDestino,
    noLugares,
    clienteSeleccionado,
    setClienteSeleccionado,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleClienteCreado,
  } = useDetallesViajeForm({ id_viaje: id_viaje ?? 0, initialData, modo, onChange })

  const { user } = useAuth()
  const isContador = user?.nombre_rol === "Contador"

  useEffect(() => {
    if (initialData) {
      const parsedData = {
        ...initialData,
        fecha_salida: initialData.fecha_salida?.split("T")[0] || "",
        fecha_llegada: initialData.fecha_llegada?.split("T")[0] || "",
      }

      setForm((prev) => ({ ...prev, ...parsedData }))

      const cliente = clientes.find((c) => c.id_cliente === initialData.fk_cliente)
      setClienteSeleccionado(cliente ?? null)

      if (onChange && !isContador) {
        onChange(parsedData as ViajeData)
      }
    }
  }, [initialData])

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cliente */}
        <div>
          <Label htmlFor="fk_cliente">Cliente</Label>
          <Select
            disabled={isContador}
            onValueChange={(val) => {
              handleSelectChange("fk_cliente", val)
              const cliente = clientes.find((c) => c.id_cliente === parseInt(val))
              setClienteSeleccionado(cliente ?? null)
            }}
            value={form.fk_cliente?.toString() || ""}
          >
            <SelectTrigger id="fk_cliente">
              <SelectValue placeholder="Selecciona un cliente" />
            </SelectTrigger>
            <SelectContent>
              {noClientes ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  No hay clientes disponibles
                </div>
              ) : (
                clientes.map((cliente) => (
                  <SelectItem key={cliente.id_cliente} value={cliente.id_cliente.toString()}>
                    {cliente.nombre_cliente}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Crear cliente */}
        {!isContador && (
          <div>
            <Label>Crear nuevo cliente</Label>
            <NuevoClienteModal onClienteCreado={handleClienteCreado} />
          </div>
        )}

        {/* Info cliente */}
        <div>
          <Label htmlFor="nit_cliente">NIT Cliente</Label>
          <Input id="nit_cliente" name="nit_cliente" readOnly value={clienteSeleccionado?.nit_cliente ?? ""} />
        </div>

        <div>
          <Label htmlFor="telefono_cliente">Teléfono Cliente</Label>
          <Input id="telefono_cliente" name="telefono_cliente" readOnly value={clienteSeleccionado?.telefono_cliente ?? ""} />
        </div>

        {/* Origen */}
        <div>
          <Label htmlFor="fk_origen">Origen</Label>
          <Select
            disabled={isContador} onValueChange={(val) => handleSelectChange("fk_origen", val)} value={form.fk_origen?.toString() || ""}>
            <SelectTrigger id="fk_origen">
              <SelectValue placeholder="Selecciona origen" />
            </SelectTrigger>
            <SelectContent>
              {noLugares ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">No hay lugares disponibles</div>
              ) : (
                lugaresOrigen.map((lugar) => (
                  <SelectItem key={lugar.id_lugar} value={lugar.id_lugar.toString()}>
                    {lugar.nombre_lugar}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div></div>
        
        <div>
          <Label htmlFor="latitud_origen">Latitud origen</Label>
          <Input
            type="number"
            step="0.000001"
            name="latitud_origen"
            readOnly={isContador}
            value={form.latitud_origen}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                latitud_origen: Number(e.target.value),
              }))
            }
          />
        </div>

        <div>
          <Label htmlFor="longitud_origen">Longitud origen</Label>
          <Input
            type="number"
            step="0.000001"
            name="longitud_origen"
            readOnly={isContador}
            value={form.longitud_origen}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                longitud_origen: Number(e.target.value),
              }))
            }
          />
        </div>

        {/* Destino */}
        <div>
          <Label htmlFor="fk_destino">Destino</Label>
          <Select
            disabled={isContador} onValueChange={(val) => handleSelectChange("fk_destino", val)} value={form.fk_destino?.toString() || ""}>
            <SelectTrigger id="fk_destino">
              <SelectValue placeholder="Selecciona destino" />
            </SelectTrigger>
            <SelectContent>
              {noLugares ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">No hay lugares disponibles</div>
              ) : (
                lugaresDestino.map((lugar) => (
                  <SelectItem key={lugar.id_lugar} value={lugar.id_lugar.toString()}>
                    {lugar.nombre_lugar}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="direccion_llegada">Dirección de llegada</Label>
          <Input readOnly={isContador} name="direccion_llegada" value={form.direccion_llegada} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="latitud_destino">Latitud destino</Label>
          <Input
            type="number"
            step="0.000001"
            name="latitud_destino"
            readOnly={isContador}
            value={form.latitud_destino}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                latitud_destino: Number(e.target.value),
              }))
            }
          />
        </div>

        <div>
          <Label htmlFor="longitud_destino">Longitud destino</Label>
          <Input
            type="number"
            step="0.000001"
            name="longitud_destino"
            readOnly={isContador}
            value={form.longitud_destino}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                longitud_destino: Number(e.target.value),
              }))
            }
          />
        </div>

        <div>
          <Label htmlFor="codigo">Código de viaje</Label>
          <Input readOnly={isContador} name="codigo" value={form.codigo} onChange={handleChange} />
        </div>

        <div></div>

        <div>
          <Label htmlFor="producto">Nombre del Producto</Label>
          <Input readOnly={isContador} name="producto" value={form.producto} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="detalle_producto">Detalle del producto</Label>
          <Input readOnly={isContador} name="detalle_producto" value={form.detalle_producto} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="fecha_salida">Fecha de salida</Label>
          <Input readOnly={isContador} type="date" name="fecha_salida" value={form.fecha_salida} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="hora_salida">Hora de salida</Label>
          <Input
            type="time"
            name="hora_salida"
            readOnly={isContador}
            value={form.hora_salida}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="fecha_llegada">Fecha de llegada</Label>
          <Input readOnly={isContador} type="date" name="fecha_llegada" value={form.fecha_llegada} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="hora_llegada">Hora de llegada</Label>
          <Input
            type="time"
            name="hora_llegada"
            readOnly={isContador}
            value={form.hora_llegada}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="horas_pactadas_cargue">Horas pactadas de cargue</Label>
          <Input
            type="number"
            step="0.01"
            name="horas_pactadas_cargue"
            readOnly={isContador}
            value={form.horas_pactadas_cargue}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                horas_pactadas_cargue: Number(e.target.value),
              }))
            }
          />
        </div>

        <div>
          <Label htmlFor="horas_pactadas_descargue">Horas pactadas de descargue</Label>
          <Input
            type="number"
            step="0.01"
            name="horas_pactadas_descargue"
            readOnly={isContador}
            value={form.horas_pactadas_descargue}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                horas_pactadas_descargue: Number(e.target.value),
              }))
            }
          />
        </div>
        <div>
          <Label htmlFor="exoneracion_legal">Exoneración legal</Label>
          <Textarea
            name="exoneracion_legal"
            readOnly={isContador}
            value={form.exoneracion_legal}
            onChange={handleChange}
            placeholder="Describe la exoneración legal (si aplica)"
            className="min-h-[80px]"
          />
        </div>

      </div>

      <div>
        <Label htmlFor="observaciones">Observaciones</Label>
        <Textarea readOnly={isContador}
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
          placeholder="Observaciones del viaje"
          className="min-h-[80px]"
        />
      </div>
    </form>
  )
}
