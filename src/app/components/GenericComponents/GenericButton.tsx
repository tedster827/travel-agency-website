import React from "react";
import {updateDestination} from "src/graphql/mutations";

interface GenericButtonProps {
    buttonText?: string,
    handleButtonClick: () => void;
    updatedButtonClassName?: string;
}

const GenericButton: ( { buttonText, handleButtonClick }: GenericButtonProps) => React.JSX.Element = ({ buttonText = 'Button', handleButtonClick, updatedButtonClassName }: GenericButtonProps) => {

    return (
        <>
            <button
                onClick={handleButtonClick}
                className={updatedButtonClassName}
            >
                {buttonText}
            </button>
        </>
    )
}

export default GenericButton;