'use client'; // use client directive for our client bundle for client-side rendering
import React from "react";

/**
 * AddToCartButton (FC Functional) component for the application.
 *
 * This component renders an Add To Cart Button for use in the later storefront
 *
 */
const AddToCartButton: React.FunctionComponent = () => {
    return(
        <>
            <button
                className={"btn btn-primary"}
                onClick={() => console.log("Clicked add to cart button")}
            >
                Add To Cart
            </button>
        </>
    )
}

export default AddToCartButton;