import React from "react";
// NOTE: Styles still need to be imported


/**
 * Header (FC Functional) component for the application.
 *
 * This component renders the top navigation bar of the website,
 * including the logo and navigation links.
 */
const Header: React.FC = () => {
    return (
        // Main Header Container
        <header id={"header"} className={"alt"}>
            <h1 id={"logo"}><a href="index.html">Blissful Cruises <span>Cruise and Travel Specialists</span></a></h1>
            <nav id={"nav"}>
                <ul>
                    <li className={"current"}><a href={"index.html"}>Welcome Aboard!</a></li>
                    <li className={"submenu"}>
                        <a href={"#"}>Site Map</a>
                        <ul>
                            <li><a href={"left-sidebar.html"}>Left Sidebar</a> </li>
                            {/*{TODO: Add other navigation items as they are made}*/}
                        </ul>
                    </li>
                    <li><a href={"#"} className={"button primary"}>Sign Up</a> </li>
                </ul>
            </nav>
        </header>
    )
}