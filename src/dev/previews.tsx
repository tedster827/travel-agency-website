import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import HomePage from "src/app/page";
import DestinationList from "src/app/components/DestinationList";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/HomePage">
                <HomePage/>
            </ComponentPreview>
            <ComponentPreview path="/DestinationList">
                <DestinationList
                    enableLikeButton={true}
                />
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;