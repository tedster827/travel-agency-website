'use client'
import React from "react";
import NavigationBar from "./NavigationBar.client"
import Link from "next/link";
import { useRouter } from "next/navigation"
// NOTE: Styles still need to be imported


/**
 * Header (FC Functional) component for the application.
 *
 * This component renders the top "bar" of the pages and includes the navigation bar component defined in another file.d
 *
 */
const Header: React.FunctionComponent = () => {
    const router = useRouter()
    return (
        // Main Header Container
        <header id={"header"} className={"bg-white text-gray-800 shadow-md"}>
            <h1 id={"logo"} className={"text-2xl font-bold italic mx-4 my-2"}>
                <Link href={"/"} className={"text-blue-600 hover:text-blue-800"} >Blissful Cruises | Cruise and Travel Specialists</Link>
            </h1>
            <NavigationBar/>
        </header>
    )
}

export default Header;