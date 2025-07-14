import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const formatNumber = (num: number): string => {
  if (isNaN(num)) return ""

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  }).format(num)
}

type ManifiestoFormData = {
  id_manifiesto: number

  // Entradas del usuario
  flete_total: number
  porcentaje_retencion_fuente: number
  porcentaje_ica: number
  anticipo: number
  total_gastos: number
  porcentaje_conductor: number

  // Calculados
  valor_retencion_fuente: number
  valor_ica: number
  deduccion_fiscal: number
  neto_a_pagar: number
  saldo_a_pagar: number
  queda_al_carro: number
  a_favor_del_carro: number
  ganacia_conductor: number
}


export default function ManifiestoForm({
  onFormChange,
  initialData,
}: {
  onFormChange: (data: ManifiestoFormData) => void
  initialData?: ManifiestoFormData
}) {
  const [formData, setForm] = useState<ManifiestoFormData>(() =>
    initialData || {
      id_manifiesto: 1,
      flete_total: 0,
      porcentaje_retencion_fuente: 0,
      porcentaje_ica: 0,
      anticipo: 0,
      total_gastos: 0,
      porcentaje_conductor: 0,
      valor_retencion_fuente: 0,
      valor_ica: 0,
      deduccion_fiscal: 0,
      neto_a_pagar: 0,
      saldo_a_pagar: 0,
      queda_al_carro: 0,
      a_favor_del_carro: 0,
      ganacia_conductor: 0,
    }
  )

  useEffect(() => {
    onFormChange(formData)
  }, [formData])


  // Recalcular valores cuando cambian los campos base
  useEffect(() => {
    const flete = formData.flete_total || 0
    const retPorc = formData.porcentaje_retencion_fuente || 0
    const icaPorc = formData.porcentaje_ica || 0
    const anticipo = formData.anticipo || 0
    const gastos = formData.total_gastos || 0
    const porcCond = formData.porcentaje_conductor || 0

    const valor_retencion_fuente = flete * (retPorc / 100)
    const valor_ica = flete * (icaPorc / 100)
    const deduccion_fiscal = valor_retencion_fuente + valor_ica
    const neto_a_pagar = flete - deduccion_fiscal
    const saldo_a_pagar = neto_a_pagar - anticipo
    const queda_al_carro = saldo_a_pagar - gastos
    const a_favor_del_carro = anticipo - gastos
    const ganacia_conductor = flete * porcCond

    setForm((prev: ManifiestoFormData) => ({
      ...prev,
      valor_retencion_fuente,
      valor_ica,
      deduccion_fiscal,
      neto_a_pagar,
      saldo_a_pagar,
      queda_al_carro,
      a_favor_del_carro,
      ganacia_conductor,
    }))
  }, [
    formData.flete_total,
    formData.porcentaje_retencion_fuente,
    formData.porcentaje_ica,
    formData.anticipo,
    formData.total_gastos,
    formData.porcentaje_conductor,
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev: ManifiestoFormData) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Entradas del usuario */}
        <div>
          <Label>Flete Total</Label>
          <Input
            name="flete_total"
            value={formData.flete_total}
            onChange={handleChange}
            type="number"
            step="0.01"
          />
          <div className="text-sm text-gray-500 mt-1">{formatNumber(formData.flete_total)}</div>
        </div>

        <div>
          <Label>% Retención Fuente</Label>
          <Input
            name="porcentaje_retencion_fuente"
            value={formData.porcentaje_retencion_fuente}
            onChange={handleChange}
            type="number"
            step="0.0001"
          />
          <div className="text-sm text-gray-500 mt-1">
            {new Intl.NumberFormat("es-CO", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 4,
            }).format(formData.porcentaje_retencion_fuente)}%
          </div>
        </div>

        <div>
          <Label>% ICA</Label>
          <Input name="porcentaje_ica" value={formData.porcentaje_ica} onChange={handleChange} type="number" step="0.0001" />
        </div>

        <div>
          <Label>Anticipo</Label>
          <Input name="anticipo" value={formData.anticipo} onChange={handleChange} type="number" step="0.01" />
        </div>

        <div>
          <Label>Total Gastos</Label>
          <Input name="total_gastos" value={formData.total_gastos} onChange={handleChange} type="number" step="0.01" />
        </div>

        <div>
          <Label>% Conductor</Label>
          <Input name="porcentaje_conductor" value={formData.porcentaje_conductor} onChange={handleChange} type="number" step="0.0001" />
        </div>

        {/* Calculados automáticamente */}
        <div>
          <Label>Valor Retención Fuente</Label>
          <Input value={formatNumber(formData.valor_retencion_fuente)} readOnly />
        </div>

        <div>
          <Label>Valor ICA</Label>
          <Input value={formatNumber(formData.valor_ica)} readOnly />
        </div>

        <div>
          <Label>Deducción Fiscal</Label>
          <Input value={formatNumber(formData.deduccion_fiscal)} readOnly />
        </div>

        <div>
          <Label>Neto a Pagar</Label>
          <Input value={formatNumber(formData.neto_a_pagar)} readOnly />
        </div>

        <div>
          <Label>Saldo a Pagar</Label>
          <Input value={formatNumber(formData.saldo_a_pagar)} readOnly />
        </div>

        <div>
          <Label>Queda al Carro</Label>
          <Input value={formatNumber(formData.queda_al_carro)} readOnly />
        </div>

        <div>
          <Label>A favor del Carro</Label>
          <Input value={formatNumber(formData.a_favor_del_carro)} readOnly />
        </div>

        <div>
          <Label>Ganancia del Conductor</Label>
          <Input value={formatNumber(formData.ganacia_conductor)} readOnly />
        </div>

      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Registrar manifiesto
        </Button>
      </div>
    </form>
  )
}
