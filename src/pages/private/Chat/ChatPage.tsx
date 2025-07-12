import { useEffect } from "react"
import { useParams } from "react-router-dom"
import PageContent from "@/components/PageContent"
import { useLayoutTitle } from "@/context/LayoutTitleContext"
import ChatWindow from "./ChatWindow"

export default function ChatPage() {
  const { chatId } = useParams()
  const { setTitle } = useLayoutTitle()

  useEffect(() => {
    setTitle(`Chat: ${chatId}`)
  }, [chatId])

  return (
    <PageContent title={`Conversación: ${chatId}`}>
      <div className="flex justify-center mt-6">
        <ChatWindow chatId={chatId} />
      </div>
    </PageContent>
  )
}
