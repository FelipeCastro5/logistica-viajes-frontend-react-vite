import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Seguro = {
  id_seguro: number
  fk_vehiculo: number
  tipo_seguro: string
  numero_poliza: string
  aseguradora: string
  fecha_vencimiento: string
  valor: number
}

type Props = {
  seguros: Seguro[]
  activo: Seguro | null
  editable: boolean
  onChange: (s: Seguro) => void
  onSelect?: (s: Seguro) => void
}

export default function SeguroForm({ seguros, activo, editable, onChange, onSelect }: Props) {
  if (!activo) return null

  return (
    <div className="grid gap-4 pt-6">
<div>
  <Label>Seleccionar seguro</Label>
  <Select
    value={activo.id_seguro.toString()}
    onValueChange={(val) => {
      const seguro = seguros.find(s => s.id_seguro === Number(val))
      if (seguro && onSelect) onSelect(seguro)
    }}
  >
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {seguros.map(s => (
        <SelectItem key={s.id_seguro} value={s.id_seguro.toString()}>
          {s.tipo_seguro || "Seguro sin tipo"}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Aseguradora</Label>
          <Input readOnly={!editable} value={activo.aseguradora} onChange={e => onChange({ ...activo, aseguradora: e.target.value })} />
        </div>

        <div>
          <Label>Número de póliza</Label>
          <Input readOnly={!editable} value={activo.numero_poliza} onChange={e => onChange({ ...activo, numero_poliza: e.target.value })} />
        </div>

        <div>
          <Label>Fecha de vencimiento</Label>
          <Input type="date" readOnly={!editable} value={activo.fecha_vencimiento} onChange={e => onChange({ ...activo, fecha_vencimiento: e.target.value })} />
        </div>

        <div>
          <Label>Valor</Label>
          <Input type="number" readOnly={!editable} value={activo.valor} onChange={e => onChange({ ...activo, valor: Number(e.target.value) })} />
        </div>
      </div>
    </div>
  )
}
