'use client'
import React, {useEffect, useState} from "react";

const Stopwatch: React.FunctionComponent = () => {
    const [time, setTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const handleTimerStart = () => {
        setIsTimerRunning(true)
    }

    const handleTimerPauseAndResume = () => {
        setIsTimerRunning(!isTimerRunning)
    }

    const handleResetTimer = () => {
        setTime(0)
        setIsTimerRunning(false)
    }

    // increments timer by 1 every seconds
    const tick = () => {
        setTime(prevTime => prevTime + 0.01)
    }

    // Re-Renders the page every second and clears the one-second interval
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if(isTimerRunning) {
            interval = setInterval(tick, 10)
        }

        return () => {
            clearInterval(interval)
        }
    }, [isTimerRunning]);

    return(
        <>
            <div className={"list-group p-2"}>
                <h1>Time: {time.toFixed(2)}</h1>
                <h1>Whole Seconds</h1>
                <button
                    className={"btn"}
                    onClick={handleTimerStart}
                >
                    Start
                </button>
                <button
                    className={"btn"}
                    onClick={handleTimerPauseAndResume}
                >
                    Stop / Pause
                </button>
                <button
                    className={"btn"}
                    onClick={handleResetTimer}
                >
                    Reset
                </button>
            </div>
        </>
    )
}
export default Stopwatch;