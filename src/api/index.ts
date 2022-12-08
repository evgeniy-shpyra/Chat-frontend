import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: `${process.env.REACT_APP_SERVER_HOST}/api/`,
})

instance.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export enum ResultCode {
    Error = 0, 
    Success = 1,
}

export default instance
