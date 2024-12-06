import { IBaseModel, IPageRequest, IPaginate } from "../../types/general.type"
import { FLASHCARD_URL } from "../url/flashcardUrl";
import axiosClient from "./axiosClient";
import {ExerciseDto, UpdateExerciseRequest} from "../../types/exercise";

interface IFlashcardApi {
    getFlashcards: (query: IPageRequest) => Promise<IBaseModel<IPaginate<ExerciseDto>>>;
    getFlashcard: (id: string) => Promise<IBaseModel<ExerciseDto>>;
    getOnCollection: (id: string, request: IPageRequest) => Promise<IBaseModel<IPaginate<ExerciseDto>>>;
    postFlashcard: (request: UpdateExerciseRequest) => Promise<IBaseModel<ExerciseDto>>;
    putFlashcard: (id: string, request: UpdateExerciseRequest) => Promise<IBaseModel<ExerciseDto>>;
    deleteFlashcard: (id: string) => Promise<IBaseModel<ExerciseDto>>;
}

export const flashcardApi: IFlashcardApi = {
    getFlashcards: async (query: IPageRequest) => {
        const response = await axiosClient.get<IBaseModel<IPaginate<ExerciseDto>>>(FLASHCARD_URL.GETS(query));
        return response.data;
    },
    getFlashcard: async (id: string) => {
        const response = await axiosClient.get<IBaseModel<ExerciseDto>>(FLASHCARD_URL.GET_POS_PUT_DEL(id));
        return response.data;
    },
    getOnCollection: async (id: string, request: IPageRequest) => {
        console.log(request);
        const response = await axiosClient.get<IBaseModel<IPaginate<ExerciseDto>>>(FLASHCARD_URL.GET_ON_COLLECTION(id, request));
        return response.data
    },
    postFlashcard: async (request: UpdateExerciseRequest) => {
        const response = await axiosClient.post<IBaseModel<ExerciseDto>>(FLASHCARD_URL.GET_POS_PUT_DEL(), request);
        return response.data;
    },
    putFlashcard: async (id: string, request: UpdateExerciseRequest) => {
        const response = await axiosClient.put<IBaseModel<ExerciseDto>>(FLASHCARD_URL.GET_POS_PUT_DEL(id), request);
        return response.data;
    },
    deleteFlashcard: async (id: string) => {
        const response = await axiosClient.delete<IBaseModel<ExerciseDto>>(FLASHCARD_URL.GET_POS_PUT_DEL(id));
        return response.data;
    }
}