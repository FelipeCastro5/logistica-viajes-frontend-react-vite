import type { ReactNode } from "react"
import LogoutButton from "./LogoutButton"

interface PageHeaderProps {
  title: ReactNode
  showLogout?: boolean
  children?: ReactNode
}

export default function PageHeader({ title, showLogout = true, children }: PageHeaderProps) {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-900">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex gap-2 items-center">
        {children}
        {showLogout && <LogoutButton />}
      </div>
    </header>
  )
}
