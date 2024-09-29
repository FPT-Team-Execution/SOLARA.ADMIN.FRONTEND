// api/axiosClient.js
import {notification} from 'antd'
import axios from 'axios'
import queryString from 'query-string'
import {BASE_URL} from "../url/baseUrl.ts";

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: (params) => queryString.stringify(params),
    timeout: 10 * 1000
})

axiosClient.interceptors.request.use(async (config) => {
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
