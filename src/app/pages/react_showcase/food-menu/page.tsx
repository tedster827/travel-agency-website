'use client'
import React, {useState} from "react";
import FoodItem from "src/app/pages/react_showcase/food-menu/FoodItem";
import doStringOperationOnStringDollarAmount from "src/app/pages/react_showcase/food-menu/helpers/doStringOperation";

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
            },
            {
                name: "Morning Rush Ice Coffee",
                description: "Simple coffee over ice, that's discounted for a limited time!",
                price: "2.00",
                currencySymbol: "$"
            }
        ]
    )

    const [wasSurpriseActivated, setWasSurpriseActivated] = useState<boolean>(false)

    const [isDiscountApplied, setIsDiscountApplied] = useState(false)

    // 30 Second Timeout for Limited Timed Items
    // const [timer, setTimer] = useState<number>(30)

    const currencySymbol = "$"

    const handleDiscountButton = () => {
        setDrinks(drinks.map((drink) => {
           return drink.name !== "Matcha Latte" ? drink : {
               name: drink.name + " - ✨ Discount Applied",
               description: drink.description,
               price: doStringOperationOnStringDollarAmount(drink.price, "-", 1) +  "✨",
               currencySymbol: drink.currencySymbol
           }
        }))
        setIsDiscountApplied(true)
    }

    const handleSurpriseButton = () => {
        setWasSurpriseActivated(true)
        setDrinks([...drinks, {
            name: "✨ Tiger Boba Coffee ✨",
            description: "Brown Sugar Milk + Boba Pearl with Espresso + Cream Mousse",
            price: "4.00",
            currencySymbol: "$"
        }])
    }

    // useEffect(() => {
    //
    //     const interval = setInterval(() => {
    //         setTimer(prevTimer => prevTimer - 1)
    //     }, 1000);
    //
    //     const limitedTimeItemTimeout = setTimeout(() => {
    //         setDrinks(drinks.filter(drink => drink.name !== "Matcha Latte"));
    //         clearInterval(interval)
    //     }, 300000);
    //
    //     setDrinks(drinks.map((drink) => {
    //        return drink.name !== "Matcha Latte" ? drink : {
    //            name: drink.name + "- ⏰ Limited Time Price! Offer Ends In: " + timer + " Seconds",
    //            description: drink.description,
    //            price: doStringOperationOnStringNumber(drink.price, "-", 1),
    //            currencySymbol: drink.currencySymbol
    //        }
    //     }))
    //
    //     return () => clearTimeout(limitedTimeItemTimeout)
    //
    // }, []);

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
            {!wasSurpriseActivated &&
                <button
                    className={"btn mt-3"}
                    onClick={handleSurpriseButton}
                >
                    🤫 A Surprise! 🎉
                </button>
            }
        </div>
    )
}

export default FoodMenuPage;