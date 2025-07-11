import { createContext, useContext, useState, ReactNode } from "react"

interface LayoutTitleContextType {
  title: ReactNode
  setTitle: (title: ReactNode) => void
}

const LayoutTitleContext = createContext<LayoutTitleContextType>({
  title: "App",
  setTitle: () => {},
})

export function LayoutTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState<ReactNode>("App")

  return (
    <LayoutTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </LayoutTitleContext.Provider>
  )
}

export function useLayoutTitle() {
  return useContext(LayoutTitleContext)
}
