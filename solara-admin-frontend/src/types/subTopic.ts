import { IPageRequest } from "./general.type";

export type SubTopicDto = {
    id: string;
    name: string;
    description: string;
    totalXP: number;
    totalExercise: number;
    createdOn?: Date;
    updatedOn?: Date;
};

export type GetPagedSubTopicRequest = IPageRequest & {

}

export type CreateSubTopicRequest = {
    subTopicId: string;
    topicId: string;
    name: string;
    description: string;
};

export type UpdateSubTopicRequest = {
    subTopicId: string;
    topicId: string;
    name: string;
    description: string;
};