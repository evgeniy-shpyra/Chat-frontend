import React from 'react'
import { scrollTrackStyle } from '../styles'

interface ScrollContainerProps {
    children: React.ReactNode
    heightStyle: string
    onScrollList?: (e: React.UIEvent<HTMLElement>) => void
    isLocked?: boolean
}

const ScrollContainer = ({
    children,
    heightStyle,
    isLocked = false,
    onScrollList,
}: ScrollContainerProps) => {

    const onScrollHandler = (e: React.UIEvent<HTMLElement>) => {
        if (onScrollList) onScrollList(e)
    }
    return (
        <div
            onScroll={onScrollHandler}
            className={`${heightStyle} w-full transition-[overflow] ${scrollTrackStyle}`}
            style={isLocked ? { overflow: 'hidden', padding: '0 8px 0 0' } : { overflow: 'scroll' }}
        >
            {children}
        </div>
    )
}

export default ScrollContainer
