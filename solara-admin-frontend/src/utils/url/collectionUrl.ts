import { IPageRequest } from "../../types/general.type.ts";

export const COLLECTION_URL = {
    GET_ON_TOPIC: (id: string, query: IPageRequest) => {
        return `/sub-topics/topic/${id}?page=${query?.page}&Size=${query?.size}&sort=${query?.orderOn}`;
    },
    GETS: (query: IPageRequest) => {
        return `/sub-topics?page=${query?.page}&Size=${query?.size}&sort=${query?.orderOn}`
    },
    GET_POS_PUT_DEL: (id?: string | undefined) => {
        if (id !== undefined) {
            return `/sub-topics/${id}`;
        }
        return '/sub-topics';
    }
}