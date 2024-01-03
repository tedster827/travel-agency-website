import React from "react";
import Link from "next/link";

const ShowcaseHomePage: React.FunctionComponent = () => {
  return (
    <>
      <title>Blissful Cruises: React Showcase</title>
      <h1>React Showcase</h1>
      <h2>List of React Development Examples by Teddy Williams</h2>
      <ul className={"menu"}>
        <li>
          <Link href={"/pages/react_showcase/expense_tracker"}>
            Expense Tracker
          </Link>
        </li>
        <li>
          <Link href={"/pages/react_showcase/stopwatch"}>Stopwatch</Link>
        </li>
        <li>
          <Link href={"/pages/react_showcase/storefront"}>Mock Storefront</Link>
        </li>
        <li>
          <Link href={"/pages/react_showcase/simple-game"}>Simple Game</Link>
        </li>
        <li>
          <Link href={"/pages/react_showcase/simple-pizza-app"}>
            Simple Pizza App
          </Link>
        </li>
      </ul>
    </>
  );
};

export default ShowcaseHomePage;
