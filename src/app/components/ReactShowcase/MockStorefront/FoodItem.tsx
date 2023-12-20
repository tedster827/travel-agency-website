import React from "react";

interface FoodItemProps {
    readonly name: string;
    readonly description: string;
    price: string;
    readonly currencySymbol: string;
}

const FoodItem: ({name, description, price, currencySymbol}: FoodItemProps) => React.JSX.Element = ({name, description, price, currencySymbol}: FoodItemProps) => {
    return (
        <div
            className={"bg-white rounded-lg shadow-lg shadow-lg p-4 mb-4 hover:bg-gray-100 hover:shadow-md transition duration-300"}
        >
            <h1
                className={"text-xl font-semibold"}
            >
                {name}
            </h1>
            <p
                className={"text-gray-600"}
            >
                {description}
            </p>
            <p
                className={"text-green-600 font bold mt-2"}
            >
                {currencySymbol}{price}
            </p>
        </div>
    )
}

export default FoodItem;