import {IPageRequest} from "../../types/general.type.ts";

export const TOPIC_URL = {
    GETS: (query: IPageRequest) => {
        return `/topics?page=${query?.page}&Size=${query?.size}&sort=${query?.orderOn}`
    },
    GET_POS_PUT_DEL: (id?: string | undefined) => {
        if (id !== undefined) {
            return `/topics/${id}`
        }
        return `/topics`
    }
}