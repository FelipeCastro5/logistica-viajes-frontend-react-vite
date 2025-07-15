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



export default function ManifiestoForm() {
  const [form, setForm] = useState({
    // Oculto
    id_manifiesto: 1,

    // Entradas del usuario
    flete_total: 0,
    porcentaje_retencion_fuente: 0,
    porcentaje_ica: 0,
    anticipo: 0,
    total_gastos: 0,
    porcentaje_conductor: 0,

    // Calculados
    valor_retencion_fuente: 0,
    valor_ica: 0,
    deduccion_fiscal: 0,
    neto_a_pagar: 0,
    saldo_a_pagar: 0,
    queda_al_carro: 0,
    a_favor_del_carro: 0,
    ganacia_conductor: 0,
  })

  // Recalcular valores cuando cambian los campos base
  useEffect(() => {
    const flete = parseFloat(form.flete_total.toString()) || 0
    const retPorc = parseFloat(form.porcentaje_retencion_fuente.toString()) || 0
    const icaPorc = parseFloat(form.porcentaje_ica.toString()) || 0
    const anticipo = parseFloat(form.anticipo.toString()) || 0
    const gastos = parseFloat(form.total_gastos.toString()) || 0
    const porcCond = parseFloat(form.porcentaje_conductor.toString()) || 0

    const valor_retencion_fuente = flete * (retPorc / 100)
    const valor_ica = flete * (icaPorc / 100)
    const deduccion_fiscal = valor_retencion_fuente + valor_ica
    const neto_a_pagar = flete - deduccion_fiscal
    const saldo_a_pagar = neto_a_pagar - anticipo
    const queda_al_carro = saldo_a_pagar - gastos
    const a_favor_del_carro = anticipo - gastos
    const ganacia_conductor = flete * porcCond

    setForm(prev => ({
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
    form.flete_total,
    form.porcentaje_retencion_fuente,
    form.porcentaje_ica,
    form.anticipo,
    form.total_gastos,
    form.porcentaje_conductor,
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado:", form)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Entradas del usuario */}
        <div>
          <Label>Flete Total</Label>
          <Input
            name="flete_total"
            value={form.flete_total}
            onChange={handleChange}
            type="number"
            step="0.01"
          />
          <div className="text-sm text-gray-500 mt-1">{formatNumber(form.flete_total)}</div>
        </div>

        <div>
          <Label>% Retención Fuente</Label>
          <Input
            name="porcentaje_retencion_fuente"
            value={form.porcentaje_retencion_fuente}
            onChange={handleChange}
            type="number"
            step="0.0001"
          />
          <div className="text-sm text-gray-500 mt-1">
            {new Intl.NumberFormat("es-CO", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 4,
            }).format(form.porcentaje_retencion_fuente)}%
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

        {/* Calculados automáticamente */}
        <div>
          <Label>Valor Retención Fuente</Label>
          <Input value={formatNumber(form.valor_retencion_fuente)} readOnly />
        </div>

        <div>
          <Label>Valor ICA</Label>
          <Input value={formatNumber(form.valor_ica)} readOnly />
        </div>

        <div>
          <Label>Deducción Fiscal</Label>
          <Input value={formatNumber(form.deduccion_fiscal)} readOnly />
        </div>

        <div>
          <Label>Neto a Pagar</Label>
          <Input value={formatNumber(form.neto_a_pagar)} readOnly />
        </div>

        <div>
          <Label>Saldo a Pagar</Label>
          <Input value={formatNumber(form.saldo_a_pagar)} readOnly />
        </div>

        <div>
          <Label>Queda al Carro</Label>
          <Input value={formatNumber(form.queda_al_carro)} readOnly />
        </div>

        <div>
          <Label>A favor del Carro</Label>
          <Input value={formatNumber(form.a_favor_del_carro)} readOnly />
        </div>

        <div>
          <Label>Ganancia del Conductor</Label>
          <Input value={formatNumber(form.ganacia_conductor)} readOnly />
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
