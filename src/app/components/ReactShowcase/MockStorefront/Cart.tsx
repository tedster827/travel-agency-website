'use client'
import React, {useState} from "react"

interface MockStorefrontCartProps {
    cartDiscount: number;
    itemsPlacedInCart: any[];
    onClear: () => void;
}

const MockStorefrontCart: React.FunctionComponent<MockStorefrontCartProps> = ({cartDiscount, itemsPlacedInCart, onClear}: MockStorefrontCartProps) => {
    const [isShoppingCartEmpty, setIsShoppingCartEmpty] = useState<boolean>(true)

    return (
        <div
            className={"p-4"}
        >
            <div>
                - Shopping Cart -
            </div>
            <ul
                className={"list-disc m-5"}
            >
                {itemsPlacedInCart.length > 0 && itemsPlacedInCart.map((item) : React.JSX.Element => {
                    return (
                        <li
                            className={"mr-2"}
                            key={item.name}
                        >
                            {item.name} x {item.quantity}
                        </li>
                    )
                })}
            </ul>
            {itemsPlacedInCart.length > 0 &&
                <button
                    className={"btn"}
                    onClick={onClear}
                >
                    Clear Shopping Cart
                </button>
            }
            {itemsPlacedInCart.length === 0 &&
                <h3>Add Items! Your Shopping Cart Is Empty</h3>
            }
        </div>
    )
}

export default MockStorefrontCart;