import React from "react";


export default function List({className, children}: {className?: string, children: React.ReactNode}) {
    return (
        <ul className={`flex flex-col items-start ${className}`}>
            {children}
    </ul>
    )
}