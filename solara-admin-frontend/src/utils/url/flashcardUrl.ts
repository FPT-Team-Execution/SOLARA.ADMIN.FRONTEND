import { PageReqModel } from "../../types/general.type.ts";

export const FLASHCARD_URL = {
    GET_ON_COLLECTION: (id: string, query: PageReqModel) => {
        return `/flashcards/collection/${id}?page=${query?.page}&pageSize=${query?.pageSize}&sort=${query?.sort}`;
    },
    GETS: (query: PageReqModel) => {
        return `/flashcards?page=${query?.page}&pageSize=${query?.pageSize}&sort=${query?.sort}`
    },
    GET_POS_PUT_DEL: (id?: string | undefined) => {
        if (id !== undefined) {
            return `/flashcards/${id}`;
        }
        return '/flashcards';
    },
    DELS: () => {
        return '/flashcards/flashcard/bulk'
    }
}