import React from 'react'
import defaultImage from '../assets/default-avatar.png'

interface AvatarProps {
    imagePath: string | null
    onClick?: () => void
    styles?: string
}

const Avatar: React.FC<AvatarProps> = ({ imagePath, styles, onClick }) => {
    const onClickHandler = () => {
        onClick && onClick()
    }

    return (
        <img
            src={imagePath ? imagePath : defaultImage}
            className={`object-cover rounded-full bg-white ${styles}`}
            // style={{ height: size, width: size }}
            onClick={onClickHandler}
        />
    )
}

export default Avatar
