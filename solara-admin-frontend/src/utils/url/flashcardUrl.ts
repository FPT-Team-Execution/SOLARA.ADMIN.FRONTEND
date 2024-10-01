import {PageReqModel} from "../../types/general.type.ts";

export const FLASHCARD_URL = {
    GET_ON_COLLECTION: (id: string) => {
        return `/flashcards/collection/${id}`;
    },
    GETS: (query: PageReqModel) => {
        return `/flashcards?page=${query?.page}&pageSize=${query?.pageSize}&sort=${query?.sort}`
    },
    GET_POS_PUT_DEL: (id?: string | undefined) => {
        if (id !== undefined) {
            return `/flashcards/${id}`;
        }
        return '/flashcard?';
    },
    DELS: () => {
        return '/flashcards/flashcard/bulk'
    }
}