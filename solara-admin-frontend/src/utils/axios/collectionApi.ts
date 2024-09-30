import {BaseReModel, PageReqModel, PaginationResModel, SubResModel} from "../../types/general.type.ts";
import {CollectionModel} from "../../types/collection.type.ts";
import axiosClient from "./axiosClient.ts";
import {COLLECTION_URL} from "../url/collectionUrl.ts";

interface ICollectionApi {
    getCollections: (query: PageReqModel) => Promise<BaseReModel<SubResModel<PaginationResModel<CollectionModel>>>>
    getCollection: (id: string) => Promise<BaseReModel<CollectionModel>>;
    getOnTopic: (id: string) => Promise<BaseReModel<SubResModel<PaginationResModel<CollectionModel>>>>
}

export const collectionApi: ICollectionApi = {
    getCollections: async (query: PageReqModel) => {
        const response = await axiosClient.get<BaseReModel<SubResModel<PaginationResModel<CollectionModel>>>>(COLLECTION_URL.GETS(query));
        return response.data;
    },
    getCollection: async (id: string) => {
        const response = await axiosClient.get(COLLECTION_URL.GET_ON_TOPIC(id));
        return response.data;
    },
    getOnTopic: async (id: string) => {
        const response = await axiosClient.get(COLLECTION_URL.GET_ON_TOPIC(id));
        return response.data;
    }
}