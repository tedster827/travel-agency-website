import React from "react";
import GenericNavigationBar from "src/app/components/Generic/GenericNavigationBar.client";
import PlannerView from "./PlannerView.client";

interface MenuItem {
    name: string;
    linkPath: string;
}

const PlannerPage: React.FunctionComponent = () => {
    const plannerPageMenuItems: MenuItem[] = [
        {name: "Back to Water World", linkPath: "/pages/react_showcase/water_world"}
    ]

    return(
        <div
            className="container mx-auto p-4"
        >
            <title>Water World - 📝 Planner 🛠️</title>
            <GenericNavigationBar
                    title="🌊 Water World! 🐳 -- 📝 Planner 🛠️"
                    homePagePath="/pages/react_showcase/water_world"
                    fontName="font-sans"
                    backgroundColor="bg-cyan-400"
                    textColorClass="text-white"
                    pageType="landing-page"
                    listOfMenuItems={plannerPageMenuItems}
                />
                <PlannerView/>
        </div>
    )
}

export default PlannerPage