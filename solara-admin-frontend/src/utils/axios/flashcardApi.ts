import { FlashcardModel, FlashcardResModel } from "../../types/flashcard.type";
import { BaseModel, BaseReModel, PageReqModel, PaginationResModel, SubResModel } from "../../types/general.type"
import { FLASHCARD_URL } from "../url/flashcardUrl";
import axiosClient from "./axiosClient";

interface IFlashcardApi {
    getFlashcards: (query: PageReqModel) => Promise<BaseReModel<SubResModel<PaginationResModel<FlashcardModel>>>>;
    getFlashcard: (id: string) => Promise<BaseReModel<FlashcardResModel>>;
    getOnCollection: (id: string) => Promise<BaseReModel<SubResModel<PaginationResModel<FlashcardModel>>>>;
    postFlashcard: () => Promise<BaseReModel<FlashcardResModel>>;
    putFlashcard: () => Promise<BaseReModel<FlashcardResModel>>;
    deleteFlashcard: (id: string) => Promise<BaseModel>;
}

export const flashcardApi: IFlashcardApi = {
    getFlashcards: async (query: PageReqModel) => {
        const response = await axiosClient.get<BaseReModel<SubResModel<PaginationResModel<FlashcardModel>>>>(FLASHCARD_URL.GETS(query));
        return response.data;
    },
    getFlashcard: async (id: string) => {
        const response = await axiosClient.get<BaseReModel<FlashcardResModel>>(FLASHCARD_URL.GET_POS_PUT_DEL(id));
        return response.data;
    },
    getOnCollection: async (id: string) => {
        const response = await axiosClient.get<BaseReModel<SubResModel<PaginationResModel<FlashcardModel>>>>(FLASHCARD_URL.GET_ON_COLLECTION(id));
        return response.data
    },
    postFlashcard: async () => {
        const response = await axiosClient.post<BaseReModel<FlashcardResModel>>(FLASHCARD_URL.GET_POS_PUT_DEL());
        return response.data;
    },
    putFlashcard: async () => {
        const response = await axiosClient.put<BaseReModel<FlashcardResModel>>(FLASHCARD_URL.GET_POS_PUT_DEL());
        return response.data;
    },
    deleteFlashcard: async (id: string) => {
        const response = await axiosClient.delete<BaseModel>(FLASHCARD_URL.GET_POS_PUT_DEL(id));
        return response.data;
    }
}