interface cartItem {
    id: number;
    name: string;
    quantity: number;
}

const calculateCartQuantity = (actualItemsPlacedInCart: cartItem[]): number => {
    let cartQuantityTotal = 0;


    console.log(typeof actualItemsPlacedInCart)
    // Setting to a var for faster looping
    let uniqueCartItemsQuantity = actualItemsPlacedInCart.length

    for (let i = 0; i < uniqueCartItemsQuantity; i++) {
        cartQuantityTotal = cartQuantityTotal + actualItemsPlacedInCart[i].quantity
    }
    return cartQuantityTotal;
}

export default calculateCartQuantity;