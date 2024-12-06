import { IBaseModel, IPageRequest, IPaginate } from "../../types/general.type.ts";
import { SubTopicDto, UpdateSubTopicRequest } from "../../types/subTopic.ts";
import axiosClient from "./axiosClient.ts";
import { COLLECTION_URL } from "../url/collectionUrl.ts";
import { notification } from "antd";
import { messageHelper } from "../funcs/messageHelper.ts";

interface ICollectionApi {
    getCollections: (query: IPageRequest) => Promise<IBaseModel<IPaginate<SubTopicDto>>>
    getCollection: (id: string) => Promise<IBaseModel<SubTopicDto>>;
    getOnTopic: (id: string, request: IPageRequest) => Promise<IBaseModel<IPaginate<SubTopicDto>>>;
    postCollection: (request: UpdateSubTopicRequest) => Promise<IBaseModel<SubTopicDto>>;
    putCollection: (id: string, request: UpdateSubTopicRequest) => Promise<IBaseModel<SubTopicDto>>;
    deleteCollection: (id: string) => Promise<IBaseModel<SubTopicDto>>;
}

export const collectionApi: ICollectionApi = {
    getCollections: async (query: IPageRequest) => {
        const response = await axiosClient.get<IBaseModel<IPaginate<SubTopicDto>>>(COLLECTION_URL.GETS(query));
        return response.data;
    },
    getCollection: async (id: string) => {
        const response = await axiosClient.get<IBaseModel<SubTopicDto>>(COLLECTION_URL.GET_POS_PUT_DEL(id));
        return response.data;
    },
    getOnTopic: async (id: string, request: IPageRequest) => {
        const response = await axiosClient.get<IBaseModel<IPaginate<SubTopicDto>>>(COLLECTION_URL.GET_ON_TOPIC(id, request));
        return response.data;
    },
    postCollection: async (request: UpdateSubTopicRequest) => {
        const response = await axiosClient.post<IBaseModel<SubTopicDto>>(COLLECTION_URL.GET_POS_PUT_DEL(), request);
        if (response.data.isSuccess == true) {
            notification.success({
                message: "Sucess",
                description: messageHelper.createSucess("sub-topics")
            })
        }
        return response.data;
    },
    putCollection: async (id: string, request: UpdateSubTopicRequest) => {
        console.log(request);
        const response = await axiosClient.put<IBaseModel<SubTopicDto>>(COLLECTION_URL.GET_POS_PUT_DEL(), request);
        if (response.data.isSuccess == true) {
            notification.success({
                message: "Sucess",
                description: messageHelper.updateSucess("sub-topics")
            })
        }
        return response.data;
    },
    deleteCollection: async (id: string) => {
        const response = await axiosClient.delete<IBaseModel<SubTopicDto>>(COLLECTION_URL.GET_POS_PUT_DEL(id));
        if (response.data.isSuccess == true) {
            notification.success({
                message: "Sucess",
                description: messageHelper.deleteSucess("sub-topics")
            })
        }
        return response.data;
    }
}