import React from "react"
import {ReactNode} from "react";

interface AlertProps {
    children: ReactNode;
}

const Alert: ({ children }: AlertProps) => React.JSX.Element = ({children}:AlertProps) => {

    return(
        <div
            className={"text-blue-100 bg-blue-500"}
        >
            {children}
        </div>
    )
}

export default Alert;