import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import NuevoClienteModal from "../NewViaje/NuevoClienteModal"

export default function DetallesViajeForm() {
  const [form, setForm] = useState({
    fk_usuario: "",
    fk_manifiesto: "",
    fk_cliente: "",
    fk_origen: "",
    fk_destino: "",
    codigo: "",
    observaciones: "",
    estado_viaje: false,
    producto: "",
    detalle_producto: "",
    direccion_llegada: "",
    fecha_salida: "",
    fecha_llegada: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target
    const { name, value, type } = target
    const isCheckbox = type === "checkbox"
    const checked = isCheckbox ? (target as HTMLInputElement).checked : undefined

    setForm((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setForm((prev) => ({ ...prev, estado_viaje: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado:", form)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="fk_usuario" placeholder="Usuario ID" value={form.fk_usuario} onChange={handleChange} />
        <Input name="fk_manifiesto" placeholder="Manifiesto ID" value={form.fk_manifiesto} onChange={handleChange} />

        <div className="flex gap-2">
          <Input
            name="fk_cliente"
            placeholder="Cliente ID"
            value={form.fk_cliente}
            onChange={handleChange}
            className="flex-1"
          />
          <NuevoClienteModal />
        </div>

        <Input name="fk_origen" placeholder="Origen ID" value={form.fk_origen} onChange={handleChange} />
        <Input name="fk_destino" placeholder="Destino ID" value={form.fk_destino} onChange={handleChange} />
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

      <div className="flex items-center space-x-2">
        <Checkbox
          id="estado_viaje"
          checked={form.estado_viaje}
          onCheckedChange={(checked) => handleCheckboxChange(Boolean(checked))}
        />
        <Label htmlFor="estado_viaje">¿Viaje activo?</Label>
      </div>

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Registrar viaje
      </Button>
    </form>
  )
}
