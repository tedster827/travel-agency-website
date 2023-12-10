'use client'
import React, { useState } from "react"
import StorefrontNavBar from "src/app/components/ReactShowcase/MockStorefront/StorefrontNavBar";
import Cart from "src/app/components/ReactShowcase/MockStorefront/Cart";
import AddCartItemsButtons from "src/app/components/ReactShowcase/MockStorefront/AddCartItemsButtons";
import {produce} from "immer";

interface cartObject {
    cartDiscount: number;
    itemsPlacedInCart: cartItem[]
}

interface cartItem {
    id: number;
    name: string;
    quantity: number;
}

const MockStorefrontPage: React.FunctionComponent = () => {
    // Initial Storefront Items State
    const [storefrontConfig, setStorefrontConfig] = useState({
        storeDiscount: 0,
        // Each item's quantity is set to one in the configuration so when it is added to a cart for the first time, its
        // quantity is correct
        availableItems: [
            {
                id: 1, name: 'Product 1', quantity: 1
            },
            {
                id: 2, name: 'Product 2', quantity: 1
            }
        ]
    });

    // Initial Customer Cart State
    const [cart, setCart] = useState<cartObject>({
        cartDiscount: 0,
        itemsPlacedInCart: []
    });

    const handleOnClear = () => {
        // Because the cartItem state is in this component, we're going to update the cartItems here to an empty
        // array, clearing it.
        setCart({
            ...cart,
            itemsPlacedInCart: []
        });
    }

    const handleCartAddition = (itemName: string) => {
        // Checking the Storefront's Configuration for Item
        const newCartAddition = storefrontConfig.availableItems.find(item => {
            return item.name === itemName;
        })

        // Checking Cart for Existing Item
        const existingCartItem = cart.itemsPlacedInCart.find(item => item.name === itemName)

        // If the cart addition is a valid cart
        if(newCartAddition !== undefined) {
            // If the item already exist in cart
            if(existingCartItem) {
                setCart((prevCart) => ({
                    ...prevCart,
                    itemsPlacedInCart: prevCart.itemsPlacedInCart.map((item) => {
                        if(item.name === itemName) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        } else {
                            return item;
                        }
                    })

                }))
            } else {
                setCart((prevCart) => ({
                    ...prevCart,
                    itemsPlacedInCart: [
                        ...prevCart.itemsPlacedInCart,
                        newCartAddition
                    ]
                }))
            }
        } else {
            console.log("ERROR: Invalid Item Name. No Match in storefrontConfig!")
        }
    }

    console.log(cart)

    return (
        <div
            className={"grid place-items-center h-full"}
        >
            <StorefrontNavBar cartItems={cart.itemsPlacedInCart}/>
            <Cart
                cartDiscount={cart.cartDiscount}
                itemsPlacedInCart={cart.itemsPlacedInCart}
                onClear={handleOnClear}
            />
            <AddCartItemsButtons
                availableItems={storefrontConfig.availableItems}
                handleAddItemToCart={handleCartAddition}
            />
        </div>
    )
}

export default MockStorefrontPage;