import type { ButtonHTMLAttributes } from "react"
import { Button } from "./ui/button"

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  className?: string
}

export default function MenuButton({ label, className = "", ...props }: MenuButtonProps) {
  return (
    <Button
      {...props}
      className={`bg-blue-600 hover:bg-blue-700 text-white py-10 px-6 rounded w-full text-lg font-semibold mb-4 ${className}`}
    >
      {label}
    </Button>
  )
}
