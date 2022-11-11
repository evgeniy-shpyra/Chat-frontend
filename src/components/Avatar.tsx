import React from 'react'

interface AvatarProps {
    imagePath: string | null
    size?: number
}

const Avatar: React.FC<AvatarProps> = ({ imagePath, size = 60 }) => {
    return (
        <img
            src={imagePath ? imagePath : './assets/default-avatar.png'}
            className={`h-[${size}px] w-[${size}px] object-cover rounded-full bg-white`}
        />
    )
}

export default Avatar
