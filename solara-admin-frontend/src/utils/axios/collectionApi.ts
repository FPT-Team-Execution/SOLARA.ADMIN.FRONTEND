import axiosInstance  from "./axiosInstance"
import { IPageRequest } from "../../types/general.type"
import { UpdateSubTopicRequest } from "../../types/subTopic"

export const collectionApi = {
    getOnTopic: async (topicId: string, query: IPageRequest) => {
        const response = await axiosInstance.get(`/api/v1/sub-topics/topic/${topicId}`, { 
            params: {
                page: query.page,
                size: query.size,
                isAscending: query.isAscending,
                orderOn: query.orderOn
            } 
        })
        console.log('API Response:', response.data) // For debugging
        return response.data
    },

    postCollection: async (request: UpdateSubTopicRequest) => {
        const response = await axiosInstance.post('/api/v1/sub-topics', request)
        return response.data
    },

    putCollection: async (id: string, request: UpdateSubTopicRequest) => {
        const response = await axiosInstance.put(`/api/v1/sub-topics`, {
            ...request,
            subTopicId: id
        })
        return response.data
    },

    deleteCollection: async (id: string) => {
        const response = await axiosInstance.delete(`/api/v1/sub-topics/${id}`)
        return response.data
    }
}