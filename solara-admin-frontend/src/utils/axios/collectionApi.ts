import { BaseModel, BaseReModel, PageReqModel, PaginationResModel } from "../../types/general.type.ts";
import { CollectionModel, CollectionResModel, UpsertCollectionReqModel } from "../../types/collection.type.ts";
import axiosClient from "./axiosClient.ts";
import { COLLECTION_URL } from "../url/collectionUrl.ts";

interface ICollectionApi {
    getCollections: (query: PageReqModel) => Promise<BaseReModel<PaginationResModel<CollectionModel>>>
    getCollection: (id: string) => Promise<BaseReModel<CollectionModel>>;
    getOnTopic: (id: string, request: PageReqModel) => Promise<BaseReModel<PaginationResModel<CollectionModel>>>;
    postCollection: (request: UpsertCollectionReqModel) => Promise<BaseReModel<CollectionResModel>>;
    putCollection: (id: string, request: UpsertCollectionReqModel) => Promise<BaseReModel<CollectionResModel>>;
    deleteCollection: (id: string) => Promise<BaseModel>;
}

export const collectionApi: ICollectionApi = {
    getCollections: async (query: PageReqModel) => {
        const response = await axiosClient.get<BaseReModel<PaginationResModel<CollectionModel>>>(COLLECTION_URL.GETS(query));
        return response.data;
    },
    getCollection: async (id: string) => {
        const response = await axiosClient.get<BaseReModel<CollectionModel>>(COLLECTION_URL.GET_POS_PUT_DEL(id));
        return response.data;
    },
    getOnTopic: async (id: string, request: PageReqModel) => {
        const response = await axiosClient.get<BaseReModel<PaginationResModel<CollectionModel>>>(COLLECTION_URL.GET_ON_TOPIC(id, request));
        return response.data;
    },
    postCollection: async (request: UpsertCollectionReqModel) => {
        const response = await axiosClient.post<BaseReModel<CollectionResModel>>(COLLECTION_URL.GET_POS_PUT_DEL(), request);
        return response.data;
    },
    putCollection: async (id: string, request: UpsertCollectionReqModel) => {
        const response = await axiosClient.put<BaseReModel<CollectionResModel>>(COLLECTION_URL.GET_POS_PUT_DEL(id), request);
        return response.data;
    },
    deleteCollection: async (id: string) => {
        const response = await axiosClient.delete<BaseModel>(COLLECTION_URL.GET_POS_PUT_DEL(id));
        return response.data;
    }
}