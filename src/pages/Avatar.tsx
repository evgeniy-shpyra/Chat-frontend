import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { errorIsShown, setAvatar } from '../redux/features/userSlice'

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

const Avatar = () => {
    const dispatch = useAppDispatch()
    const [imageBase64, setImageBase64] = React.useState<string>('')
    const [file, setFile] = React.useState<Blob>()

    const { error } = useAppSelector((state) => state.user)

    React.useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(errorIsShown())
        }
    }, [error])

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
        if (file) dispatch(setAvatar(file))
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='bg-second_bg rounded-[20px] p-[50px]'>
                <h1 className='text-[30px] text-paragraph font-medium text-center pb-[50px]'>
                    Add avatar for your profile
                </h1>
                <div className='mx-auto w-[200px] h-[200px] bg-white rounded-full border-[1.5px] border-gray_10 mb-[50px] truncate relative'>
                    <img
                        src={
                            imageBase64.length > 0
                                ? imageBase64
                                : './assets/default-avatar.png'
                        }
                        className='absolute top-0 right-0 h-full object-cover z-0'
                    />
                    <label
                        htmlFor='set-avatar'
                        className='w-full bg-gray_10/70 h-[50px] text-center text-gray_60 cursor-pointer pt-[5px] absolute right-0 bottom-0 z-10'
                    >
                        select picture
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
                            'inline-block bg-[#84C7AE] px-[50px] py-[20px] rounded-[23px] text-[25px] text-white'
                        }
                    >
                        Set as profile picture
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Avatar
