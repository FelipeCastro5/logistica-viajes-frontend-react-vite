// hooks/useManifiestoForm.ts
import { useEffect, useState } from "react"

export function useManifiestoForm() {
  const [form, setForm] = useState({
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
  })

  useEffect(() => {
    const flete = form.flete_total || 0
    const retPorc = form.porcentaje_retencion_fuente || 0
    const icaPorc = form.porcentaje_ica || 0
    const anticipo = form.anticipo || 0
    const gastos = form.total_gastos || 0
    const porcCond = form.porcentaje_conductor || 0

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

  return {
    form,
    handleChange,
    handleSubmit,
  }
}
