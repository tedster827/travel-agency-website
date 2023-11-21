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
            <NavigationBar/>
        </header>
    )
}

export default Header;