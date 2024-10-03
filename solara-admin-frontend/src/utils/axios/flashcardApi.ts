import { FlashcardModel, FlashcardResModel, UpsertFlashcardReqModel } from "../../types/flashcard.type";
import { BaseModel, BaseReModel, PageReqModel, PaginationResModel } from "../../types/general.type"
import { FLASHCARD_URL } from "../url/flashcardUrl";
import axiosClient from "./axiosClient";

interface IFlashcardApi {
    getFlashcards: (query: PageReqModel) => Promise<BaseReModel<PaginationResModel<FlashcardModel>>>;
    getFlashcard: (id: string) => Promise<BaseReModel<FlashcardModel>>;
    getOnCollection: (id: string, request: PageReqModel) => Promise<BaseReModel<PaginationResModel<FlashcardModel>>>;
    postFlashcard: (request: UpsertFlashcardReqModel) => Promise<BaseReModel<FlashcardResModel>>;
    putFlashcard: () => Promise<BaseReModel<FlashcardResModel>>;
    deleteFlashcard: (id: string) => Promise<BaseModel>;
}

export const flashcardApi: IFlashcardApi = {
    getFlashcards: async (query: PageReqModel) => {
        const response = await axiosClient.get<BaseReModel<PaginationResModel<FlashcardModel>>>(FLASHCARD_URL.GETS(query));
        return response.data;
    },
    getFlashcard: async (id: string) => {
        const response = await axiosClient.get<BaseReModel<FlashcardModel>>(FLASHCARD_URL.GET_POS_PUT_DEL(id));
        return response.data;
    },
    getOnCollection: async (id: string, request: PageReqModel) => {
        const response = await axiosClient.get<BaseReModel<PaginationResModel<FlashcardModel>>>(FLASHCARD_URL.GET_ON_COLLECTION(id, request));
        return response.data
    },
    postFlashcard: async (request: UpsertFlashcardReqModel) => {
        const response = await axiosClient.post<BaseReModel<FlashcardResModel>>(FLASHCARD_URL.GET_POS_PUT_DEL(), request);
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