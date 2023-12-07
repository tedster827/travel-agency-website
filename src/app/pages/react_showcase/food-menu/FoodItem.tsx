import React from "react";

interface FoodItemProps {
    readonly name: string;
    readonly description: string;
    price: string;
    readonly currencySymbol: "$";
}

const FoodItem: ({name, description, price, currencySymbol}: FoodItemProps) => React.JSX.Element = ({name, description, price, currencySymbol}: FoodItemProps) => {
    return (
        <>
            <h1>
                {name}
            </h1>
            <p>
                {description}
            </p>
            <p>
                {currencySymbol}{price}
            </p>
        </>
    )
}

export default FoodItem;