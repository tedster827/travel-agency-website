'use client'

import { link } from "fs";
import Link from "next/link";
import React from "react"

interface NavigationBarItemProps {
    label: string;
    linkPath?: string;
}

const NavigationBarItem: React.FunctionComponent<NavigationBarItemProps> = ({label, linkPath = ""}: NavigationBarItemProps) => {
    return (
        <>
            <Link href={linkPath}>{label}</Link>
        </>
    )
}

export default NavigationBarItem;