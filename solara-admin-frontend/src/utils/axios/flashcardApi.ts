import axiosInstance from "./axiosInstance"
import { ApiResponse } from '../../types/general.type';

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


interface Option {
  optionText: string;
  explanation: string;
  isCorrect: boolean;
}

interface OptionResponse {
  id: string;
  optionText: string;
  explanation: string;
  isCorrect: boolean;
}

interface ExerciseResponse {
  id: string;
  question: string;
  difficulty: string;
  xp: number;
  imageUrl?: string;
  videoUrl?: string;
  ans: OptionResponse[];
}

export const flashcardApi = {
    getFlashcards: async (subTopicId: string) => {
        const response = await axiosInstance.get(`/api/v1/exercises/sub-topic/${subTopicId}`)
        return response.data
    },

    postFlashcard: async (request: FlashcardRequest) => {
        const response = await axiosInstance.post('/api/v1/exercises', request)
        console.log(request);
        return response.data
    },

    putFlashcard: async (request: FlashcardRequest) => {
        const response = await axiosInstance.put('/api/v1/exercises', request)
        return response.data
    },

    deleteFlashcard: async (id: string) => {
        const response = await axiosInstance.delete(`/api/v1/exercises/${id}`)
        return response.data
    },

    postOption: async (exerciseId: string, option: Option): Promise<ApiResponse<OptionResponse>> => {
        const url = `/api/v1/exercises/${exerciseId}/options`;
        console.log('API URL:', url);
        console.log('Request data:', { exerciseId, option });
        
        try {
            const response = await axiosInstance.post(url, option);
            console.log('Raw response:', response);
            return response.data;
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    },

    putOption: async (exerciseId: string, optionId: string, option: Option): Promise<ApiResponse<OptionResponse>> => {
        const response = await axiosInstance.put(
            `/api/v1/exercises/${exerciseId}/options`,
            {
                optionId,
                ...option
            }
        );
        return response.data;
    },

    deleteOption: async (exerciseId: string, optionId: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete(
            `/api/v1/exercises/${exerciseId}/options/${optionId}`
        );
        return response.data;
    },

    getOptions: async (exerciseId: string) => {
        const response = await axiosInstance.get(`/api/v1/exercises/${exerciseId}/options`);
        return response.data;
    },

    getExercise: async (exerciseId: string): Promise<ApiResponse<ExerciseResponse>> => {
        const response = await axiosInstance.get(`/api/v1/exercises/${exerciseId}`);
        return response.data;
    }
}