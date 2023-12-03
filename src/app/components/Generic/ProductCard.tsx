import React from "react";
import AddToCartButton from "src/app/components/Generic/AddToCartButton";

// import styles from "ProductCard.module.css"

/**
 * ProductCard (FC Functional) component for the application.
 *
 * This component renders a Generic Product Display Card Component for a standardized functionally and styling for
 * the later storefront.
 *
 */
const ProductCard: React.FunctionComponent = () => {
    return(
        <div>
            <AddToCartButton/>
        </div>
    )
}

export default ProductCard;