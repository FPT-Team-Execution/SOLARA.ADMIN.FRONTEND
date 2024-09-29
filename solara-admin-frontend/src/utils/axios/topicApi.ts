import axiosClient from "./axiosClient.ts";
import {BaseReModel, PageReqModel, SubModel} from "../../types/general.type.ts";
import {TOPIC_URL} from "../url/topicUrl.ts";
import {GetTopicModels} from "../../types/topic.type.ts";

interface ITopicApi {
    getTopics: (query: PageReqModel) => Promise<BaseReModel<SubModel<GetTopicModels>>>;
}

export const topicApi: ITopicApi = {
    getTopics: async (query: PageReqModel) => {
        const response = await axiosClient.get<BaseReModel<SubModel<GetTopicModels>>>(TOPIC_URL.GETS(query));
        return response.data;
    }
}
