import React from 'react'
import { scrollTrackStyle } from '../styles'

interface ScrollContainerProps {
    children: React.ReactNode
    heightStyle: string
}

const ScrollContainer = ({ children, heightStyle }: ScrollContainerProps) => {
    return (
        <div
            className={
                `${heightStyle} overflow-y-scroll w-full ` + scrollTrackStyle
            }
        >
            {children}
        </div>
    )
}

export default ScrollContainer
