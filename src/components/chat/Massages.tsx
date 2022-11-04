import React from 'react'
import { OwnerOfMassageEnum } from '../../models/models'
import InputMassage from './InputMassage'
import Massage from './Massage'

const Massages = () => {
    const massagesTrackRef = React.useRef<HTMLDivElement>(null)

    const scrollToBottom = (): void => {
        massagesTrackRef.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }

    React.useEffect(() => {
        scrollToBottom()
    }, [])

    return (
        <div className='flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-background_3 scrollbar-thumb scrollbar-thumb-rounded-full scrollbar-track-none scrollbar-track-rounded-full'>
            <div ref={massagesTrackRef} className='px-[25px] justify-self-end'>
                {/* <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg'
                    text='11111111111'
                    owner={OwnerOfMassageEnum.My}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg'
                    text='2222222222222222'
                    owner={OwnerOfMassageEnum.NotMine}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg'
                    text='3333333333'
                    owner={OwnerOfMassageEnum.My}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg'
                    text='444444444444444444'
                    owner={OwnerOfMassageEnum.NotMine}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg'
                    text='55555555555555555'
                    owner={OwnerOfMassageEnum.My}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg'
                    text='66666666666666666666666666666666 6666666666666666666666666666666666 6666666666666666666666666'
                    owner={OwnerOfMassageEnum.NotMine}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg'
                    text='77777777777'
                    owner={OwnerOfMassageEnum.NotMine}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg'
                    text='11111111111'
                    owner={OwnerOfMassageEnum.My}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg'
                    text='2222222222222222'
                    owner={OwnerOfMassageEnum.NotMine}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg'
                    text='3333333333'
                    owner={OwnerOfMassageEnum.My}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg'
                    text='444444444444444444'
                    owner={OwnerOfMassageEnum.NotMine}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg'
                    text='55555555555555555'
                    owner={OwnerOfMassageEnum.My}
                /> */}
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg'
                    text='66666666666666666666666666666666 6666666666666666666666666666666666 6666666666666666666666666'
                    owner={OwnerOfMassageEnum.NotMine}
                />
                <Massage
                    avatarUrl='https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg'
                    text='77777777777'
                    owner={OwnerOfMassageEnum.NotMine}
                />
            </div>

        </div>
    )
}

export default Massages
