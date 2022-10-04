import { useState, useEffect } from 'react';

export function Time() {
    const [date_time, setDate_Time] = useState(new Date());
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        const timerID = setInterval(() => setDate_Time(new Date()), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    }, [date_time]);

    return (
        <>
            Today is {weekday[new Date().getDay()] + " "} <br></br>
            {new Date().toLocaleString() + " "}
        </>
    )
}
