import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth"
import { useRemesaForm } from "@/hooks/forms/useRemesaForm"
import type { RemesaFormData } from "@/hooks/forms/useRemesaForm"

type RemesaFormProps = {
  initialData?: Partial<RemesaFormData>
  onChange?: (data: RemesaFormData) => void
}

export default function RemesaForm({ initialData, onChange }: RemesaFormProps) {
  const { user } = useAuth()
  const isContador = user?.nombre_rol === "Contador"

  const { form, handleChange, setField } =
    useRemesaForm(initialData, onChange)

  return (
    <form className="grid gap-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <Label>Número de Remesa</Label>
          <Input
            name="numero_remesa"
            disabled={isContador}
            value={form.numero_remesa}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Número de Autorización</Label>
          <Input
            name="numero_autorizacion"
            disabled={isContador}
            value={form.numero_autorizacion}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Naturaleza de la Carga</Label>
          <Select
            disabled={isContador}
            value={form.naturaleza_carga}
            onValueChange={(v) => setField("naturaleza_carga", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona naturaleza" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="Perecedera">Perecedera</SelectItem>
              <SelectItem value="Peligrosa">Peligrosa</SelectItem>
              <SelectItem value="Fragil">Frágil</SelectItem>
              <SelectItem value="Granel">Granel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Tipo de Empaque</Label>
          <Select
            disabled={isContador}
            value={form.tipo_empaque}
            onValueChange={(v) => setField("tipo_empaque", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona empaque" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Caja">Caja</SelectItem>
              <SelectItem value="Saco">Saco</SelectItem>
              <SelectItem value="Pallet">Pallet</SelectItem>
              <SelectItem value="Contenedor">Contenedor</SelectItem>
              <SelectItem value="Cisterna">Cisterna</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Cantidad</Label>
          <Input
            type="number"
            name="cantidad"
            disabled={isContador}
            value={form.cantidad}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Unidad de Medida</Label>
          <Select
            disabled={isContador}
            value={form.unidad_medida}
            onValueChange={(v) => setField("unidad_medida", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona unidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kg</SelectItem>
              <SelectItem value="ton">Toneladas</SelectItem>
              <SelectItem value="cajas">Cajas</SelectItem>
              <SelectItem value="unidades">Unidades</SelectItem>
              <SelectItem value="litros">Litros</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Peso Total</Label>
          <Input
            type="number"
            name="peso_total"
            disabled={isContador}
            value={form.peso_total}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-full">
          <Label>¿Mercancía peligrosa?</Label>
          <Select
            disabled={isContador}
            value={form.mercancia_peligrosa ? "si" : "no"}
            onValueChange={(v) =>
              setField("mercancia_peligrosa", v === "si")
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="si">Sí</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {form.mercancia_peligrosa && (
          <div className="col-span-full border rounded-md p-4 bg-yellow-50 dark:bg-yellow-900/20">
            <h4 className="font-semibold mb-3">⚠️ Mercancía peligrosa</h4>

            <div className="grid md:grid-cols-2 gap-4">
              <Input name="codigo_un" value={form.codigo_un} onChange={handleChange} placeholder="Código UN" />
              <Input name="grupo_riesgo" value={form.grupo_riesgo} onChange={handleChange} placeholder="Grupo de riesgo" />
              <Input name="caracteristica_peligrosidad" value={form.caracteristica_peligrosidad} onChange={handleChange} placeholder="Característica" />
              <Input name="embalaje_envase" value={form.embalaje_envase} onChange={handleChange} placeholder="Embalaje / Envase" />
            </div>
          </div>
        )}
      </div>

      <div>
        <Label>Observaciones</Label>
        <Textarea
          name="observaciones_remesa"
          value={form.observaciones_remesa}
          onChange={handleChange}
        />
      </div>
    </form>
  )
}
