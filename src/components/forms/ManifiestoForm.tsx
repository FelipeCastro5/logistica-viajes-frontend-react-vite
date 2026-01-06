// components/ManifiestoForm.tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
//import { Button } from "@/components/ui/button"
import { useManifiestoForm } from "@/hooks/forms/useManifiestoForm"
import { formatNumber } from "@/hooks/utils/formatNumberCOP"
import { useAuth } from "@/hooks/useAuth"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

type ManifiestoFormProps = {
  id_viaje?: number
  initialData?: any // O idealmente `Partial<ManifiestoFormData>` si ya tienes ese tipo
  onChange?: (data: any) => void
}

export default function ManifiestoForm({ initialData, onChange }: ManifiestoFormProps) {
  const { form, handleChange, handleSubmit, setField } = useManifiestoForm(initialData, onChange)

  const { user } = useAuth()
  const isContador = user?.nombre_rol === "Contador"

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campos de entrada */}
        <div>
          <Label>Vehículo</Label>
          <Select
            disabled={isContador}
            value={form.fk_vehiculo ? String(form.fk_vehiculo) : ""}
            onValueChange={(value) => setField("fk_vehiculo", Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un vehículo" />
            </SelectTrigger>

            <SelectContent>
              {/* 🔥 QUEMADOS POR AHORA */}
              <SelectItem value="1">ABC123 - Camión</SelectItem>
              <SelectItem value="5">XYZ789 - Tractomula</SelectItem>
              <SelectItem value="4">JKL456 - Remolque</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Flete Total</Label>
          <Input disabled={isContador} name="flete_total" value={form.flete_total} onChange={handleChange} type="number" step="0.01" />
          <div className="text-sm text-gray-500 mt-1">{formatNumber(form.flete_total)}</div>
        </div>

        <div>
          <Label>Anticipo</Label>
          <Input disabled={isContador} name="anticipo" value={form.anticipo} onChange={handleChange} type="number" step="0.01" />
          <div className="text-sm text-gray-500 mt-1">{formatNumber(form.anticipo)}</div>
        </div>

        <div>
          <Label><br />% Retención Fuente</Label>
          <Input disabled={isContador} name="porcentaje_retencion_fuente" value={form.porcentaje_retencion_fuente} onChange={handleChange} type="number" step="0.0001" />
          <div className="text-sm text-gray-500 mt-1">
            {form.porcentaje_retencion_fuente.toFixed(4)}%
          </div>
        </div>

        <div><Label>Valor Retención Fuente <br /> (Flete % Retencion Fuente)</Label><Input value={formatNumber(form.valor_retencion_fuente)} readOnly /></div>

        <div>
          <Label><br />% ICA</Label>
          <Input disabled={isContador} name="porcentaje_ica" value={form.porcentaje_ica} onChange={handleChange} type="number" step="0.0001" />
          <div className="text-sm text-gray-500 mt-1">{form.porcentaje_ica.toFixed(4)}%</div>
        </div>

        <div><Label>Valor ICA <br /> (Flete * % ICA)</Label><Input value={formatNumber(form.valor_ica)} readOnly /></div>

        <div>
          <Label><br />% Conductor</Label>
          <Input disabled={isContador} name="porcentaje_conductor" value={form.porcentaje_conductor} onChange={handleChange} type="number" step="0.0001" />
          <div className="text-sm text-gray-500 mt-1">{form.porcentaje_conductor.toFixed(4)}%</div>
        </div>

        <div><Label>Ganancia del Conductor <br /> (Flete % Conductor)</Label><Input value={formatNumber(form.ganancia_conductor)} readOnly /></div>
        <div><Label>Deducción Fiscal <br /> (Valor retencion Fuente + Valor ICA)</Label><Input value={formatNumber(form.deduccion_fiscal)} readOnly /></div>
        <div><Label><br />Total Gastos</Label><Input value={formatNumber(form.total_gastos)} readOnly /></div>
        <div><Label>Neto a Pagar <br /> (Flete - Deducción Fiscal)</Label><Input value={formatNumber(form.neto_a_pagar)} readOnly /></div>
        <div><Label>Saldo a Pagar <br /> (Neto a Pagar - Anticipo)</Label><Input value={formatNumber(form.saldo_a_pagar)} readOnly /></div>
        <div><Label>Queda al Carro <br /> (Saldo a Pagar - Gastos)</Label><Input value={formatNumber(form.queda_al_carro)} readOnly /></div>
        <div><Label>A favor del Carro <br /> (Anticipo - Gastos)</Label><Input value={formatNumber(form.a_favor_del_carro)} readOnly /></div>
      </div>

      {/* <div className="flex justify-end">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Registrar manifiesto
        </Button>
      </div> */}
    </form>
  )
}
