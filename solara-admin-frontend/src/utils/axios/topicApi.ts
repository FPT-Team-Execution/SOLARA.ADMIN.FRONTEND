import axiosClient from "./axiosClient.ts";
import { IBaseModel, IPaginate, IPageRequest } from "../../types/general.type.ts";
import { TOPIC_URL } from "../url/topicUrl.ts";
import { TopicDto, TopicResModel, UpdateTopicRequest, CreateTopicRequest } from "../../types/topic.type.ts";
import { notification } from "antd";
import { messageHelper } from "../funcs/messageHelper.ts";

interface ITopicApi {
    getTopics: (query: IPageRequest) => Promise<IBaseModel<IPaginate<TopicDto>>>;
    getTopic: (id: string) => Promise<IBaseModel<TopicResModel>>;
    postTopic: (request: CreateTopicRequest) => Promise<IBaseModel<TopicResModel>>;
    putTopic: (request: UpdateTopicRequest) => Promise<IBaseModel<TopicResModel>>;
    deleteTopic: (id: string) => Promise<IBaseModel<TopicDto>>;
}

export const topicApi: ITopicApi = {
    getTopics: async (query: IPageRequest) => {
        const response = await axiosClient.get<IBaseModel<IPaginate<TopicDto>>>(TOPIC_URL.GETS(query));
        return response.data;
    },
    getTopic: async (id: string) => {
        const response = await axiosClient.get<IBaseModel<TopicResModel>>(TOPIC_URL.GET_POS_PUT_DEL(id));
        return response.data;
    },
    postTopic: async (request: CreateTopicRequest) => {
        const response = await axiosClient.post<IBaseModel<TopicResModel>>(TOPIC_URL.GET_POS_PUT_DEL(), request);
        if (response.data.isSuccess == true) notification.success({
            message: 'Success',
            description: messageHelper.createSucess("topic")
        })
        return response.data;
    },
    putTopic: async ( request: UpdateTopicRequest) => {
        const response = await axiosClient.put<IBaseModel<TopicResModel>>(TOPIC_URL.GET_POS_PUT_DEL(), request);
        if (response.data.isSuccess == true) notification.success({
            message: 'Success',
            description: messageHelper.updateSucess("topic")
        })
        return response.data;
    },
    deleteTopic: async (id: string) => {
        const response = await axiosClient.delete<IBaseModel<TopicDto>>(TOPIC_URL.GET_POS_PUT_DEL(id));
        if (response.data.isSuccess == true) notification.success({
            message: 'Success',
            description: messageHelper.deleteSucess("topic")
        })
        return response.data;
    }
}
