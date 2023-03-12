import React from 'react'

export function MiniCard({ children, className = "" }) {
    return (
        <div className={`p-4 sm:px-7 border-[1px] rounded-lg text-left ${className}`}>
            {children}
        </div>
    )
}

export default MiniCard