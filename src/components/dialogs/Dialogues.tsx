import React from 'react'
import Toolbar from './Toolbar'
import Dialog from './Dialog'

const dialogues = [
    
    {
        name: 'Alex',
        massage: 'Hello, man! How are you? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg',
    },
    {
        name: 'Max',
        massage: 'What do you think about it? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg',
    },
    {
        name: 'Nik',
        massage: 'I am okay tooasdasdsadasdasdasdsadasdasdasdsa ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232435400-5.jpg',
    },
    {
        name: 'Alex1',
        massage: 'Hello, man! How are you?',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232249540-4.jpg',
    },

    {
        name: 'Alex',
        massage: 'Hello, man! How are you? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg',
    },
    {
        name: 'Max',
        massage: 'What do you think about it? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg',
    },
    {
        name: 'Nik',
        massage: 'I am okay tooasdasdsadasdasdasdsadasdasdasdsa ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232435400-5.jpg',
    },
    {
        name: 'Alex1',
        massage: 'Hello, man! How are you?',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232249540-4.jpg',
    },
    {
        name: 'Alex',
        massage: 'Hello, man! How are you? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg',
    },
    {
        name: 'Max',
        massage: 'What do you think about it? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg',
    },
    {
        name: 'Nik',
        massage: 'I am okay tooasdasdsadasdasdasdsadasdasdasdsa ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232435400-5.jpg',
    },
    {
        name: 'Alex1',
        massage: 'Hello, man! How are you?',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232249540-4.jpg',
    },
    {
        name: 'Alex',
        massage: 'Hello, man! How are you? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg',
    },
    {
        name: 'Max',
        massage: 'What do you think about it? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg',
    },
    {
        name: 'Nik',
        massage: 'I am okay tooasdasdsadasdasdasdsadasdasdasdsa ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232435400-5.jpg',
    },
    {
        name: 'Alex1',
        massage: 'Hello, man! How are you?',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232249540-4.jpg',
    },
    {
        name: 'Alex',
        massage: 'Hello, man! How are you? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg',
    },
    {
        name: 'Max',
        massage: 'What do you think about it? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg',
    },
    {
        name: 'Nik',
        massage: 'I am okay tooasdasdsadasdasdasdsadasdasdasdsa ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232435400-5.jpg',
    },
    {
        name: 'Alex1',
        massage: 'Hello, man! How are you?',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232249540-4.jpg',
    },
    {
        name: 'Alex',
        massage: 'Hello, man! How are you? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667235494782-1551511801_1.jpg',
    },
    {
        name: 'Max',
        massage: 'What do you think about it? ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232732067-1551512888_2-730x617.jpg',
    },
    {
        name: 'Nik',
        massage: 'I am okay tooasdasdsadasdasdasdsadasdasdasdsa ',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232435400-5.jpg',
    },
    {
        name: 'Alex1',
        massage: 'Hello, man! How are you?',
        avatarUrl:
            'https://ev-chat-images.s3.eu-north-1.amazonaws.com/1667232249540-4.jpg',
    },
]

const Dialogues = () => {
    const handleSearch = (value: string) => {}

    return (
        <div className='flex-none w-[450px] bg-background_1 relative border-r-2 pr-[5px]'>
            <Toolbar />
            <div className='h-[calc(100%-103px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-background_3 scrollbar-thumb scrollbar-thumb-rounded-full scrollbar-track-none'>
                <ul>
                    {dialogues.map((item) => (
                        <Dialog
                            key={item.name}
                            name={item.name}
                            avatarUrl={item.avatarUrl}
                            massage={item.massage}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dialogues
