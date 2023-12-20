import React from "react";
import Link from "next/link";

import NavigationBarMenu from "src/app/components/Header/NavigationBarMenu.client";

interface MenuItem {
    name: string
    linkPath?: string
}

/**
 * NavigationBar (FC Functional Component)
 *
 * This component renders the top navigation bar of the website,
 * including the logo and navigation links.
 *
 * FIXME: In narrower resolutions the elements need to change and some need to be hidden, like maybe the slogan.
 *
 * FIXME: On normal desktop resolutions the elements are too close together
 *
 */

const NavigationBar: React.FunctionComponent = () => {

    const listOfMenuItems: MenuItem[] = [
        { name: "Home", linkPath: "/" },
        { name: "Users", linkPath: "/pages/users" },
        { name: "React Showcase", linkPath: "/pages/react_showcase/" }
    ]



    return (
        <nav
            id="nav"
            className={
            "navbar " +
                "bg-base-100 " +
                "space-x-10 "
            }
            aria-label={"Navigation Bar"}
        >
            <div
                className={"flex-1000"}
            >
                <Link
                    href={"/"}
                    className={"btn btn-ghost text-xl"}
                >
                    Blissful Cruises
                </Link>
                <h2
                    // className={""}
                >
                    The Cruise and Travel Specialists
                </h2>
            </div>
            <div
                className={"flex-none"}
            >
                {/*Link component for client-side routing to the home page*/}
                <ul className={"menu menu-horizontal px-1"}>
                    <li>
                        <Link href={'/'}>Home</Link>
                    </li>
                    <li>
                        <NavigationBarMenu
                                    menuName={"Site Map"}
                                    listOfMenuItems={listOfMenuItems}
                                />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavigationBar;