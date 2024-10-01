import {PageReqModel} from "../../types/general.type.ts";

export const COLLECTION_URL = {
    GET_ON_TOPIC: (id: string) => {
        return `/collections/topic/${id}`;
    },
    GETS: (query: PageReqModel) => {
        return `/collections?page=${query?.page}&pageSize=${query?.pageSize}&sort=${query?.sort}`
    },
    GET_POS_PUT_DEL: (id?: string | undefined) => {
        if (id !== undefined) {
            return `/collections/${id}`;
        }
        return '/collections';
    }
}