import { IPageRequest } from "../../types/general.type.ts";

export const FLASHCARD_URL = {
    GET_ON_COLLECTION: (id: string, query: IPageRequest) => {
        return `/exercises/sub-topic/${id}?page=${query?.page}&Size=${query?.size}&sort=${query?.orderOn}`;
    },
    GETS: (query: IPageRequest) => {
        return `/exercises?page=${query?.page}&Size=${query?.size}&sort=${query?.orderOn}`
    },
    GET_POS_PUT_DEL: (id?: string | undefined) => {
        if (id !== undefined) {
            return `/exercises/${id}`;
        }
        return '/exercises';
    },
    DELS: () => {
        return '/exercises/bulk'
    }
}