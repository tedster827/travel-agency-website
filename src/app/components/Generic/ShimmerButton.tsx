import React from "react"

interface ShimmerButtonProps {
    rawTextString: string;
}


const ShimmerButton: React.FunctionComponent<ShimmerButtonProps> = ({rawTextString}: ShimmerButtonProps) => {
    return (
        <div>
            <button>
                <span className="text">{rawTextString}</span>
                <span className="position: absolute inset-10 mask-image"></span>
            </button>
        </div>
    )
}

export default ShimmerButton;