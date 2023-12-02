'use client'
import React, { useState } from "react";

// Using the Typescript feature interface to define the shape or interface of this React Component (object).
interface DestinationListProps {
    destinations: string[];
    heading: string;
    onSelection: (location: string) => void;
}


/**
 * DestinationList (FC Functional) component for the application.
 *
 * This component renders a list of destinations
 *
 * TODO: This needs to be styled
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
             className="list-disc list-inside"
         >
             {
                 destinations.map((location, index) =>
                     <li
                         key={location}
                         // Example of dynamic class setting
                         className={selectedIndex === index ? 'list-item active:accent-blue-600 hover:bg-key-700' : 'list-item'}
                         onClick={
                             (onClickEvent) => handleMouseClickOnSingleLocation(onClickEvent, location, index, onSelection)
                         }

                     >
                         {selectedIndex === index ? location + " <-- selected!" : location}
                     </li>
                 )
             }
         </ul>
     </>
 )
}
export default DestinationList;