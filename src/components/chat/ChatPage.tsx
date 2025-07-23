import { useEffect } from "react"
import { useParams } from "react-router-dom"
import PageContent from "@/components/layout/PageContent"
import { useLayoutTitle } from "@/context/LayoutTitleContext"
import ChatWindow from "./ChatWindow"

export default function ChatPage() {
  const { chatId } = useParams()
  const { setTitle } = useLayoutTitle()

  useEffect(() => {
    setTitle(chatId ? `Chat: ${chatId}` : "Nuevo Chat")
  }, [chatId])

  return (
    // <PageContent title={chatId ? `Conversación: ${chatId}` : "Nuevo Chat"}>
    <PageContent>
      <div className="flex justify-center mt-6">
        <ChatWindow chatId={chatId} />
      </div>
    </PageContent>
  )

}
