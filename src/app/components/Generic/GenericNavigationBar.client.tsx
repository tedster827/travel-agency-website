import Link from "next/link";
import React from "react";
import NavigationBarItem from "./NavigationBarItem.client";

const menuItemsPlaceholderValue: MenuItem[] = [
    { name: "Sample Value: Home (Change Value)", linkPath: "/"},
    { name: "Sample Value: Page 1 (Change Value)", linkPath: "/pages/page_2"},
    { name: "Sample Value: Page 2 (Change Value)", linkPath: "/pages/page_2"}
]
    


interface MenuItem {
    name: string;
    linkPath: string;
}

interface GenericNavigationBarProps {
    title: string;
    homePagePath?: string;
    fontName?: string;
    backgroundColor?: string;
    textColorClass?: string;
    pageType?: "landing-page" | "sub-page"
    listOfMenuItems?: MenuItem[]
}

/**
 * GenericNavigationBar (FC Functional Component)
 *
 * This component renders the top navigation bar of the website,
 * including the logo and navigation links. This should remain generic, it should have an interface that accepts text and size changes for all types of pages
 * 
 * TODO: Add funcitonally for theme changes based on interface props.
 * 
 */
const GenericNavigationBar: React.FunctionComponent<GenericNavigationBarProps> = ({title, homePagePath = "/",  fontName = "font-sans", textColorClass = 'text-white', backgroundColor = 'bg-emerald-200',  pageType = "sub-page", listOfMenuItems = menuItemsPlaceholderValue}: GenericNavigationBarProps) => {
    const sizeClass = pageType === 'landing-page'
        ? 'text-4xl py-6 px-8 rounded-lg' // Larger text for landing pages
        : 'text-xl py-3 px-4 rounded-md'; // Sub-Pages text for all other pages

    return (
            <nav className="flex">
                <ul className={`flex-auto`}>
                    <li className={`flex-none`} key={"breadcrumbs_to_home"}>
                        <header className={`${sizeClass} ${backgroundColor} ${textColorClass} ${fontName} font-semibold border-b-4`}>
                            {/* Note: Using span to make sure we don't break the grid layout / document flow*/}
                            <span>
                                <Link href={`${homePagePath}`}
                                >
                                    {title}
                                </Link>
                            </span>
                        </header>
                    </li>
                    {listOfMenuItems.map((item) => {
                        return (
                            <li 
                                className={`flex-initial`}
                                key={item.name}    
                            >
                                <NavigationBarItem 
                                    label={item.name}
                                />
                            </li>
                        )
                    })}
                </ul>
            </nav>
        
    )
}

export default GenericNavigationBar;