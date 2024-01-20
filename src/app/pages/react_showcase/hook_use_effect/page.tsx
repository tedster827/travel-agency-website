"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductList from "src/app/components/Generic/ProductList";

const UseEffectPage: React.FunctionComponent = () => {
  const [category, setCategory] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  // A better name for useEffect would be after render because simply put this is code that is executed after
  // render.
  // Note: The useEffect hook can only be called at the top level of the component like useState.
  useEffect(() => {
    // Side Effect: With this piece of code, we are changing the state of the DOM.
    if (ref.current) {
      // Note: This changes something outside of the component. This is no longer a pure component if we don't call
      //  the useEffect hook
      ref.current.focus();
    }
  }, []);

  // Aside: It can also be called number times for different purposes.
  useEffect(() => {
    document.title = "Use Effect Experimenting";
  }, []);

  return (
    <div>
      <select
        name=""
        id=""
        className="form-select"
        onChange={(event) => {
          setCategory(event.target.value);
        }}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <input ref={ref} type={"text"} className={"form-control"} />
      <ProductList category={category} />
    </div>
  );
};

export default UseEffectPage;
