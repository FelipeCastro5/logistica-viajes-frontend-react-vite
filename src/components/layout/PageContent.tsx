import type { ReactNode } from "react"

interface PageContentProps {
  title?: string | ReactNode
  children: ReactNode
}

export default function PageContent({ title, children }: PageContentProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {title && (
        <h2 className="text-xl font-semibold mb-6">
          {title}
        </h2>
      )}
      <div>
        {children}
      </div>
    </div>
  )
}
