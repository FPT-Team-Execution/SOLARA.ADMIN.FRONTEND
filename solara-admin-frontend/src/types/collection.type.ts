export type CollectionModel = {
    collectionId: string,
    collectionName?: string | null,
    createAt?: Date | null,
    description?: string | null
    topicId: string
}

export type CollectionResModel = {
    collections: CollectionModel
}

export type UpsertCollectionReqModel = {
    topicId: string,
    collectionName: string,
    description: string
}