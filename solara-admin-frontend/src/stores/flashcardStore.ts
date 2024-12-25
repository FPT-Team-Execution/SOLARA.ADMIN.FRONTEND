import { create } from 'zustand'
import { ExerciseDto } from '../types/exercise'
import { flashcardApi } from '../utils/axios/flashcardApi'
import { IPageRequest, IPaginate } from '../types/general.type'

// Define interface for create/update requests
interface FlashcardRequest {
  exerciseId?: string
  subTopicId: string
  xp: number
  question: string
  imageUrl?: string
  videoUrl?: string
  difficulty: string
  exerciseTypeId?: string
  answers?: {
    optionText: string
    explanation: string
    isCorrect: boolean
  }[]
}

interface FlashcardState {
  flashcards: ExerciseDto[]
  selectedFlashcard: ExerciseDto | null
  pagination: IPaginate<ExerciseDto> | undefined
  loading: boolean
  query: IPageRequest
  setQuery: (query: IPageRequest) => void
  setSelectedFlashcard: (flashcard: ExerciseDto | null) => void
  fetchFlashcards: (subTopicId: string) => Promise<void>
  createFlashcard: (request: FlashcardRequest) => Promise<boolean>
  updateFlashcard: (request: FlashcardRequest) => Promise<boolean>
  deleteFlashcard: (id: string) => Promise<boolean>
  currentTopic: {
    id: string;
    name: string;
  } | null;
  currentSubTopic: {
    id: string;
    name: string;
  } | null;
  currentCollection: {
    id: string;
    name: string;
  } | null;
  setCurrentTopic: (topic: { id: string; name: string } | null) => void
  setCurrentSubTopic: (subTopic: { id: string; name: string } | null) => void
  setCurrentCollection: (collection: { id: string; name: string } | null) => void
}

export const useFlashcardStore = create<FlashcardState>((set) => ({
  flashcards: [],
  selectedFlashcard: null,
  pagination: undefined,
  loading: false,
  query: {
    page: 1,
    size: 10,
    isAscending: false,
  },
  setQuery: (query) => set({ query }),
  setSelectedFlashcard: (flashcard) => set({ selectedFlashcard: flashcard }),

  fetchFlashcards: async (subTopicId: string) => {
    set({ loading: true })
    try {
      const response = await flashcardApi.getFlashcards(subTopicId)
      set({
        flashcards: response.responseRequest?.items || [],
        pagination: response.responseRequest,
        loading: false
      })
    } catch (error) {
      set({ loading: false })
      console.error('Error fetching flashcards:', error)
    }
  },

  createFlashcard: async (request) => {
    try {
      const response = await flashcardApi.postFlashcard(request)
      return response.isSuccess
    } catch (error) {
      console.error('Error creating flashcard:', error)
      return false
    }
  },

  updateFlashcard: async (request) => {
    try {
      const response = await flashcardApi.putFlashcard(request)
      return response.isSuccess
    } catch (error) {
      console.error('Error updating flashcard:', error)
      return false
    }
  },

  deleteFlashcard: async (id) => {
    try {
      const response = await flashcardApi.deleteFlashcard(id)
      return response.isSuccess
    } catch (error) {
      console.error('Error deleting flashcard:', error)
      return false
    }
  },

  currentTopic: null,
  currentSubTopic: null,
  currentCollection: null,

  setCurrentTopic: (topic: { id: string; name: string } | null) => 
    set({ currentTopic: topic }),
  setCurrentSubTopic: (subTopic: { id: string; name: string } | null) => 
    set({ currentSubTopic: subTopic }),
  setCurrentCollection: (collection: { id: string; name: string } | null) => 
    set({ currentCollection: collection }),
})) 