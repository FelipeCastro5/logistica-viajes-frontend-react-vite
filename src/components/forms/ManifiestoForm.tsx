// components/ManifiestoForm.tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
//import { Button } from "@/components/ui/button"
import { useManifiestoForm } from "@/hooks/forms/useManifiestoForm"

type ManifiestoFormProps = {
  id_viaje?: number
  initialData?: any // O idealmente `Partial<ManifiestoFormData>` si ya tienes ese tipo
  onChange?: (data: any) => void
}

const formatNumber = (num: number): string => {
  if (isNaN(num)) return ""
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  }).format(num)
}

export default function ManifiestoForm({ initialData, onChange  }: ManifiestoFormProps) {
  const { form, handleChange, handleSubmit } = useManifiestoForm(initialData, onChange)

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campos de entrada */}
        <div>
          <Label>Flete Total</Label>
          <Input name="flete_total" value={form.flete_total} onChange={handleChange} type="number" step="0.01" />
          <div className="text-sm text-gray-500 mt-1">{formatNumber(form.flete_total)}</div>
        </div>

        <div>
          <Label>% Retención Fuente</Label>
          <Input name="porcentaje_retencion_fuente" value={form.porcentaje_retencion_fuente} onChange={handleChange} type="number" step="0.0001" />
          <div className="text-sm text-gray-500 mt-1">
            {form.porcentaje_retencion_fuente.toFixed(4)}%
          </div>
        </div>

        <div>
          <Label>% ICA</Label>
          <Input name="porcentaje_ica" value={form.porcentaje_ica} onChange={handleChange} type="number" step="0.0001" />
        </div>

        <div>
          <Label>Anticipo</Label>
          <Input name="anticipo" value={form.anticipo} onChange={handleChange} type="number" step="0.01" />
        </div>

        <div>
          <Label>Total Gastos</Label>
          <Input name="total_gastos" value={form.total_gastos} onChange={handleChange} type="number" step="0.01" />
        </div>

        <div>
          <Label>% Conductor</Label>
          <Input name="porcentaje_conductor" value={form.porcentaje_conductor} onChange={handleChange} type="number" step="0.0001" />
        </div>

        {/* Campos calculados */}
        <div><Label>Valor Retención Fuente</Label><Input value={formatNumber(form.valor_retencion_fuente)} readOnly /></div>
        <div><Label>Valor ICA</Label><Input value={formatNumber(form.valor_ica)} readOnly /></div>
        <div><Label>Deducción Fiscal</Label><Input value={formatNumber(form.deduccion_fiscal)} readOnly /></div>
        <div><Label>Neto a Pagar</Label><Input value={formatNumber(form.neto_a_pagar)} readOnly /></div>
        <div><Label>Saldo a Pagar</Label><Input value={formatNumber(form.saldo_a_pagar)} readOnly /></div>
        <div><Label>Queda al Carro</Label><Input value={formatNumber(form.queda_al_carro)} readOnly /></div>
        <div><Label>A favor del Carro</Label><Input value={formatNumber(form.a_favor_del_carro)} readOnly /></div>
        <div><Label>Ganancia del Conductor</Label><Input value={formatNumber(form.ganancia_conductor)} readOnly /></div>
      </div>

      {/* <div className="flex justify-end">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Registrar manifiesto
        </Button>
      </div> */}
    </form>
  )
}
