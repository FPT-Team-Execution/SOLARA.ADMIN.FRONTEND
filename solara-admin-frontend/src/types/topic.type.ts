import {PageReqModel} from "./general.type.ts";

export type TopicModel = {
    topicId: string,
    createAt: Date,
    description: string | null,
    topicName: string | null
}

export type UpsertTopicModel = {
    topicName: string,
    topicDescription: string
}

export type GetTopicModels = {
    content: TopicModel[],
    page: PageReqModel
}