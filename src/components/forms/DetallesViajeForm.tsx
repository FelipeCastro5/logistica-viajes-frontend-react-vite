import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import NuevoClienteModal from "../modals/NuevoClienteModal"
import { useDetallesViajeForm } from "@/hooks/forms/useDetallesViajeForm"
import { useEffect } from "react"

type ViajeData = {
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

type DetallesViajeFormProps = {
  id_viaje: number
  initialData: any
  onChange?: (newData: ViajeData) => void
}

export default function DetallesViajeForm({ id_viaje, initialData, onChange }: DetallesViajeFormProps) {
  const { form, setForm, clientes, noClientes, lugaresOrigen, lugaresDestino, noLugares, clienteSeleccionado, setClienteSeleccionado, handleChange, handleSelectChange, handleSubmit, handleClienteCreado, } = useDetallesViajeForm({ initialData, onChange })

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

      if (onChange) {
        onChange(parsedData)
      }
    }
  }, [initialData, clientes])

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cliente */}
        <div>
          <Label htmlFor="fk_cliente">Cliente</Label>
          <Select
            onValueChange={(val) => {
              handleSelectChange("fk_cliente", val)
              const cliente = clientes.find(
                (c) => c.id_cliente === parseInt(val)
              )
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
                  <SelectItem
                    key={cliente.id_cliente}
                    value={cliente.id_cliente.toString()}
                  >
                    {cliente.nombre_cliente}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Crear cliente */}
        <div>
          <Label>Crear nuevo cliente</Label>
          <NuevoClienteModal onClienteCreado={handleClienteCreado} />
        </div>

        {/* Info cliente */}
        <div>
          <Label htmlFor="nit_cliente">NIT Cliente</Label>
          <Input
            id="nit_cliente"
            name="nit_cliente"
            readOnly
            value={clienteSeleccionado?.nit_cliente ?? ""}
          />
        </div>

        <div>
          <Label htmlFor="telefono_cliente">Teléfono Cliente</Label>
          <Input
            id="telefono_cliente"
            name="telefono_cliente"
            readOnly
            value={clienteSeleccionado?.telefono_cliente ?? ""}
          />
        </div>

        {/* Origen */}
        <div>
          <Label htmlFor="fk_origen">Origen</Label>
          <Select
            onValueChange={(val) => handleSelectChange("fk_origen", val)}
            value={form.fk_origen?.toString() || ""}
          >
            <SelectTrigger id="fk_origen">
              <SelectValue placeholder="Selecciona origen" />
            </SelectTrigger>
            <SelectContent>
              {noLugares ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  No hay lugares disponibles
                </div>
              ) : (
                lugaresOrigen.map((lugar) => (
                  <SelectItem
                    key={lugar.id_lugar}
                    value={lugar.id_lugar.toString()}
                  >
                    {lugar.nombre_lugar}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Destino */}
        <div>
          <Label htmlFor="fk_destino">Destino</Label>
          <Select
            onValueChange={(val) => handleSelectChange("fk_destino", val)}
            value={form.fk_destino?.toString() || ""}
          >
            <SelectTrigger id="fk_destino">
              <SelectValue placeholder="Selecciona destino" />
            </SelectTrigger>
            <SelectContent>
              {noLugares ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  No hay lugares disponibles
                </div>
              ) : (
                lugaresDestino.map((lugar) => (
                  <SelectItem
                    key={lugar.id_lugar}
                    value={lugar.id_lugar.toString()}
                  >
                    {lugar.nombre_lugar}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Código */}
        <div>
          <Label htmlFor="codigo">Código de viaje</Label>
          <Input name="codigo" value={form.codigo} onChange={handleChange} />
        </div>

        {/* Producto */}
        <div>
          <Label htmlFor="producto">Nombre del Producto</Label>
          <Input name="producto" value={form.producto} onChange={handleChange} />
        </div>

        {/* Detalle producto */}
        <div>
          <Label htmlFor="detalle_producto">Detalle del producto</Label>
          <Input
            name="detalle_producto"
            value={form.detalle_producto}
            onChange={handleChange}
          />
        </div>

        {/* Dirección llegada */}
        <div>
          <Label htmlFor="direccion_llegada">Dirección de llegada</Label>
          <Input
            name="direccion_llegada"
            value={form.direccion_llegada}
            onChange={handleChange}
          />
        </div>

        {/* Fechas */}
        <div>
          <Label htmlFor="fecha_salida">Fecha de salida</Label>
          <Input
            type="date"
            name="fecha_salida"
            value={form.fecha_salida}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="fecha_llegada">Fecha de llegada</Label>
          <Input
            type="date"
            name="fecha_llegada"
            value={form.fecha_llegada}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Observaciones */}
      <div>
        <Label htmlFor="observaciones">Observaciones</Label>
        <Textarea
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
