import { Outlet } from "react-router-dom"
import { LayoutTitleProvider, useLayoutTitle } from "../context/LayoutTitleContext"
import LogoutButton from "./LogoutButton"
import ChatBotButton from "@/pages/private/Chat/ChatBotButton"

function LayoutContent() {
    const { title } = useLayoutTitle()

    return (
        <div className="min-h-screen bg-white text-gray-800">
            <header className="flex justify-between items-center p-6 bg-blue-600 text-white shadow">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <LogoutButton />
            </header>

            <main className="flex justify-center items-start p-6 min-h-[calc(100vh-80px)] bg-gray-100">

                <div className="w-full max-w-4xl border border-red-500">
                    <div className="w-full max-w-2xl mx-auto">
                        <Outlet />
                    </div>
                </div>
        <ChatBotButton />
            </main>
        </div>

    )
}

export default function PageLayout() {
    return (
        <LayoutTitleProvider>
            <LayoutContent />
        </LayoutTitleProvider>
    )
}
