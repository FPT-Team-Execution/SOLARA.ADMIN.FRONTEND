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