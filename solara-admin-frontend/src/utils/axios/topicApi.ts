import axiosClient from "./axiosClient.ts";
import {BaseModel, BaseReModel, PageReqModel, PaginationResModel, SubResModel} from "../../types/general.type.ts";
import {TOPIC_URL} from "../url/topicUrl.ts";
import {TopicModel, TopicResModel} from "../../types/topic.type.ts";

interface ITopicApi {
    getTopics: (query: PageReqModel) => Promise<BaseReModel<SubResModel<PaginationResModel<TopicModel>>>>;
    getTopic: (id: string) => Promise<BaseReModel<TopicResModel>>;
    postTopic: () => Promise<BaseReModel<TopicResModel>>;
    putTopic: (id: string) => Promise<BaseReModel<TopicResModel>>;
    deleteTopic: (id: string) => Promise<BaseModel>;
}

export const topicApi: ITopicApi = {
    getTopics: async (query: PageReqModel) => {
        const response = await axiosClient.get<BaseReModel<SubResModel<PaginationResModel<TopicModel>>>>(TOPIC_URL.GETS(query));
        return response.data;
    },
    getTopic: async (id: string) => {
        const response = await axiosClient.get<BaseReModel<TopicResModel>>(TOPIC_URL.GET_POS_PUT_DEL(id));
        return response.data;
    },
    postTopic: async () => {
        const response = await axiosClient.post<BaseReModel<TopicResModel>>(TOPIC_URL.GET_POS_PUT_DEL());
        return response.data;
    },
    putTopic: async (id: string) => {
        const response = await axiosClient.put<BaseReModel<TopicResModel>>(TOPIC_URL.GET_POS_PUT_DEL(id));
        return response.data;
    },
    deleteTopic: async (id: string) => {
        const response = await axiosClient.delete<BaseModel>(TOPIC_URL.GET_POS_PUT_DEL(id));
        return response.data;
    }
}
