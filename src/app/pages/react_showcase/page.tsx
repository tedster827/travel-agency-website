import React from "react";
import Link from "next/link";

const ShowcaseHomePage: React.FunctionComponent = () => {
    return (
        <>
            <title>Stopwatch Application</title>
            <h1>React Showcase</h1>
            <p>List of React Development Examples by Teddy Williams</p>
            <ul>
                <Link href={'/pages/react_showcase/stopwatch'}>Stopwatch</Link>
            </ul>
        </>
    )
}

export default ShowcaseHomePage;