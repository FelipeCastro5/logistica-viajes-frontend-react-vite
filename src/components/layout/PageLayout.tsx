import { Outlet } from "react-router-dom"
import { LayoutTitleProvider, useLayoutTitle } from "../../context/LayoutTitleContext"
import ChatBotButton from "@/pages/private/Chat/ChatBotButton"
import ThemeToggleButton from "./ThemeToggleButton"
import UserMenu from "./UserMenu"

function LayoutContent() {
    const { title } = useLayoutTitle()

    return (
        <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
            <header className="grid grid-cols-3 items-center p-6 bg-blue-600 text-white shadow relative dark:bg-blue-900 dark:text-white">
                <div /> {/* Espacio vacío (col 1) */}
                <div>
                    <h1 className="text-2xl font-semibold text-center col-start-2 col-end-3">{title}</h1>

                </div>
                <div className="flex justify-end">
                    <UserMenu />
                    <ThemeToggleButton/>
                </div>
            </header>

            <main className="flex justify-center items-start p-6 min-h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 dark:text-white">

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
