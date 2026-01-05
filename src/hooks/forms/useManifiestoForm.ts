import { useEffect, useRef, useState } from "react"

// 1. Define el tipo del formulario
type ManifiestoFormData = {
  id_manifiesto: number
  fk_vehiculo: number
  flete_total: number
  porcentaje_retencion_fuente: number
  porcentaje_ica: number
  anticipo: number
  total_gastos: number
  porcentaje_conductor: number
  valor_retencion_fuente: number
  valor_ica: number
  deduccion_fiscal: number
  neto_a_pagar: number
  saldo_a_pagar: number
  queda_al_carro: number
  a_favor_del_carro: number
  ganancia_conductor: number
}

export function useManifiestoForm(initialData?: any, onChange?: (data: any) => void) {
  const [form, setForm] = useState<ManifiestoFormData>({
    id_manifiesto: 1,
    fk_vehiculo: 0,
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
    ganancia_conductor: 0,
  })

  const initialized = useRef(false)

  useEffect(() => {
    if (onChange) {
      onChange(form)
    }
  }, [form])

  useEffect(() => {
    if (initialData && !initialized.current) {
      const parsedData: Partial<ManifiestoFormData> = {}

      for (const [key, value] of Object.entries(initialData)) {
        if (typeof value === "string" || typeof value === "number") {
          parsedData[key as keyof ManifiestoFormData] = parseFloat(value as string) || 0
        }
      }

      setForm(prev => ({
        ...prev,
        ...parsedData,
      }))

      initialized.current = true
    }
  }, [initialData])

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
    const total_gastos = form.total_gastos
    const saldo_a_pagar = neto_a_pagar - anticipo
    const queda_al_carro = saldo_a_pagar - gastos
    const a_favor_del_carro = anticipo - gastos
    const ganancia_conductor = flete * (porcCond / 100)

    setForm(prev => ({
      ...prev,
      valor_retencion_fuente,
      valor_ica,
      deduccion_fiscal,
      neto_a_pagar,
      total_gastos,
      saldo_a_pagar,
      queda_al_carro,
      a_favor_del_carro,
      ganancia_conductor,
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

  const setField = (name: keyof ManifiestoFormData, value: number) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return {
    form,
    handleChange,
    handleSubmit,
    setField,
  }
}
