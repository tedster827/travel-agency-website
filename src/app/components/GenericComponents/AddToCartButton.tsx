'use client'; // use client directive for our client bundle for client-side rendering
import React from "react";

const AddToCartButton: React.FunctionComponent = () => {
    return(
        <>
            <button
                onClick={() => console.log("Clicked add to cart button")}
            >
                Add To Cart
            </button>
        </>
    )
}

export default AddToCartButton;