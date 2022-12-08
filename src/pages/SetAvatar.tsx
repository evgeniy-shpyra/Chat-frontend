import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Preloader from '../components/Preloader'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { errorIsShown, setAvatar } from '../redux/features/authSlice'
import defaultImage from '../assets/default-avatar.png'

const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

const SetAvatar = () => {
    const dispatch = useAppDispatch()

    const [imageBase64, setImageBase64] = React.useState<string>('')
    const [file, setFile] = React.useState<Blob>()

    const { error, isLoading } = useAppSelector((state) => state.auth)

    const navigate = useNavigate()

    React.useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(errorIsShown())
        }
    }, [error])

    // React.useEffect(() => {
    //     if (imagePath) navigate('/')
    // }, [imagePath])

    const handleSelectImage = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0]

        if (file) setFile(file)

        await convertBase64(file)
            .then((base64: any) => {
                setImageBase64(base64.toString())
            })
            .catch(() => {
                toast.error('Photo upload error, please try again')
            })
    }

    const handleSubmit = () => {
        if (file)
            dispatch(setAvatar(file)).then((res) => {
                if (res.meta.requestStatus === 'fulfilled') navigate('/')
            })
        else navigate('/')
    }

    return (
        <>
            <div className='flex justify-center items-center w-full h-screen'>
                <div className='bg-second_bg p-[50px] rounded-[20px] mx-[10px]'>
                    <h1 className='text-[30px] leading-10 text-paragraph font-medium text-center pb-[40px] sm:pb-[50px]'>
                        Add avatar for your profile
                    </h1>
                    <div className='mx-auto w-[200px] h-[200px] bg-white rounded-full border-[1.5px] border-gray_10 mb-[50px] truncate relative'>
                        <img
                            src={
                                imageBase64.length > 0
                                    ? imageBase64
                                    : defaultImage
                            }
                            className='absolute top-0 right-0 h-full object-cover z-0'
                        />
                        <label
                            htmlFor='set-avatar'
                            className='w-full bg-gray_10/70 h-[50px] text-center text-gray_60 cursor-pointer pt-[5px] absolute right-0 bottom-0 z-10'
                        >
                            upload picture
                        </label>
                        <input
                            id='set-avatar'
                            type='file'
                            accept='image/png, image/svg, image/jpeg'
                            className='hidden'
                            multiple={false}
                            onChange={handleSelectImage}
                        />
                    </div>
                    <div className='text-center'>
                        <button
                            onClick={handleSubmit}
                            className={
                                'inline-block bg-[#84C7AE] px-[30px] py-[15px] text-[20px] rounded-[15px] sm:px-[40px] sm:py-[17px] sm:rounded-[20px] sm:text-[22px] md:px-[50px] md:py-[20px] md:rounded-[23px] md:text-[25px] text-white'
                            }
                        >
                            Set as profile picture
                        </button>
                    </div>
                </div>
            </div>
            {isLoading && <Preloader />}
        </>
    )
}

export default SetAvatar
