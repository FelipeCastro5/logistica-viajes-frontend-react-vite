import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import PageContent from "@/components/layout/PageContent"
import { useLayoutTitle } from "@/context/LayoutTitleContext"
import ChatWindow from "./ChatWindow"

export default function ChatPage() {
  const { chatId } = useParams()
  const { setTitle } = useLayoutTitle()
  const location = useLocation()
  const { nombre_chat } = location.state || {}

  useEffect(() => {
    if (chatId && nombre_chat) {
      setTitle(`${nombre_chat}`)
    } else {
      setTitle("Nuevo Chat")
    }
  }, [chatId, nombre_chat])

  return (
    // <PageContent title={chatId ? `Conversación: ${chatId}` : "Nuevo Chat"}>
    <PageContent>
      <div className="flex justify-center mt-6">
        <ChatWindow chatId={chatId} />
      </div>
    </PageContent>
  )

}
