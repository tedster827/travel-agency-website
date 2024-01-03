'use client'
import React from "react"

interface AddCartItemsButtonsProps {
    availableItems: any[]
    handleAddItemToCart: (itemName: number) => void;
}

const AddCartItemsButtons: React.FunctionComponent<AddCartItemsButtonsProps> = ({availableItems, handleAddItemToCart}: AddCartItemsButtonsProps) => {
    return (
        <div>
            <ul>
                {availableItems.map((item) => {
                    return (
                        <button
                            className={"btn mx-3"}
                            key={item.id} onClick={() => handleAddItemToCart(item.id)}
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