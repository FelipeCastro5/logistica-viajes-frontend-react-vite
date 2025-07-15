import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import NuevoClienteModal from "../modals/NuevoClienteModal"
import { useDetallesViajeForm } from "@/hooks/forms/useDetallesViajeForm"

export default function DetallesViajeForm() {
  const {
    form, clientes, noClientes, lugaresOrigen, lugaresDestino, noLugares, clienteSeleccionado,
    setClienteSeleccionado, fetchClientes, handleChange, handleSelectChange, handleSubmit,
  } = useDetallesViajeForm()

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cliente */}
        <div>
          <Label>Cliente</Label>
          <Select
            onValueChange={(val) => {
              handleSelectChange("fk_cliente", val)
              const cliente = clientes.find(c => c.id_cliente === parseInt(val))
              setClienteSeleccionado(cliente ?? null)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un cliente" />
            </SelectTrigger>
            <SelectContent>
              {noClientes ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">No hay clientes disponibles</div>
              ) : (
                clientes.map(cliente => (
                  <SelectItem key={cliente.id_cliente} value={cliente.id_cliente.toString()}>
                    {cliente.nombre_cliente}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Crear un nuevo Cliente (opcional)</Label>
          <NuevoClienteModal onClienteCreado={fetchClientes} />
        </div>

        <div>
          <Label htmlFor="nit_cliente">NIT Cliente</Label>
          <Input id="nit_cliente" name="nit_cliente" readOnly value={clienteSeleccionado?.nit_cliente ?? ""} />
        </div>

        <div>
          <Label htmlFor="telefono">Teléfono Cliente</Label>
          <Input id="telefono" name="telefono" readOnly value={clienteSeleccionado?.telefono_cliente ?? ""} />
        </div>

        <div>
          <Label>Origen</Label>
          <Select onValueChange={val => handleSelectChange("fk_origen", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona origen" />
            </SelectTrigger>
            <SelectContent>
              {noLugares ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">No hay lugares disponibles</div>
              ) : (
                lugaresOrigen.map(lugar => (
                  <SelectItem key={lugar.id_lugar} value={lugar.id_lugar.toString()}>
                    {lugar.nombre_lugar}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Destino</Label>
          <Select onValueChange={val => handleSelectChange("fk_destino", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona destino" />
            </SelectTrigger>
            <SelectContent>
              {noLugares ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">No hay lugares disponibles</div>
              ) : (
                lugaresDestino.map(lugar => (
                  <SelectItem key={lugar.id_lugar} value={lugar.id_lugar.toString()}>
                    {lugar.nombre_lugar}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="codigo">Código de viaje</Label>
          <Input name="codigo" value={form.codigo} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="producto">Nombre del Producto</Label>
          <Input name="producto" value={form.producto} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="detalle_producto">Detalle del producto</Label>
          <Input name="detalle_producto" value={form.detalle_producto} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="direccion_llegada">Dirección de llegada</Label>
          <Input name="direccion_llegada" value={form.direccion_llegada} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="fecha_salida">Fecha de salida</Label>
          <Input type="date" name="fecha_salida" value={form.fecha_salida} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="fecha_llegada">Fecha de llegada</Label>
          <Input type="date" name="fecha_llegada" value={form.fecha_llegada} onChange={handleChange} />
        </div>
      </div>

      <Label htmlFor="observaciones">Observaciones</Label>
      <Textarea
        name="observaciones"
        value={form.observaciones}
        onChange={handleChange}
        placeholder="Observaciones"
        className="min-h-[80px]"
      />
    </form>
  )
}