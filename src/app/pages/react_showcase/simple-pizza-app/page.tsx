'use client'
import React, {useState} from "react"

const SimplePizzaApp: React.FunctionComponent = () => {
    const [pizza, setPizza] = useState({
        name: "Buffalo Chicken",
        toppings: ['Grilled Chicken', 'Cheese', 'Buffalo Sauce'],
        maxAdditionalToppingCount: 1
    });

    const [additionalToppingCount, setAdditionalToppingCount] = useState<number>(0);

    const handleAddPineappleButton = () => {
        setAdditionalToppingCount(additionalToppingCount + 1)
        setPizza({
            ...pizza,
            toppings: [
                ...pizza.toppings,
                "Pineapple"
            ]
        })
    }


    return (
        <div
            className={"m-5"}
        >
            <h1
                className={"text-3xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300"}
            >🍕 Simple Pizza App</h1>
            <h2
                className={"font-bold"}
            >Current Pizza: {pizza.name}</h2>
            <h4>Number of Additional Toppings: {additionalToppingCount}</h4>
            <h4>Maximum Number of Additional Toppings for this pizza: {pizza.maxAdditionalToppingCount}</h4>
            <h4
                className={"mt-5"}
            >Current Toppings:</h4>
            <ul
                className={"list-disc m-5"}
            >
                {pizza.toppings.map((topping): React.JSX.Element => {
                    return (
                        <li
                            key={topping}
                        >
                            {topping}
                        </li>
                    )
                })}
            </ul>
            {additionalToppingCount < pizza.maxAdditionalToppingCount &&
                <div
                    className={"m-5"}
                >
                    <h3>Add Toppings!</h3>
                    <ul
                        className={"list-disc"}
                    >

                    </ul>
                    <button
                        className={"btn"}
                        onClick={handleAddPineappleButton}
                    >
                        🍍 Add Pineapple
                    </button>
                </div>
            }
        </div>
    )
}

export default SimplePizzaApp;