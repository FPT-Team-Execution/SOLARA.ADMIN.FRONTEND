import {PageReqModel} from "../../types/general.type.ts";

export const TOPIC_URL = {
    GETS: (query: PageReqModel) => {
        return `/topics?page=${query?.page}&pageSize=${query?.pageSize}&sort=${query?.sort}`
    },
    GET_POS_PUT_DEL: (id: string | null) => {
        if (id !== null) {
            return `/topics/${id}`
        }
        return `/topics`
    }
}