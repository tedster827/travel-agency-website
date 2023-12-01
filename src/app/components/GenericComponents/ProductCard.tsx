import React from "react";
import AddToCartButton from "src/app/components/AddToCartButton";

// import styles from "ProductCard.module.css"

const ProductCard: React.FunctionComponent = () => {
    return(
        <div className={"p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-600"}>
        {/*<div className={styles.card}>*/}
            <AddToCartButton/>
        </div>
    )
}

export default ProductCard;