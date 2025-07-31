// utils/format.ts
export const formatNumber = (num: number): string => {
  if (isNaN(num)) return ""
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  }).format(num)
}
