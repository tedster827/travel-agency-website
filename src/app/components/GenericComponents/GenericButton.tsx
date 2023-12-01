import React from "react";

interface GenericButtonProps {
    buttonText?: string,
    handleButtonClick: () => void;
    updatedButtonClassName?: string;
}


/**
 * GenericButton (FC Functional) component for the application.
 *
 * This component renders a Generic Button Component for a standardized functionally and styling.
 *
 */
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