export interface FlashcardDto {
    id: string;
    question: string;
    difficulty: string;
    xp: number;
    imageUrl?: string;
    videoUrl?: string;
    answers: FlashcardAnswerDto[];
    collectionId: string;
    exerciseTypeId?: string;
}

export interface FlashcardAnswerDto {
    id: string;
    optionText: string;
    explanation: string;
    isCorrect: boolean;
}

export interface CreateFlashcardRequest {
    question: string;
    difficulty: string;
    xp: number;
    imageUrl?: string;
    videoUrl?: string;
    collectionId: string;
    exerciseTypeId?: string;
    answers: {
        optionText: string;
        explanation: string;
        isCorrect: boolean;
    }[];
}

export interface UpdateFlashcardRequest extends CreateFlashcardRequest {
    id: string;
}