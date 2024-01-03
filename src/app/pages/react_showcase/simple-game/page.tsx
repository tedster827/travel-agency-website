'use client'

import React, {useState} from "react"
import {DivNode} from "postcss-value-parser";
import {produce} from "immer";

const SimpleGame: React.FunctionComponent = () => {
    const [game, setGame] = useState({
        id: 1,
        player: {
            name: "Tedster",
        }
    })

    const handleUpdateNameButtonClick = () => {
        setGame(produce(draft => {
            draft.player.name = "Tiedster"
        }))

        // Implementation with using immer's produce function for typical JS syntax
        setGame({
            ...game,
            player: {
                ...game.player,
                name: "Tiedster"
            }
        })
    }

    return (
        <div>
            <h1>Simple Game</h1>
            <h2>Current Player</h2>
            <p>{game.player.name}</p>
            <button
                className={"btn"}
                onClick={handleUpdateNameButtonClick}
            >
                Update Name To Tiedster
            </button>
        </div>
    )
}

export default SimpleGame;