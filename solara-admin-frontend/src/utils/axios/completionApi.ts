import axiosClient from "./axiosClient.ts";
import { IBaseModel, IPaginate, IPageRequest } from "../../types/general.type.ts";
import { COMPLETION_URL } from "../url/completionUrl.ts";

export interface CompletionDto {
    id: string;
    subTopic: {
        topicId: string;
        id: string;
        name: string;
        description: string;
        totalXP: number;
        totalExcercise: number;
        createdOn: string;
    };
    earnedXP: number;
    count: number;
}

interface ICompletionApi {
    getCompletions: (query: IPageRequest) => Promise<IBaseModel<IPaginate<CompletionDto>>>;
}

export const completionApi: ICompletionApi = {
    getCompletions: async (query: IPageRequest) => {
        const response = await axiosClient.post<IBaseModel<IPaginate<CompletionDto>>>(COMPLETION_URL.GETS(query), {});
        return response.data;
    }
};
