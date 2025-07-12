
import PageContent from "@/components/PageContent" // si usas un layout envolvente
import { useLayoutTitle } from "@/context/LayoutTitleContext"
import { useEffect } from "react"
import ChatWindow from "./ChatWindow"

export default function ChatPage() {
  const { setTitle } = useLayoutTitle()

  useEffect(() => {
    setTitle("Chat Soporte")
  }, [])

  return (
    <PageContent title="Chat con Soporte">
      <div className="flex justify-center mt-6">
        <ChatWindow />
      </div>
    </PageContent>
  )
}
