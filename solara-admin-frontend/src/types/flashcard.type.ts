export type FlashcardModel = {
    flashcardId: string,
    answer?: string | null,
    createAt?: Date | null,
    difficulty?: string | null,
    imageUrl?: string | null,
    question?: string | null,
    subTopicId: string,
    videoUrl?: string | null,
}

export type FlashcardResModel = {
    flashcard: FlashcardModel
}

export type UpsertFlashcardReqModel = {
    subTopicId: string,
    question: string,
    answer: string,
    imageUrl: string,
    videoUrl: string,
    difficulty: string
}