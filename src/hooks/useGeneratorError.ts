import React from 'react'
import { toast } from 'react-toastify'

const useGeneratorError = (error: string | null): void => {
    React.useEffect(() => {
        if (error) toast.error(error)
    }, [error])
} 

export default useGeneratorError
