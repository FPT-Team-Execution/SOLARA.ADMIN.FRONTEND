import { BASE_API } from '../../constants/apis'
import { notification } from 'antd'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const axiosClient = axios.create({
    baseURL: BASE_API,
    headers: {
        'content-type': 'application/json'
    },
    timeout: 300000,
    timeoutErrorMessage: `Connection is timeout exceeded`
})

axiosClient.interceptors.request.use(async (config) => {
    const token = getCookie('__session'); 
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config
})

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response
        }
        return response
    },
    (error) => {
        notification.error({
            message: 'Error',
            description: error.message
        })
        throw error
    }
)
export default axiosClient
