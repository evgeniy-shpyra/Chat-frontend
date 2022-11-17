import React from 'react'
import { scrollTrackStyle } from '../styles'

interface ScrollContainerProps {
    children: React.ReactNode
    heightStyle: string
    onScrollList?: (e: React.UIEvent<HTMLElement>) => void 
}

const ScrollContainer = ({ children, heightStyle, onScrollList }: ScrollContainerProps) => {
    return (
        <div
            onScroll={onScrollList}
            className={
                `${heightStyle} overflow-y-scroll w-full ease-linear duration-500 ` + scrollTrackStyle
            }
        >
            {children}
        </div>
    )
}

export default ScrollContainer
