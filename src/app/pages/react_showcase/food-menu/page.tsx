'use client'
import React, {useState} from "react";
import FoodItem from "src/app/pages/react_showcase/food-menu/FoodItem";

const FoodMenuPage: React.FunctionComponent<React.JSX.Element> = () => {
    const [drinks, setDrinks] = useState(
        [
            {
                name: "Matcha Latte",
                description: "A Japanese drink made from finely ground green tea leaves mixed steamed milk",
                price: "4.50",
                currencySymbol: "$"
            },
            {
                name: "Iced Coffee",
                description: "Simple coffee over ice, but not too much ice!",
                price: "3.50",
                currencySymbol: "$"
            }
        ]
    )

    const [isDiscountApplied, setIsDiscountApplied] = useState(false)
    const [drink, setDrink] = useState({
        title: "Iced Coffee",
        price: 3.50
    })
    const currencySymbol = "$"

    const handleDiscountButton = () => {
        setDrink({
            ...drink,
            price: 2.50
        })
        setIsDiscountApplied(true)
    }

    return (
        <div
            className={"m-5"}
        >
            <h1
                className={"text-3xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300"}
            >Tedster's Taste Cafe</h1>
            <ul>
                {drinks.map((drink): React.JSX.Element => {
                    return (
                        <li
                            key={drink.name}
                        >
                            <FoodItem
                                key={drink.name}
                                name={drink.name}
                                description={drink.description}
                                price={drink.price}
                                currencySymbol={drink.currencySymbol}/>
                            </li>
                        )
                })}
            </ul>
            {!isDiscountApplied &&
                <div
                    className={"mb-4 p-4 inline-block"}
                >
                    <h2
                        className={"text-gray-600 hover:text-red-500  transition duration-300"}
                    >
                        Today's Special: $1 Off Matcha Lattes!
                    </h2>
                    <button
                        className={"btn mt-3"}
                        onClick={handleDiscountButton}
                    >
                        Apply {currencySymbol}1 Discount
                    </button>
                </div>
            }
        </div>
    )
}

export default FoodMenuPage;