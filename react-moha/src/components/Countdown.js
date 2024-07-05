import React, {useState} from "react";

export default function Countdown({start}) {
    const [countdown, setCounter] = useState(start);
    // useState could accept function name or anonymous arrow function definition: () => func_name()
    // when state, like countdown, is displayed, function will be called.

    return (
        <React.Fragment>
            <div>{countdown}</div>
        </React.Fragment>
    );
}