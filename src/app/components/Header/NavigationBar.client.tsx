import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";


/**
 * NavigationBar (FC Functional Component)
 *
 * This component renders the top navigation bar of the website,
 * including the logo and navigation links.
 */

const NavigationBar: React.FunctionComponent = () => {
    // State hook for managing the dropdown open/close
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    // Hook for accessing the Next.js router instance
    const route = useRouter()

    // Event handler for toggling the dropdown menu's state
    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen)
    }

    return (
        <nav id={"nav"} className={"bg-gray-800 p-4"}>
            {/*Link component for client-side routing to the home page*/}
            <Link href={"/"}>
                <a className={"text-white"}>Blissful</a>
            </Link>
            <ul className={"flex space-x-4"}>
                <li className={"font-bold"}><a href={"index.html"}>Welcome Aboard!</a></li>
                <li className={"right-0.5"}>
                    <a href={"#"}>Site Map</a>
                    <ul>
                        <li><a href={"left-sidebar.html"}>Left Sidebar</a> </li>
                        {/*{TODO: Add other navigation items as they are made}*/}
                    </ul>
                </li>
                <li><a href={"#"} className={"button primary"}>Sign Up</a> </li>
            </ul>
        </nav>
    )
}

export default NavigationBar;