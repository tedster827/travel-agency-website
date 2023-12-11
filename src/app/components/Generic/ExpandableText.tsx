'use client'

import React, {useState} from "react"

interface ExpandableTextProps {
    rawTextString: string;
    maxCharsBeforeExpansion?: number;
}

const ExpandableText: React.FunctionComponent<ExpandableTextProps> = ({rawTextString, maxCharsBeforeExpansion = 250}: ExpandableTextProps) => {
    const [isTextExpanded, setIsTextExpanded] = useState<boolean>(false)

    if (rawTextString.length <= maxCharsBeforeExpansion) {
        return (
            <p>
                {rawTextString}
            </p>
        )
    }

    return (
        <div>
            {isTextExpanded &&
                <div>
                    <p>
                        {rawTextString}
                    </p>
                    <button
                        className={"btn"}
                        onClick={() => {
                            setIsTextExpanded(!isTextExpanded);
                        }}
                    >
                        See Less
                    </button>
                </div>
            }
            {!isTextExpanded &&
                <div>
                    <p>
                        {rawTextString.slice(0, maxCharsBeforeExpansion)} ...
                    </p>
                    <button
                        className={"btn"}
                        onClick={() => {
                            setIsTextExpanded(!isTextExpanded);
                        }}
                    >
                        See More
                    </button>
                </div>
            }
        </div>
    )
}

export default ExpandableText;