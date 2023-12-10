'use client'
import React from "react"

interface AddCartItemsButtonsProps {
    availableItems: any[]
    handleAddItemToCart: (itemName: string) => void;
}

const AddCartItemsButtons: React.FunctionComponent<AddCartItemsButtonsProps> = ({availableItems, handleAddItemToCart}: AddCartItemsButtonsProps) => {
    return (
        <div>
            <ul>
                {availableItems.map((item) => {
                    return (
                        <button
                            className={"btn mx-3"}
                            key={item.name} onClick={() => handleAddItemToCart(item.name)}
                        >
                            Add {item.name} to cart
                        </button>
                    )
                })}
            </ul>
        </div>
    )
}

export default AddCartItemsButtons;