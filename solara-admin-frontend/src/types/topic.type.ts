export type TopicModel = {
    topicId: string,
    createAt?: Date | null,
    description?: string | null,
    topicName?: string | null
}

export type TopicResModel = {
    topic: TopicModel
}

export type UpsertTopicReqModel = {
    topicName: string,
    topicDescription: string
}