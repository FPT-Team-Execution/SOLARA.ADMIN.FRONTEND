import { IPageRequest } from './general.type';

export type TopicDto = {
    topicId: string;
    description: string;
    topicName: string;
    totalSubTopic: number;
    thumbnail: string;
    createdOn?: Date | null;
    updatedOn?: Date | null;
}

export type TopicResModel = {
    topic: TopicDto;
}

export type GetPagedTopicsRequest = IPageRequest & {

}

export interface UpdateTopicRequest {
    topicId: string;
    topicName: string;
    topicDescription: string;
    thumbnail: string;
}

export interface CreateTopicRequest {
    topicName: string;
    topicDescription: string;
    totalSubTopic?: number;
}
