import axiosClient from "./axiosClient.ts";
import { BaseModel, BaseReModel, PageReqModel, PaginationResModel } from "../../types/general.type.ts";
import { TOPIC_URL } from "../url/topicUrl.ts";
import { TopicModel, TopicResModel, UpsertTopicReqModel } from "../../types/topic.type.ts";
import { notification } from "antd";
import { messageHelper } from "../funcs/messageHelper.ts";

interface ITopicApi {
    getTopics: (query: PageReqModel) => Promise<BaseReModel<PaginationResModel<TopicModel>>>;
    getTopic: (id: string) => Promise<BaseReModel<TopicResModel>>;
    postTopic: (request: UpsertTopicReqModel) => Promise<BaseReModel<TopicResModel>>;
    putTopic: (id: string, request: UpsertTopicReqModel) => Promise<BaseReModel<TopicResModel>>;
    deleteTopic: (id: string) => Promise<BaseModel>;
}

export const topicApi: ITopicApi = {
    getTopics: async (query: PageReqModel) => {
        const response = await axiosClient.get<BaseReModel<PaginationResModel<TopicModel>>>(TOPIC_URL.GETS(query));
        return response.data;
    },
    getTopic: async (id: string) => {
        const response = await axiosClient.get<BaseReModel<TopicResModel>>(TOPIC_URL.GET_POS_PUT_DEL(id));
        return response.data;
    },
    postTopic: async (request: UpsertTopicReqModel) => {
        const response = await axiosClient.post<BaseReModel<TopicResModel>>(TOPIC_URL.GET_POS_PUT_DEL(), request);
        if (response.data.isSuccess == true) notification.success({
            message: 'Success',
            description: messageHelper.createSucess("topic")
        })
        return response.data;
    },
    putTopic: async (id: string, request: UpsertTopicReqModel) => {
        const response = await axiosClient.put<BaseReModel<TopicResModel>>(TOPIC_URL.GET_POS_PUT_DEL(id), request);
        if (response.data.isSuccess == true) notification.success({
            message: 'Success',
            description: messageHelper.updateSucess("topic")
        })
        return response.data;
    },
    deleteTopic: async (id: string) => {
        const response = await axiosClient.delete<BaseModel>(TOPIC_URL.GET_POS_PUT_DEL(id));
        if (response.data.isSuccess == true) notification.success({
            message: 'Success',
            description: messageHelper.deleteSucess("topic")
        })
        return response.data;
    }
}
