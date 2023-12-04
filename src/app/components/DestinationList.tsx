'use client'
import React, { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import Destination from "src/app/components/Destination";

// Using the Typescript feature interface to define the shape or interface of this React Component (object).
interface DestinationListProps {
    destinations: string[];
    heading: string;
    onSelection: (location: string) => void;
    enableLikeButton: boolean;
}


/**
 * DestinationList (FC Functional) component for the application.
 *
 * This component renders a list of destinations
 *
 * TODO: This needs to be styled. The inline styling for the list items aren't making the elements inline
 *
 */
// We can destruct the props arguments from props: DestinationListProps to { destinations, heading }:
// DestinationListProps
const DestinationList: ({ destinations, heading, onSelection }: DestinationListProps) => React.JSX.Element = ({ destinations, heading, onSelection }: DestinationListProps) => {
    // let selectedIndex: number = 1
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // If there are no destinations (i.e. destinations length is zero) this message will display, otherwise this
    // will render nothing
    // NOTE: This can be written as a function for argument based output or as a normal constant.
    // const getMessage = () => {
    //     return destinations.length === 0 ? <p>No Current Listings for Destinations! Check back later!</p>: null
    // }

    const handleMouseClickOnSingleLocation = (onClickEvent
                                                  : React.MouseEvent, location: string, index: number, onSelectLocation: (location: string) => void) => {
        console.log("clicked " + location + " at index: " + index + " with event: \n\n")
        console.log(onClickEvent)
        setSelectedIndex(index)
        onSelectLocation(location)
    }



 return(
     <>
         <h2
             className={"font-sans"}
         >{heading}</h2>
         {/*The cleanest way to have something render or not is to implement a logical and. If the length is 0 then render teh paragraph*/}
         {destinations.length === 0 && <p>No Current Listings for Destinations! Check back later!</p>}
         <ul
             className="list-disc"
         >
             {
                 destinations.map((location, index) =>
                     <Destination
                         name={location}
                         enableLikeButton={true}
                         enableLikeCount={true}
                     />
                 )
             }
         </ul>
     </>
 )
}
export default DestinationList;