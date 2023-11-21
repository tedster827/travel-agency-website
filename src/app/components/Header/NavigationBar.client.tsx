'use client' // Directive to mark this component as a Client Component in Next.js

import React, {useRef, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Font Awesome (Icon Library and Toolkit) fontawesome.com
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


/**
 * NavigationBar (FC Functional Component)
 *
 * This component renders the top navigation bar of the website,
 * including the logo and navigation links.
 */

const NavigationBar: React.FunctionComponent = () => {
    // State hook for managing the dropdown open/close
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
    // Timeout for dropdown visibility
    const dropdownTimeoutId = useRef<NodeJS.Timeout | null>(null)
    // Ref for the menu container to track its DOM element (Also tells TypeScript the type of object menuRef.current
    const menuRef = useRef<HTMLLIElement>(null);

    // Hook for accessing the Next.js router instance
    const route = useRouter()

    // Event handler for clicking the dropdown toggle button
    const toggleDropdown = (isVisible: boolean) => {
        if (dropdownTimeoutId.current != null) {
            clearTimeout(dropdownTimeoutId.current)
        }

        if(isVisible) {
            setIsDropdownVisible(true);
        } else {
            // Set delay before hiding the dropdown
            dropdownTimeoutId.current = setTimeout(() => {
                setIsDropdownVisible(false);
            }, 300) // Timeout for 3 seconds (300 milliseconds)
        }
    }

    return (
        <nav id={"nav"} className={"bg-gray-800 p-4"}>
            {/*Link component for client-side routing to the home page*/}
            <ul className={"flex items-center justify-between"}>
                <li>
                    <Link className={"text-white"} href={"/"}>Welcome Aboard!</Link>
                </li>
                {/*Dropdown with click and hover functionalities*/}
                <li
                    // Positioning for dropdown
                    className={"relative"}
                    // Attach ref to the list item
                    ref={menuRef}
                    onMouseEnter={() => toggleDropdown(true) }
                    onMouseLeave={() => toggleDropdown(false) }
                >
                    {/*Button to toggle the dropdown menu*/}
                    <button
                        className={"flex items-center text-white"}
                        onClick={() => {
                            setIsDropdownVisible(!isDropdownVisible);
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronDown} className={"mr-2"}></FontAwesomeIcon>
                        Site Map
                    </button>
                    {isDropdownVisible && (
                        <ul
                            className={"absolute bg-gray-700 p-2 mt-2 rounded shadow-lg"}
                            onMouseEnter={() => toggleDropdown(true) }
                            onMouseLeave={() => toggleDropdown(false) }
                        >
                            <li>
                                <Link href={"/"}>Home</Link>
                            </li>
                            {/*{TODO: Add other navigation items as they are made}*/}
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar;