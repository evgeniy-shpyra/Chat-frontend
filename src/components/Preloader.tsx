import React from 'react'

const Preloader = () => {
    return (
        <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-30'>
            {/* <div>Loading</div> */}
            <svg
                xmlns='http://www.w3.org/2000/svg'
                // xmlns:xlink='http://www.w3.org/1999/xlink'
                className='animate-[appearance_0.2s_ease-in-out]'
                width='100px'
                height='100px'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid'
            >
                <g transform='translate(50,50)'>
                    <g transform='scale(0.7)'>
                        <circle cx='0' cy='0' r='50' fill='#e90c59'></circle>
                        <circle cx='0' cy='-28' r='15' fill='#aae3cd'>
                            <animateTransform
                                attributeName='transform'
                                type='rotate'
                                dur='1s'
                                repeatCount='indefinite'
                                keyTimes='0;1'
                                values='0 0 0;360 0 0'
                            ></animateTransform>
                        </circle>
                    </g>
                </g>
            </svg>
        </div>
    )
}

export default Preloader
