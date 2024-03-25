'use client'

import React from "react"
import GenericNavigationBar from "src/app/components/Generic/GenericNavigationBar.client";

interface MenuItem {
    name: string;
    linkPath: string;
}


const WaterWorldLandingPage: React.FunctionComponent = () => {
    const waterWorldNavMenuItems: MenuItem[] = [
        { name: "Home", linkPath: "/pages/react_showcase/water_world" },
        { name: "Sign Up", linkPath: "/pages/react_showcase/water_world/sign_up" },
        { name: "About", linkPath: "/pages/react_showcase/water_world/about" },
        { name: "📝 Planner 🛠️", linkPath: "/pages/react_showcase/water_world/pages/planner" },
    ]
    return (
        <div>
            <title>Water World 🐳</title>
            <GenericNavigationBar
                title="🌊 Water World! 🐳"
                homePagePath="/pages/react_showcase/water_world"
                fontName="font-sans"
                backgroundColor="bg-cyan-400"
                textColorClass="text-white"
                pageType="landing-page"
                listOfMenuItems={waterWorldNavMenuItems}
            />
        </div>
    )
}

export default WaterWorldLandingPage;