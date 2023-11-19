'use client'
import React from "react";
import NavigationBar from "./NavigationBar.client"
import { useRouter } from "next/navigation"
// NOTE: Styles still need to be imported


/**
 * Header (FC Functional) component for the application.
 *
 * This component renders the top "bar" of the pages and includes the navigation bar component defined in another file.d
 *
 */
const Header: React.FunctionComponent = () => {
    return (
        // Main Header Container
        <header id={"header"} className={"bg-white text-gray-800 shadow-md"}>
            <h1 id={"logo"} className={"text-2xl font-bold italic mx-4 my-2"}>
                <a href="page.tsx" className={"text-blue-600 hover:text-blue-800"}>Blissful Cruises
                    <span>Cruise and Travel Specialists</span>
                </a>
            </h1>
            <NavigationBar/>
        </header>
    )
}

export default Header;