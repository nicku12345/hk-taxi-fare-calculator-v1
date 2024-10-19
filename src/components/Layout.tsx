import React from "react";
import { Navbar } from "./Navbar";
import { Error } from "./Error";
import { Footer } from "./Footer";


interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="bg-gray-200">
            <div className="max-w-[650px] mx-auto min-h-screen max-w-2xl mx-auto bg-white shadow-md rounded-lg">
                <div className="flex flex-col min-h-screen">
                    <main className="flex-grow">
                        <Navbar/>
                        <Error/>
                        {children}
                    </main>
                <Footer/>
                </div>
            </div>
        </div>
    )
}