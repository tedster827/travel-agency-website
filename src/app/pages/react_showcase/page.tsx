import React from "react";
import Link from "next/link";
import ShimmerButton from "src/app/components/Generic/ShimmerButton";

const ShowcaseHomePage: React.FunctionComponent = () => {
  return (
    <>
      <title>Blissful Cruises: React Showcase</title>
      <h1>React Showcase</h1>
      <ShimmerButton rawTextString="React Showcase"/>
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
        <li>
          <Link href={"/pages/react_showcase/video-game-discovery-app-demo"}>
            Video Game Discovery App Demo
          </Link>
        </li>
      </ul>
    </>
  );
};

export default ShowcaseHomePage;
