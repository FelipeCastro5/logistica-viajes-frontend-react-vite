import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export default function DetallesViajeForm() {
  const [form, setForm] = useState({
    // Campos ocultos
    id_viaje: 1,
    fk_usuario: 123,
    fk_manifiesto: 456,
    estado_viaje: true,

    // Campos visibles
    fk_cliente: 0,
    fk_origen: 0,
    fk_destino: 0,
    codigo: "",
    observaciones: "",
    producto: "",
    detalle_producto: "",
    direccion_llegada: "",
    fecha_salida: "",
    fecha_llegada: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: parseInt(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos enviados:", form)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cliente */}
        <div>
          <Label>Cliente</Label>
          <Select onValueChange={(val) => handleSelectChange("fk_cliente", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Cliente A</SelectItem>
              <SelectItem value="2">Cliente B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Origen */}
        <div>
          <Label>Origen</Label>
          <Select onValueChange={(val) => handleSelectChange("fk_origen", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona origen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Origen A</SelectItem>
              <SelectItem value="2">Origen B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Destino */}
        <div>
          <Label>Destino</Label>
          <Select onValueChange={(val) => handleSelectChange("fk_destino", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona destino" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Destino A</SelectItem>
              <SelectItem value="2">Destino B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input name="codigo" placeholder="Código de viaje" value={form.codigo} onChange={handleChange} />
        <Input name="producto" placeholder="Producto" value={form.producto} onChange={handleChange} />
        <Input name="detalle_producto" placeholder="Detalle del producto" value={form.detalle_producto} onChange={handleChange} />
        <Input name="direccion_llegada" placeholder="Dirección de llegada" value={form.direccion_llegada} onChange={handleChange} />
        <Input type="date" name="fecha_salida" value={form.fecha_salida} onChange={handleChange} />
        <Input type="date" name="fecha_llegada" value={form.fecha_llegada} onChange={handleChange} />
      </div>

      <Textarea
        name="observaciones"
        placeholder="Observaciones"
        value={form.observaciones}
        onChange={handleChange}
        className="min-h-[80px]"
      />

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Registrar viaje
      </Button>
    </form>
  )
}
