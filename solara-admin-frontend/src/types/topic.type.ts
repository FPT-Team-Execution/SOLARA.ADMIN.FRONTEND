import {PageReqModel} from "./general.type.ts";

export type TopicResModel = {
    topicId: string,
    createAt: Date,
    description: string | null,
    topicName: string | null
}

export type UpsertTopicReqModel = {
    topicName: string,
    topicDescription: string
}

export type GetTopicResModels = {
    content: TopicResModel[],
    page: PageReqModel
}