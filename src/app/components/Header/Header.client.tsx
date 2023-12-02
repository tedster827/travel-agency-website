'use client'
import React from "react";
import NavigationBar from "./NavigationBar.client"
import { useRouter } from "next/navigation"

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
        <header
            id={"header"}
        >
            <NavigationBar/>
        </header>
    )
}

export default Header;