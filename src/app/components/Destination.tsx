import React, {useState} from "react";
import {FcLike, FcLikePlaceholder} from "react-icons/fc";

interface DestinationProps {
    name: string;
    enableLikeButton: boolean;
    enableLikeCount: boolean;
}

const Destination: React.FunctionComponent<DestinationProps> = ({name, enableLikeButton, enableLikeCount}) => {
    const [isSelected, setIsSelected] = useState(false)

    const handleMouseClick = () => {
        setIsSelected(!isSelected)
    }

    return (
        <>
            <li
                 key={name}
                 // Example of dynamic class setting/
                 className={'inline-block mr-2'}
                 onClick={
                     (handleMouseClick)
                 }
            >
                {enableLikeButton &&
                <button onClick={handleMouseClick}
                >
                    {isSelected &&
                        <FcLike/>
                    }
                    {!isSelected &&
                        <FcLikePlaceholder/>
                    }
                </button>
                }
                 <span
                     className={"ml-2"}
                 >{name}</span>
            </li>
        </>
    )
}

export default Destination;