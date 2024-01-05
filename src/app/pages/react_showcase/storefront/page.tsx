"use client";
import React, { useState } from "react";
import StorefrontNavBar from "src/projects-and-modules/react-showcase-project/components/MockStorefront/StorefrontNavBar";
import Cart from "src/projects-and-modules/react-showcase-project/components/MockStorefront/Cart";
import AddCartItemsButtons from "src/projects-and-modules/react-showcase-project/components/MockStorefront/AddCartItemsButtons";
import { produce } from "immer";
import ExpandableText from "src/app/components/Generic/ExpandableText";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface cartObject {
  cartDiscount: number;
  itemsPlacedInCart: cartItem[];
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
    storeWelcomeMessage:
      "Welcome to Blissful Cruises - Your Gateway to Amazing Adventures!\n" +
      "\n" +
      "🌍 Discover the World with Us! 🌍\n" +
      "\n" +
      "🌟 Explore New Destinations\n" +
      "Dreaming of a tropical paradise, a bustling city adventure, or a serene mountain retreat? We have it all! Let us guide you to your next unforgettable destination.\n" +
      "\n" +
      "🚀 Tailored Travel Experiences\n" +
      "Every traveler is unique, and so should be their journey. We customize travel plans to suit your style, preferences, and budget.\n" +
      "\n" +
      "🏖️ Exclusive Deals and Offers\n" +
      "Benefit from our exclusive deals on flights, hotels, and holiday packages. Your dream vacation is just a click away, and it's more affordable than you think!\n" +
      "\n" +
      "🌐 Expert Travel Advice\n" +
      "Our experienced travel consultants are here to provide you with insider tips, recommendations, and all the assistance you need for a hassle-free experience.\n" +
      "\n" +
      "🔒 Safe and Secure Travel\n" +
      "Your safety and satisfaction are our top priorities. We ensure secure bookings and support you every step of your journey.\n" +
      "\n" +
      "✈️ Let's Plan Your Next Adventure!\n" +
      "Visit us or contact our team today. Your next memorable adventure is waiting!\n" +
      "\n" +
      "Blissful Cruises` - Where Journeys Begin! 🛫",
    // Each item's quantity is set to one in the configuration so when it is added to a cart for the first time, its
    // quantity is correct
    availableItems: [
      {
        id: 1,
        name: "Product 1",
        quantity: 1,
      },
      {
        id: 2,
        name: "Product 2",
        quantity: 1,
      },
    ],
  });

  // Initial Customer Cart State
  const [cart, setCart] = useState<cartObject>({
    cartDiscount: 0,
    itemsPlacedInCart: [],
  });

  const currentPathString = usePathname();

  const handleOnClear = () => {
    // Because the cartItem state is in this component, we're going to update the cartItems here to an empty
    // array, clearing it.
    setCart({
      ...cart,
      itemsPlacedInCart: [],
    });
  };

  const handleCartAddition = (itemId: number) => {
    // Checking the Storefront's Configuration for Item
    const newCartAddition = storefrontConfig.availableItems.find((item) => {
      return item.id === itemId;
    });

    // Checking Cart for Existing Item
    const existingCartItem = cart.itemsPlacedInCart.find(
      (item) => item.id === itemId,
    );

    // If the cart addition is a valid cart
    if (newCartAddition !== undefined) {
      // If the item already exist in cart
      if (existingCartItem) {
        setCart((prevCart) => ({
          ...prevCart,
          itemsPlacedInCart: prevCart.itemsPlacedInCart.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            } else {
              return item;
            }
          }),
        }));
      } else {
        setCart((prevCart) => ({
          ...prevCart,
          itemsPlacedInCart: [...prevCart.itemsPlacedInCart, newCartAddition],
        }));
      }
    } else {
      console.log("ERROR: Invalid Item Name. No Match in storefrontConfig!");
    }
  };

  return (
    <div className={"grid place-items-center h-full"}>
      <ExpandableText
        rawTextString={"Hello There!"}
        maxCharsBeforeExpansion={150}
      />
      <ExpandableText
        rawTextString={storefrontConfig.storeWelcomeMessage}
        maxCharsBeforeExpansion={150}
      />
      <StorefrontNavBar cartItems={cart.itemsPlacedInCart} />
      <Cart
        cartDiscount={cart.cartDiscount}
        itemsPlacedInCart={cart.itemsPlacedInCart}
        onClear={handleOnClear}
      />
      <AddCartItemsButtons
        availableItems={storefrontConfig.availableItems}
        handleAddItemToCart={handleCartAddition}
      />
      <Link href={currentPathString + "/marketing-sign-up"}>
        <button className={"btn btn-outline btn-info mt-5"}>
          Sign Up For Promotional Deals!
        </button>
      </Link>
    </div>
  );
};

export default MockStorefrontPage;
