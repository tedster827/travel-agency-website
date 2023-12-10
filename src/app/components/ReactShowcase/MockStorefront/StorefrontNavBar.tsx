import React from "react"
import calculateCartQuantity from "src/app/pages/react_showcase/storefront/helpers/calculateCartQuantity";

interface StorefrontNavBarProps {
    cartItems: cartItem[]
}

interface cartItem {
    id: number;
    name: string;
    quantity: number;
}

const StorefrontNavBar: React.FunctionComponent<StorefrontNavBarProps> = ({ cartItems }: StorefrontNavBarProps): React.JSX.Element => {
    return (
        <div>
            Storefront NavBar | {calculateCartQuantity(cartItems)} Items
        </div>
    )
}

export default StorefrontNavBar;