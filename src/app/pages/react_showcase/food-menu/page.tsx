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
            <h1>Tedster's Taste Restaurant</h1>
            <ul className={"list-disc"}>
                <li>
                    {drink.title} - {currencySymbol + drink.price.toFixed(2)}
                    {isDiscountApplied && <p>{currencySymbol}1 Discount Applied! 😄🤑</p>}
                </li>
            </ul>
            <ul>
                {drinks.map((drink): React.JSX.Element => {
                    return (
                        <li>
                            <FoodItem
                                name={drink.name}
                                description={drink.description}
                                price={drink.price}
                                currencySymbol={drink.currencySymbol}/>
                            </li>
                        )
                })}
            </ul>
            {!isDiscountApplied &&
                <button
                    className={"btn"}
                    onClick={handleDiscountButton}
                >
                    Apply {currencySymbol}1 Discount
                </button>
            }
        </div>
    )
}

export default FoodMenuPage;