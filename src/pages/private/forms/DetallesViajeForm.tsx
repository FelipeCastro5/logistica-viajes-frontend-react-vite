import { useEffect, useState } from "react"
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

type DetallesViajeFormData = {
  id_viaje: number
  fk_usuario: number
  fk_manifiesto: number
  estado_viaje: boolean
  fk_cliente: number
  fk_origen: number
  fk_destino: number
  codigo: string
  observaciones: string
  producto: string
  detalle_producto: string
  direccion_llegada: string
  fecha_salida: string
  fecha_llegada: string
}

export default function DetallesViajeForm({
  onFormChange,
  initialData,
}: {
  onFormChange: (data: any) => void
  initialData?: any
}) {
  const [formData, setForm] = useState<DetallesViajeFormData>(() =>
    initialData || {
      id_viaje: 1,
      fk_usuario: 123,
      fk_manifiesto: 456,
      estado_viaje: true,
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
    }
  )

  useEffect(() => {
    onFormChange(formData)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev: DetallesViajeFormData) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setForm((prev: DetallesViajeFormData) => ({ ...prev, [field]: parseInt(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos enviados:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cliente */}
        <div>
          <Label>Cliente</Label>
<Select value={formData.fk_cliente.toString()} onValueChange={(val) => handleSelectChange("fk_cliente", val)}>
  <SelectTrigger>
    <SelectValue />
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
<Select value={formData.fk_origen.toString()} onValueChange={(val) => handleSelectChange("fk_origen", val)}>
  <SelectTrigger>
    <SelectValue />
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
<Select value={formData.fk_destino.toString()} onValueChange={(val) => handleSelectChange("fk_destino", val)}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Destino A</SelectItem>
    <SelectItem value="2">Destino B</SelectItem>
  </SelectContent>
</Select>
        </div>

        <Input name="codigo" placeholder="Código de viaje" value={formData.codigo} onChange={handleChange} />
        <Input name="producto" placeholder="Producto" value={formData.producto} onChange={handleChange} />
        <Input name="detalle_producto" placeholder="Detalle del producto" value={formData.detalle_producto} onChange={handleChange} />
        <Input name="direccion_llegada" placeholder="Dirección de llegada" value={formData.direccion_llegada} onChange={handleChange} />
        <Input type="date" name="fecha_salida" value={formData.fecha_salida} onChange={handleChange} />
        <Input type="date" name="fecha_llegada" value={formData.fecha_llegada} onChange={handleChange} />
      </div>

      <Textarea
        name="observaciones"
        placeholder="Observaciones"
        value={formData.observaciones}
        onChange={handleChange}
        className="min-h-[80px]"
      />

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Registrar viaje
      </Button>
    </form>
  )
}
