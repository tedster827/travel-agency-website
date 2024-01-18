"use client";
import React, { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  // Note: If you use a setVariable (useState update function) in a useEffect that calls this after a render, it
  //  will trigger an infinite render. You have to add something to the second argument for dependencies. The
  //  dependencies are what this code is depended on when ran. For example if the products state variable is added,
  //  it will run it's arrow function when product is updated.
  useEffect(() => {
    console.log("Fetching product in " + category);
    setProducts(["clothing", "household"]);
  }, [category]);

  return <div>Product List </div>;
};

export default ProductList;
